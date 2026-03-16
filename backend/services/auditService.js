/**
 * Audit Business Logic — 8-category scoring, grading, recommendations, fixes
 */

const { scanWebsite, validateUrl } = require('./scanner');

// ── Category weights for overall score ─────────────────────────────────────
const CATEGORY_WEIGHTS = {
  accessibility: 0.20,
  seo: 0.15,
  performance: 0.20,
  resources: 0.10,
  images: 0.10,
  network_caching: 0.05,
  security: 0.10,
  code_quality: 0.10,
};

const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));

// ── Score calculation ──────────────────────────────────────────────────────
const calculateScores = (data) => {
  // Accessibility Score
  let accScore = 100;
  for (const issue of data.accessibilityIssues) {
    const count = issue.count || 1;
    if (issue.impact === 'critical') accScore -= count * 5;
    else if (issue.impact === 'serious') accScore -= count * 3;
    else if (issue.impact === 'moderate') accScore -= count * 2;
    else accScore -= count * 1;
  }

  // SEO Score
  let seoScore = 100;
  for (const issue of data.seoIssues) {
    if (issue.impact === 'critical') seoScore -= 15;
    else if (issue.impact === 'serious') seoScore -= 10;
    else if (issue.impact === 'moderate') seoScore -= 5;
    else seoScore -= 2;
  }

  // Performance Score — use PSI score if available, otherwise estimate from CWV
  let perfScore;
  if (data.performanceData && data.performanceData.source === 'pagespeed' && data.performanceData.performance_score != null) {
    perfScore = data.performanceData.performance_score;
  } else {
    perfScore = 100;
    const cwv = data.performanceData || {};
    if (cwv.lcp_status === 'poor') perfScore -= 25;
    else if (cwv.lcp_status === 'needs-improvement') perfScore -= 10;
    if (cwv.fcp_status === 'poor') perfScore -= 15;
    else if (cwv.fcp_status === 'needs-improvement') perfScore -= 8;
    if (cwv.tbt_status === 'poor') perfScore -= 20;
    else if (cwv.tbt_status === 'needs-improvement') perfScore -= 10;
    if (cwv.cls_status === 'poor') perfScore -= 20;
    else if (cwv.cls_status === 'needs-improvement') perfScore -= 10;
  }

  // Resources Score
  let resourcesScore = 100;
  for (const issue of data.resourcesIssues) {
    if (issue.impact === 'critical') resourcesScore -= 15;
    else if (issue.impact === 'serious') resourcesScore -= 10;
    else if (issue.impact === 'moderate') resourcesScore -= 5;
    else resourcesScore -= 2;
  }
  // Also incorporate PSI resource-related issues
  for (const issue of (data.performanceIssues || []).filter((i) => i.category === 'resources')) {
    if (issue.impact === 'critical') resourcesScore -= 12;
    else if (issue.impact === 'serious') resourcesScore -= 8;
    else if (issue.impact === 'moderate') resourcesScore -= 4;
  }

  // Images Score
  let imagesScore = 100;
  for (const issue of data.imagesIssues) {
    if (issue.impact === 'critical') imagesScore -= 15;
    else if (issue.impact === 'serious') imagesScore -= 10;
    else if (issue.impact === 'moderate') imagesScore -= 5;
    else imagesScore -= 2;
  }
  // Also incorporate PSI image-related issues
  for (const issue of (data.performanceIssues || []).filter((i) => i.category === 'images')) {
    if (issue.impact === 'critical') imagesScore -= 12;
    else if (issue.impact === 'serious') imagesScore -= 8;
    else if (issue.impact === 'moderate') imagesScore -= 4;
  }

  // Network/Caching Score
  let networkScore = 100;
  for (const issue of data.networkIssues) {
    if (issue.impact === 'critical') networkScore -= 15;
    else if (issue.impact === 'serious') networkScore -= 10;
    else if (issue.impact === 'moderate') networkScore -= 5;
    else networkScore -= 2;
  }
  // Also incorporate PSI network-related issues
  for (const issue of (data.performanceIssues || []).filter((i) => i.category === 'network')) {
    if (issue.impact === 'critical') networkScore -= 12;
    else if (issue.impact === 'serious') networkScore -= 8;
    else if (issue.impact === 'moderate') networkScore -= 4;
  }

  // Security Score — use pre-calculated from securityScanner
  const securityScore = data.securityDetails?.security_score ?? 100;

  // Code Quality Score
  let codeQualityScore = 100;
  for (const issue of data.codeQualityIssues) {
    if (issue.impact === 'critical') codeQualityScore -= 15;
    else if (issue.impact === 'serious') codeQualityScore -= 10;
    else if (issue.impact === 'moderate') codeQualityScore -= 5;
    else codeQualityScore -= 2;
  }
  // Also incorporate PSI code-quality-related issues
  for (const issue of (data.performanceIssues || []).filter((i) => i.category === 'code_quality')) {
    if (issue.impact === 'critical') codeQualityScore -= 12;
    else if (issue.impact === 'serious') codeQualityScore -= 8;
    else if (issue.impact === 'moderate') codeQualityScore -= 4;
  }

  // Mobile Score (kept for backward compat, not in overall)
  let mobileScore = 100;
  const mf = data.mobileFriendliness || {};
  if (!mf.viewport_configured) mobileScore -= 30;
  if (!mf.text_readable) mobileScore -= 25;
  if (!mf.tap_targets_sized) mobileScore -= 25;
  if (mf.content_wider_than_screen) mobileScore -= 20;

  const scores = {
    accessibility: clamp(accScore),
    seo: clamp(seoScore),
    performance: clamp(perfScore),
    resources: clamp(resourcesScore),
    images: clamp(imagesScore),
    network_caching: clamp(networkScore),
    security: clamp(securityScore),
    code_quality: clamp(codeQualityScore),
    mobile: clamp(mobileScore),
  };

  // Weighted overall (8 categories — mobile excluded)
  scores.overall = Math.round(
    scores.accessibility * CATEGORY_WEIGHTS.accessibility +
    scores.seo * CATEGORY_WEIGHTS.seo +
    scores.performance * CATEGORY_WEIGHTS.performance +
    scores.resources * CATEGORY_WEIGHTS.resources +
    scores.images * CATEGORY_WEIGHTS.images +
    scores.network_caching * CATEGORY_WEIGHTS.network_caching +
    scores.security * CATEGORY_WEIGHTS.security +
    scores.code_quality * CATEGORY_WEIGHTS.code_quality
  );

  return scores;
};

