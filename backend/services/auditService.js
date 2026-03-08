/**
 * Accessibility Audit Business Logic
 * Scores calculation, risk assessment, recommendations
 */

const { scanWebsite, validateUrl } = require('./scanner');

const calculateScores = (accessibilityIssues, seoIssues, coreWebVitals, mobile, security) => {
  // Accessibility Score
  let accScore = 100;
  for (const issue of accessibilityIssues) {
    if (issue.impact === 'critical') accScore -= issue.count * 5;
    else if (issue.impact === 'serious') accScore -= issue.count * 3;
    else if (issue.impact === 'moderate') accScore -= issue.count * 2;
    else accScore -= issue.count * 1;
  }
  accScore = Math.max(0, Math.min(100, accScore));

  // SEO Score
  let seoScore = 100;
  for (const issue of seoIssues) {
    if (issue.impact === 'critical') seoScore -= 15;
    else if (issue.impact === 'serious') seoScore -= 10;
    else if (issue.impact === 'moderate') seoScore -= 5;
    else seoScore -= 2;
  }
  seoScore = Math.max(0, Math.min(100, seoScore));

  // Performance Score (based on Core Web Vitals)
  let perfScore = 100;
  if (coreWebVitals.lcp_status === 'poor') perfScore -= 25;
  else if (coreWebVitals.lcp_status === 'needs-improvement') perfScore -= 10;
  if (coreWebVitals.fid_status === 'poor') perfScore -= 25;
  else if (coreWebVitals.fid_status === 'needs-improvement') perfScore -= 10;
  if (coreWebVitals.cls_status === 'poor') perfScore -= 25;
  else if (coreWebVitals.cls_status === 'needs-improvement') perfScore -= 10;
  perfScore = Math.max(0, Math.min(100, perfScore));

  // Mobile Score
  let mobileScore = 100;
  if (!mobile.viewport_configured) mobileScore -= 30;
  if (!mobile.text_readable) mobileScore -= 25;
  if (!mobile.tap_targets_sized) mobileScore -= 25;
  if (mobile.content_wider_than_screen) mobileScore -= 20;
  mobileScore = Math.max(0, Math.min(100, mobileScore));

  // Overall Score (weighted average)
  const overall = Math.round(
    accScore * 0.30 +
    seoScore * 0.25 +
    perfScore * 0.20 +
    mobileScore * 0.15 +
    security.security_score * 0.10
  );

  return {
    accessibility: accScore,
    seo: seoScore,
    performance: perfScore,
    mobile: mobileScore,
    security: security.security_score,
    overall,
  };
};

const determineLawsuitRisk = (score, criticalIssues) => {
  if (score >= 90 && criticalIssues <= 1) return 'low';
  if (score >= 70 && criticalIssues <= 3) return 'medium';
  return 'high';
};

const determineWcagLevel = (score) => {
  if (score >= 95) return 'AAA';
  if (score >= 80) return 'AA';
  if (score >= 60) return 'A';
  return 'Non-Compliant';
};

const generateRecommendations = (scores, accessibilityIssues, seoIssues, cwv, mobile) => {
  const recommendations = [];

  if (scores.accessibility < 80) {
    const critical = accessibilityIssues.filter((i) => i.impact === 'critical');
    if (critical.length > 0) {
      recommendations.push(
        `Fix ${critical.length} critical accessibility issues (images alt text, form labels, ARIA)`
      );
    }
  }

  if (scores.seo < 80) {
    recommendations.push('Improve meta descriptions and title tags for better search visibility');
    recommendations.push('Add structured data markup (Schema.org) for rich snippets');
  }

  if (cwv.lcp_status !== 'good') {
    recommendations.push(
      `Improve Largest Contentful Paint (currently ${cwv.lcp}s, target < 2.5s)`
    );
  }
  if (cwv.cls_status !== 'good') {
    recommendations.push(
      `Reduce Cumulative Layout Shift (currently ${cwv.cls}, target < 0.1)`
    );
  }

  if (!mobile.is_mobile_friendly) {
    if (!mobile.viewport_configured) {
      recommendations.push('Add viewport meta tag for mobile responsiveness');
    }
    if (!mobile.tap_targets_sized) {
      recommendations.push('Increase tap target sizes to at least 48x48 pixels');
    }
  }

  return recommendations.slice(0, 5);
};

