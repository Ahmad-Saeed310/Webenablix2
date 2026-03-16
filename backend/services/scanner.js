/**
 * Website Scanner Service — Orchestrator
 * Fetches target URL, then runs all 8 category sub-scanners + fixes generator.
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

const { scanAccessibility } = require('./scanners/accessibilityScanner');
const { scanSeo } = require('./scanners/seoScanner');
const { scanPerformance } = require('./scanners/performanceScanner');
const { scanResources } = require('./scanners/resourcesScanner');
const { scanImages } = require('./scanners/imagesScanner');
const { scanSecurity } = require('./scanners/securityScanner');
const { scanNetwork } = require('./scanners/networkScanner');
const { scanCodeQuality } = require('./scanners/codeQualityScanner');
const { generateFixes } = require('./scanners/fixesGenerator');

const SCAN_TIMEOUT = 30000;

/**
 * Validate URL format
 */
const validateUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Main website scanner — orchestrates all sub-scanners
 */
const scanWebsite = async (url) => {
  const startTime = Date.now();
  let html = '';
  let headers = {};
  let statusCode = 0;
  let loadTime = 0;

  try {
    const response = await axios.get(url, {
      timeout: SCAN_TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WebenablixBot/1.0; +https://webenablix.com/bot)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      maxRedirects: 5,
    });

    html = response.data;
    headers = response.headers;
    statusCode = response.status;
    loadTime = (Date.now() - startTime) / 1000;
  } catch (err) {
    console.error(`Scan error for ${url}:`, err.message);
    return {
      scan_successful: false,
      error: err.message,
      accessibility_issues: [],
      seo_issues: [],
      performance_metrics: {},
      resources_issues: [],
      images_issues: [],
      mobile_issues: [],
      security_issues: [],
      network_issues: [],
      code_quality_issues: [],
      fixes_applied: [],
    };
  }

  const $ = cheerio.load(html);

  // Run all static HTML sub-scanners in parallel
  const [accessibility, seo, resources, images, security, network, codeQuality] = await Promise.all([
    Promise.resolve(scanAccessibility($)),
    Promise.resolve(scanSeo($)),
    Promise.resolve(scanResources($, html)),
    Promise.resolve(scanImages($)),
    Promise.resolve(scanSecurity(headers, url)),
    Promise.resolve(scanNetwork($, headers, url)),
    Promise.resolve(scanCodeQuality($, html)),
  ]);

  // Static performance metrics for fallback
  const pageSize = Buffer.byteLength(html, 'utf8');
  const staticPerf = {
    load_time: loadTime,
    status_code: statusCode,
    page_size: pageSize,
    firstContentfulPaint: Math.round(loadTime * 800),
  };

  // Run PageSpeed Insights (can be slow, 15-60s)
  const psiApiKey = process.env.PAGESPEED_API_KEY || null;
  const performance = await scanPerformance(url, psiApiKey, staticPerf);

  // Collect all issues for fix generation
  const allIssues = [
    ...accessibility.issues,
    ...seo.issues,
    ...resources.issues,
    ...images.issues,
    ...security.issues,
    ...network.issues,
    ...codeQuality.issues,
  ];

  // Generate fix suggestions
  const fixes = generateFixes($, allIssues, {
    images_without_alt: accessibility.imagesWithoutAlt || [],
  });

  // Build mobile compatibility (derived from existing checks for backward compat)
  const viewport = $('meta[name="viewport"]').attr('content') || '';
  const mobileFriendliness = {
    is_mobile_friendly: !!viewport,
    viewport_configured: !!viewport && viewport.includes('width=device-width'),
    text_readable: true,
    tap_targets_sized: true,
    content_wider_than_screen: false,
    issues: [],
  };

  return {
    scan_successful: true,
    page_title: $('title').first().text().trim() || null,
    meta_description: $('meta[name="description"]').attr('content') || null,
    images_without_alt: (accessibility.imagesWithoutAlt || []).slice(0, 10),

    // 8 category issue arrays
    accessibility_issues: accessibility.issues,
    seo_issues: seo.issues,
    performance_metrics: staticPerf,
    performance_data: performance.metrics,
    performance_issues: performance.issues,
    resources_issues: resources.issues,
    resources_summary: resources.summary,
    images_issues: images.issues,
    images_summary: images.summary,
    security_issues: security.issues,
    security_details: security.details,
    network_issues: network.issues,
    network_details: network.details,
    code_quality_issues: codeQuality.issues,
    code_quality_summary: codeQuality.summary,

    // Structured data (from SEO scanner)
    structured_data: seo.structured_data,

    // Mobile (backward compat)
    mobile_issues: [],
    mobile_friendliness: mobileFriendliness,

    // Fix suggestions
    fixes_applied: fixes,

    // PageSpeed Insights raw data
    pagespeed_data: performance.psiData,

    // DOM analysis data
    dom_analysis: buildDomAnalysis($, accessibility, seo, security),
  };
};