// ── Grade mapping ──────────────────────────────────────────────────────────
const scoreToGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

const buildGradeReport = (scores) => {
  const report = {};
  for (const [cat, score] of Object.entries(scores)) {
    report[cat] = { score, grade: scoreToGrade(score) };
  }
  return report;
};

// ── Risk & WCAG ────────────────────────────────────────────────────────────
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

// ── Recommendations ────────────────────────────────────────────────────────
const generateRecommendations = (scores, data) => {
  const recs = [];

  if (scores.accessibility < 80) {
    const critical = (data.accessibilityIssues || []).filter((i) => i.impact === 'critical');
    if (critical.length > 0) {
      recs.push(`Fix ${critical.length} critical accessibility issues (images alt text, form labels, ARIA)`);
    }
  }

  if (scores.seo < 80) {
    recs.push('Improve meta descriptions and title tags for better search visibility');
    recs.push('Add structured data markup (Schema.org) for rich snippets');
  }

  if (scores.performance < 80) {
    const pd = data.performanceData || {};
    if (pd.lcp_status !== 'good') {
      recs.push(`Improve Largest Contentful Paint (currently ${pd.lcp}s, target < 2.5s)`);
    }
    if (pd.tbt_status === 'poor' || pd.tbt_status === 'needs-improvement') {
      recs.push(`Reduce Total Blocking Time (currently ${pd.tbt}ms, target < 200ms)`);
    }
  }

  if (scores.resources < 80) {
    const summary = data.resourcesSummary || {};
    if (summary.render_blocking_count > 0) {
      recs.push(`Eliminate ${summary.render_blocking_count} render-blocking resources to improve FCP/LCP`);
    }
    if (summary.dom_element_count > 1500) {
      recs.push(`Reduce DOM size (${summary.dom_element_count.toLocaleString()} elements) for faster rendering`);
    }
  }

  if (scores.images < 80) {
    const summary = data.imagesSummary || {};
    if (summary.legacy_format > 0) {
      recs.push(`Convert ${summary.legacy_format} images to WebP/AVIF for 25-50% smaller file sizes`);
    }
    if (summary.without_dimensions > 0) {
      recs.push(`Add width/height to ${summary.without_dimensions} images to prevent layout shifts`);
    }
  }

  if (scores.security < 80) {
    recs.push('Add security headers (CSP, HSTS, X-Frame-Options) to protect against attacks');
  }

  if (scores.network_caching < 80) {
    recs.push('Enable text compression (gzip/brotli) and configure caching headers');
  }

  if (scores.code_quality < 80) {
    recs.push('Minify CSS/JS and add font-display: swap to prevent invisible text during font loading');
  }

  return recs.slice(0, 8);
};