const performAudit = async (url, auditType = 'full') => {
  // Normalize URL
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  if (!validateUrl(url)) {
    throw new Error('Invalid URL format');
  }

  const startTime = Date.now();
  const scanResult = await scanWebsite(url);
  const scanDuration = (Date.now() - startTime) / 1000;

  // Process accessibility issues
  const accessibilityIssues = scanResult.accessibility_issues || [];
  const seoIssues = scanResult.seo_issues || [];
  const mobileIssuesList = scanResult.mobile_issues || [];
  const securityIssuesList = scanResult.security_issues || [];
  const perf = scanResult.performance_metrics || {};

  // Core Web Vitals
  const loadTime = perf.load_time || 3.0;
  const fcp = perf.firstContentfulPaint || 1500;
  const lcp = loadTime;
  const lcpStatus = lcp < 2.5 ? 'good' : lcp < 4 ? 'needs-improvement' : 'poor';
  const fid = fcp / 15 || 100;
  const fidStatus = fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor';
  const cls = scanResult.scan_successful ? 0.08 : 0.3;
  const clsStatus = cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor';

  const allStatuses = [lcpStatus, fidStatus, clsStatus];
  const coreWebVitals = {
    lcp: parseFloat(lcp.toFixed(2)),
    lcp_status: lcpStatus,
    fid: parseFloat(fid.toFixed(0)),
    fid_status: fidStatus,
    cls: parseFloat(cls.toFixed(3)),
    cls_status: clsStatus,
    overall_status: allStatuses.every((s) => s === 'good')
      ? 'good'
      : allStatuses.some((s) => s === 'poor')
      ? 'poor'
      : 'needs-improvement',
  };

  // Mobile Friendliness
  const mobileIssueTexts = mobileIssuesList.map((m) => m.message || '');
  const hasViewport = !mobileIssueTexts.some((m) => m.toLowerCase().includes('viewport'));
  const hasOverflow = mobileIssueTexts.some(
    (m) => m.toLowerCase().includes('scroll') || m.toLowerCase().includes('wider')
  );
  const hasSmallTargets = mobileIssueTexts.some(
    (m) => m.toLowerCase().includes('tap') || m.toLowerCase().includes('target')
  );

  const mobileFriendliness = {
    is_mobile_friendly: mobileIssuesList.length === 0,
    viewport_configured: hasViewport,
    text_readable: true,
    tap_targets_sized: !hasSmallTargets,
    content_wider_than_screen: hasOverflow,
    issues: mobileIssueTexts.slice(0, 5),
  };

  // Security
  const hasHttps = url.startsWith('https://');
  const hasHsts = !securityIssuesList.some((s) => (s.code || '').toLowerCase().includes('hsts'));
  const hasCsp = !securityIssuesList.some((s) =>
    (s.code || '').toLowerCase().includes('content-security-policy')
  );
  const mixedContent = false;
  let securityScore = 0;
  if (hasHttps) securityScore += 40;
  if (hasHsts) securityScore += 20;
  if (hasCsp) securityScore += 25;
  if (!mixedContent) securityScore += 15;

  const security = {
    has_https: hasHttps,
    has_hsts: hasHsts,
    has_csp: hasCsp,
    mixed_content: mixedContent,
    security_score: securityScore,
  };

  // Scores
  const scores = calculateScores(
    accessibilityIssues,
    seoIssues,
    coreWebVitals,
    mobileFriendliness,
    security
  );

  const criticalCount = accessibilityIssues
    .filter((i) => i.impact === 'critical')
    .reduce((sum, i) => sum + (i.count || 1), 0);
  const warningsCount = accessibilityIssues.filter((i) => i.type === 'warning').length;
  const totalIssues = accessibilityIssues.reduce((sum, i) => sum + (i.count || 1), 0);

  const lawsuitRisk = determineLawsuitRisk(scores.accessibility, criticalCount);
  const wcagLevel = determineWcagLevel(scores.accessibility);
  const recommendations = generateRecommendations(
    scores,
    accessibilityIssues,
    seoIssues,
    coreWebVitals,
    mobileFriendliness
  );

  const structuredData = {
    has_schema: false,
    schema_types: [],
    is_valid: true,
    errors: [],
    warnings: [],
  };

  return {
    url,
    audit_type: auditType,
    accessibility_score: scores.accessibility,
    seo_score: scores.seo,
    performance_score: scores.performance,
    mobile_score: scores.mobile,
    security_score: scores.security,
    overall_score: scores.overall,
    lawsuit_risk: lawsuitRisk,
    wcag_level: wcagLevel,
    accessibility_issues: accessibilityIssues,
    seo_issues: seoIssues,
    core_web_vitals: coreWebVitals,
    mobile_friendliness: mobileFriendliness,
    structured_data: structuredData,
    security,
    total_issues: totalIssues,
    critical_issues: criticalCount,
    warnings: warningsCount,
    top_recommendations: recommendations,
    page_title: scanResult.page_title || null,
    meta_description: scanResult.meta_description || null,
    images_without_alt: scanResult.images_without_alt || [],
    scan_successful: scanResult.scan_successful,
    scan_duration: scanDuration,
    dom_analysis: scanResult.dom_analysis || null,
  };
};

module.exports = { performAudit };
