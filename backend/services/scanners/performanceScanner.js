/**
 * Performance Scanner
 * Integrates with Google PageSpeed Insights API for real CWV data.
 * Falls back to estimation from static analysis if PSI fails.
 */

const axios = require('axios');

const PSI_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

/**
 * @param {string} url - The URL to analyze
 * @param {string|null} apiKey - Optional Google API key
 * @param {object} staticPerf - Static performance data { load_time, page_size, firstContentfulPaint }
 * @returns {{ metrics: object, issues: object[], psiData: object }}
 */
const scanPerformance = async (url, apiKey, staticPerf = {}) => {
  const metrics = {
    fcp: null, lcp: null, tbt: null, cls: null,
    speed_index: null, tti: null, ttfb: null, inp: null,
    fully_loaded_time: null,
    fcp_status: 'unknown', lcp_status: 'unknown', tbt_status: 'unknown',
    cls_status: 'unknown', speed_index_status: 'unknown', tti_status: 'unknown',
    ttfb_status: 'unknown', inp_status: 'unknown',
    overall_status: 'unknown',
    source: 'estimated',
  };
  const issues = [];
  let psiData = {};

  try {
    const params = { url, strategy: 'mobile', category: 'performance' };
    if (apiKey) params.key = apiKey;

    const response = await axios.get(PSI_API_URL, { params, timeout: 90000 });
    const lighthouse = response.data.lighthouseResult;
    const audits = lighthouse.audits || {};

    // Extract real CWV metrics (values in ms except CLS)
    const fcpMs = audits['first-contentful-paint']?.numericValue;
    const lcpMs = audits['largest-contentful-paint']?.numericValue;
    const tbtMs = audits['total-blocking-time']?.numericValue;
    const clsVal = audits['cumulative-layout-shift']?.numericValue;
    const siMs = audits['speed-index']?.numericValue;
    const ttiMs = audits['interactive']?.numericValue;
    const ttfbMs = audits['server-response-time']?.numericValue;
    const inpMs = audits['experimental-interaction-to-next-paint']?.numericValue || null;

    // Convert to seconds for display (CLS stays as-is)
    metrics.fcp = fcpMs != null ? parseFloat((fcpMs / 1000).toFixed(2)) : null;
    metrics.lcp = lcpMs != null ? parseFloat((lcpMs / 1000).toFixed(2)) : null;
    metrics.tbt = tbtMs != null ? Math.round(tbtMs) : null;
    metrics.cls = clsVal != null ? parseFloat(clsVal.toFixed(3)) : null;
    metrics.speed_index = siMs != null ? parseFloat((siMs / 1000).toFixed(2)) : null;
    metrics.tti = ttiMs != null ? parseFloat((ttiMs / 1000).toFixed(2)) : null;
    metrics.ttfb = ttfbMs != null ? Math.round(ttfbMs) : null;
    metrics.inp = inpMs != null ? Math.round(inpMs) : null;
    metrics.fully_loaded_time = ttiMs != null ? parseFloat((ttiMs / 1000).toFixed(2)) : null;

    // Status classification
    metrics.fcp_status = classifyMetric(metrics.fcp, 1.8, 3.0);
    metrics.lcp_status = classifyMetric(metrics.lcp, 2.5, 4.0);
    metrics.tbt_status = classifyMetric(metrics.tbt, 200, 600);
    metrics.cls_status = classifyMetric(metrics.cls, 0.1, 0.25);
    metrics.speed_index_status = classifyMetric(metrics.speed_index, 3.4, 5.8);
    metrics.tti_status = classifyMetric(metrics.tti, 3.8, 7.3);
    metrics.ttfb_status = classifyMetric(metrics.ttfb, 800, 1800);
    metrics.inp_status = metrics.inp != null ? classifyMetric(metrics.inp, 200, 500) : 'unknown';

    // Overall status
    const statuses = [metrics.lcp_status, metrics.fcp_status, metrics.tbt_status, metrics.cls_status];
    metrics.overall_status = statuses.every((s) => s === 'good')
      ? 'good'
      : statuses.some((s) => s === 'poor')
        ? 'poor'
        : 'needs-improvement';

    metrics.source = 'pagespeed';
    metrics.performance_score = Math.round((lighthouse.categories?.performance?.score || 0) * 100);

    // Extract PSI audit issues for resources/images/code quality
    const auditChecks = [
      'render-blocking-resources', 'unused-javascript', 'unused-css-rules',
      'unminified-javascript', 'unminified-css', 'modern-image-formats',
      'uses-optimized-images', 'uses-responsive-images', 'offscreen-images',
      'dom-size', 'mainthread-work-breakdown', 'font-display',
      'uses-long-cache-ttl', 'uses-text-compression', 'uses-http2',
      'third-party-summary', 'legacy-javascript', 'duplicated-javascript',
      'total-byte-weight', 'bootup-time',
    ];

    for (const checkId of auditChecks) {
      const audit = audits[checkId];
      if (audit && audit.score !== null && audit.score < 1) {
        issues.push({
          code: checkId,
          message: audit.title,
          description: audit.description || '',
          score: audit.score,
          displayValue: audit.displayValue || null,
          numericValue: audit.numericValue || null,
          details: (audit.details?.items || []).slice(0, 5).map(formatPsiDetail),
          category: mapAuditToCategory(checkId),
          impact: audit.score === 0 ? 'critical' : audit.score < 0.5 ? 'serious' : 'moderate',
        });
      }
    }

    // Store summarized PSI data
    psiData = {
      performance_score: metrics.performance_score,
      categories: lighthouse.categories,
      timing: lighthouse.timing,
      environment: lighthouse.environment,
    };

  } catch (err) {
    console.warn('PageSpeed Insights API failed, using estimates:', err.message);
    // Fall back to static estimates
    const loadTime = staticPerf.load_time || 3.0;
    const fcp = staticPerf.firstContentfulPaint ? staticPerf.firstContentfulPaint / 1000 : loadTime * 0.8;

    metrics.fcp = parseFloat(fcp.toFixed(2));
    metrics.lcp = parseFloat(loadTime.toFixed(2));
    metrics.tbt = Math.round(fcp * 100);
    metrics.cls = 0.08;
    metrics.speed_index = parseFloat((loadTime * 1.1).toFixed(2));
    metrics.tti = parseFloat((loadTime * 1.2).toFixed(2));
    metrics.ttfb = Math.round(loadTime * 200);
    metrics.inp = null;
    metrics.fully_loaded_time = parseFloat((loadTime * 1.5).toFixed(2));

    metrics.fcp_status = classifyMetric(metrics.fcp, 1.8, 3.0);
    metrics.lcp_status = classifyMetric(metrics.lcp, 2.5, 4.0);
    metrics.tbt_status = classifyMetric(metrics.tbt, 200, 600);
    metrics.cls_status = classifyMetric(metrics.cls, 0.1, 0.25);
    metrics.speed_index_status = classifyMetric(metrics.speed_index, 3.4, 5.8);
    metrics.tti_status = classifyMetric(metrics.tti, 3.8, 7.3);
    metrics.ttfb_status = classifyMetric(metrics.ttfb, 800, 1800);
    metrics.inp_status = 'unknown';

    const statuses = [metrics.lcp_status, metrics.fcp_status, metrics.tbt_status, metrics.cls_status];
    metrics.overall_status = statuses.every((s) => s === 'good')
      ? 'good'
      : statuses.some((s) => s === 'poor')
        ? 'poor'
        : 'needs-improvement';

    metrics.source = 'estimated';
  }

  return { metrics, issues, psiData };
};