// ── Main audit entrypoint ──────────────────────────────────────────────────
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

  // Build CWV object (from PSI or estimates)
  const pd = scanResult.performance_data || {};
  const coreWebVitals = {
    fcp: pd.fcp, fcp_status: pd.fcp_status || 'unknown',
    lcp: pd.lcp, lcp_status: pd.lcp_status || 'unknown',
    tbt: pd.tbt, tbt_status: pd.tbt_status || 'unknown',
    cls: pd.cls, cls_status: pd.cls_status || 'unknown',
    speed_index: pd.speed_index, speed_index_status: pd.speed_index_status || 'unknown',
    tti: pd.tti, tti_status: pd.tti_status || 'unknown',
    ttfb: pd.ttfb, ttfb_status: pd.ttfb_status || 'unknown',
    inp: pd.inp, inp_status: pd.inp_status || 'unknown',
    fully_loaded_time: pd.fully_loaded_time,
    overall_status: pd.overall_status || 'unknown',
    source: pd.source || 'estimated',
  };

  // Calculate 8-category scores
  const scores = calculateScores({
    accessibilityIssues: scanResult.accessibility_issues || [],
    seoIssues: scanResult.seo_issues || [],
    performanceData: pd,
    performanceIssues: scanResult.performance_issues || [],
    resourcesIssues: scanResult.resources_issues || [],
    imagesIssues: scanResult.images_issues || [],
    networkIssues: scanResult.network_issues || [],
    securityDetails: scanResult.security_details,
    codeQualityIssues: scanResult.code_quality_issues || [],
    mobileFriendliness: scanResult.mobile_friendliness,
  });

  // Issue counts
  const allIssues = [
    ...(scanResult.accessibility_issues || []),
    ...(scanResult.seo_issues || []),
    ...(scanResult.resources_issues || []),
    ...(scanResult.images_issues || []),
    ...(scanResult.security_issues || []),
    ...(scanResult.network_issues || []),
    ...(scanResult.code_quality_issues || []),
  ];
  const criticalCount = allIssues.filter((i) => i.impact === 'critical').reduce((sum, i) => sum + (i.count || 1), 0);
  const warningsCount = allIssues.filter((i) => i.type === 'warning').length;
  const totalIssues = allIssues.reduce((sum, i) => sum + (i.count || 1), 0);

  const lawsuitRisk = determineLawsuitRisk(scores.accessibility, criticalCount);
  const wcagLevel = determineWcagLevel(scores.accessibility);
  const gradeReport = buildGradeReport(scores);
  const recommendations = generateRecommendations(scores, {
    accessibilityIssues: scanResult.accessibility_issues || [],
    performanceData: pd,
    resourcesSummary: scanResult.resources_summary,
    imagesSummary: scanResult.images_summary,
  });

  // Security object (backward compat shape)
  const security = {
    has_https: scanResult.security_details?.has_https ?? false,
    has_hsts: scanResult.security_details?.has_hsts ?? false,
    has_csp: scanResult.security_details?.has_csp ?? false,
    mixed_content: scanResult.security_details?.mixed_content ?? false,
    security_score: scores.security,
    ...scanResult.security_details,
  };

  // Network/caching object
  const networkCaching = {
    ...scanResult.network_details,
    issues: scanResult.network_issues || [],
    score: scores.network_caching,
  };

  return {
    url,
    audit_type: auditType,
    // 8 category scores
    accessibility_score: scores.accessibility,
    seo_score: scores.seo,
    performance_score: scores.performance,
    resources_score: scores.resources,
    images_score: scores.images,
    network_caching_score: scores.network_caching,
    security_score: scores.security,
    code_quality_score: scores.code_quality,
    // Mobile (backward compat)
    mobile_score: scores.mobile,
    // Overall
    overall_score: scores.overall,
    // Grade report
    grade_report: gradeReport,
    // Risk & compliance
    lawsuit_risk: lawsuitRisk,
    wcag_level: wcagLevel,
    // Issue arrays
    accessibility_issues: scanResult.accessibility_issues || [],
    seo_issues: scanResult.seo_issues || [],
    resources_issues: scanResult.resources_issues || [],
    images_issues: scanResult.images_issues || [],
    code_quality_issues: scanResult.code_quality_issues || [],
    // Complex objects
    core_web_vitals: coreWebVitals,
    mobile_friendliness: scanResult.mobile_friendliness,
    structured_data: scanResult.structured_data,
    security,
    network_caching: networkCaching,
    // Totals
    total_issues: totalIssues,
    critical_issues: criticalCount,
    warnings: warningsCount,
    // Recommendations & fixes
    top_recommendations: recommendations,
    fixes_applied: scanResult.fixes_applied || [],
    // Page metadata
    page_title: scanResult.page_title || null,
    meta_description: scanResult.meta_description || null,
    images_without_alt: scanResult.images_without_alt || [],
    // DOM analysis for frontend
    dom_analysis: scanResult.dom_analysis || null,
    // PSI data
    pagespeed_data: scanResult.pagespeed_data || {},
    // Scan info
    scan_successful: scanResult.scan_successful,
    scan_duration: scanDuration,
  };
};

module.exports = { performAudit };