/**
 * Build DOM analysis object (used by frontend PageDOMAnalysis component)
 */
function buildDomAnalysis($, accessibility, seo, security) {
  const pageTitle = $('title').first().text().trim();
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const htmlLang = $('html').attr('lang') || '';
  const viewport = $('meta[name="viewport"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href') || '';
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  const ogDesc = $('meta[property="og:description"]').attr('content') || '';
  const ogImage = $('meta[property="og:image"]').attr('content') || '';
  const twitterCard = $('meta[name="twitter:card"]').attr('content') || '';
  const robots = $('meta[name="robots"]').attr('content') || '';
  const hasSkipLink = $('a[href^="#"]').first().length > 0;

  // Headings analysis
  const headings = { h1: { count: 0, items: [] }, h2: { count: 0, items: [] }, h3: { count: 0, items: [] }, h4: { count: 0, items: [] }, h5: { count: 0, items: [] }, h6: { count: 0, items: [] } };
  for (const level of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
    $(level).each((_, el) => {
      headings[level].count++;
      headings[level].items.push($(el).text().trim().substring(0, 120));
    });
  }

  // Images
  const imgItems = [];
  $('img').each((_, el) => {
    imgItems.push({
      src: $(el).attr('src') || '',
      hasAlt: $(el).attr('alt') !== undefined && $(el).attr('alt') !== null,
      alt: $(el).attr('alt') || '',
    });
  });

  // Links
  let emptyLinkCount = 0;
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) emptyLinkCount++;
  });

  // Buttons
  let emptyButtonCount = 0;
  $('button').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) emptyButtonCount++;
  });

  // Form inputs
  let unlabeledInputCount = 0;
  $('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"])').each((_, el) => {
    const id = $(el).attr('id');
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledBy = $(el).attr('aria-labelledby');
    if (!ariaLabel && !ariaLabelledBy && (!id || $(`label[for="${id}"]`).length === 0)) unlabeledInputCount++;
  });

  return {
    page_title: pageTitle || null,
    page_title_length: pageTitle ? pageTitle.length : 0,
    meta_description: metaDesc || null,
    meta_description_length: metaDesc ? metaDesc.length : 0,
    html_lang: htmlLang || null,
    viewport: viewport || null,
    canonical: canonical || null,
    favicon: favicon || null,
    og_title: ogTitle || null,
    og_description: ogDesc || null,
    og_image: ogImage || null,
    twitter_card: twitterCard || null,
    robots: robots || null,
    has_skip_link: hasSkipLink,
    duplicate_ids: accessibility.duplicateIds || [],
    headings,
    images: { total: imgItems.length, items: imgItems.slice(0, 15) },
    links: { total: $('a').length, empty_count: emptyLinkCount },
    buttons: { total: $('button').length, empty_count: emptyButtonCount },
    inputs: { total: $('input').length, unlabeled_count: unlabeledInputCount },
  };
}

module.exports = { scanWebsite, validateUrl };