function classifyMetric(value, goodThreshold, poorThreshold) {
  if (value == null) return 'unknown';
  if (value <= goodThreshold) return 'good';
  if (value <= poorThreshold) return 'needs-improvement';
  return 'poor';
}

function mapAuditToCategory(auditId) {
  const categoryMap = {
    'render-blocking-resources': 'resources',
    'unused-javascript': 'resources',
    'unused-css-rules': 'resources',
    'legacy-javascript': 'resources',
    'bootup-time': 'resources',
    'mainthread-work-breakdown': 'resources',
    'dom-size': 'resources',
    'third-party-summary': 'resources',
    'total-byte-weight': 'resources',
    'modern-image-formats': 'images',
    'uses-optimized-images': 'images',
    'uses-responsive-images': 'images',
    'offscreen-images': 'images',
    'unminified-javascript': 'code_quality',
    'unminified-css': 'code_quality',
    'font-display': 'code_quality',
    'duplicated-javascript': 'code_quality',
    'uses-long-cache-ttl': 'network',
    'uses-text-compression': 'network',
    'uses-http2': 'network',
  };
  return categoryMap[auditId] || 'performance';
}

function formatPsiDetail(item) {
  return {
    url: item.url || item.source?.url || null,
    totalBytes: item.totalBytes || null,
    wastedBytes: item.wastedBytes || null,
    wastedMs: item.wastedMs || null,
    label: item.label || item.groupLabel || null,
  };
}

module.exports = { scanPerformance };
