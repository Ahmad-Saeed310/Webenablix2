/**
 * Website Scanner Service - Node.js port of the Python scanner
 * Uses axios for HTTP requests and cheerio for HTML parsing
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
const https = require('https');

const SCAN_TIMEOUT = 30000; // 30 seconds

// Allow self-signed / untrusted certs so we can scan any public site
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

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
 * Main website scanner
 */
const scanWebsite = async (url) => {
  const startTime = Date.now();
  let html = '';
  let headers = {};
  let statusCode = 0;
  let scanSuccessful = false;
  let loadTime = 0;

  try {
    const response = await axios.get(url, {
      timeout: SCAN_TIMEOUT,
      httpsAgent,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; WebenablixBot/1.0; +https://webenablix.com/bot)',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      maxRedirects: 5,
    });

    html = response.data;
    headers = response.headers;
    statusCode = response.status;
    loadTime = (Date.now() - startTime) / 1000;
    scanSuccessful = true;
  } catch (err) {
    console.error(`Scan error for ${url}:`, err.message);
    return {
      scan_successful: false,
      error: err.message,
      accessibility_issues: [],
      seo_issues: [],
      performance_metrics: {},
      mobile_issues: [],
      security_issues: [],
    };
  }

  const $ = cheerio.load(html);

  // ---- Accessibility Issues ----
  const accessibilityIssues = [];

  // 1. Images without alt text
  const imagesWithoutAlt = [];
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    const src = $(el).attr('src') || '';
    if (alt === undefined || alt === null) {
      imagesWithoutAlt.push({ src, issue: 'missing alt attribute' });
    }
  });
  if (imagesWithoutAlt.length > 0) {
    accessibilityIssues.push({
      type: 'error',
      code: 'img-alt',
      message: 'Images must have alternate text (WCAG 1.1.1)',
      count: imagesWithoutAlt.length,
      impact: 'critical',
      category: 'accessibility',
      elements: imagesWithoutAlt.slice(0, 5),
    });
  }

  // 2. Form inputs without labels
  let unlabeledInputs = 0;
  $('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"])').each((_, el) => {
    const id = $(el).attr('id');
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledBy = $(el).attr('aria-labelledby');
    if (!ariaLabel && !ariaLabelledBy && (!id || $(`label[for="${id}"]`).length === 0)) {
      unlabeledInputs++;
    }
  });
  if (unlabeledInputs > 0) {
    accessibilityIssues.push({
      type: 'error',
      code: 'label',
      message: 'Form elements must have labels (WCAG 1.3.1)',
      count: unlabeledInputs,
      impact: 'critical',
      category: 'accessibility',
    });
  }

  // 3. Missing page title
  const pageTitle = $('title').first().text().trim();
  if (!pageTitle) {
    accessibilityIssues.push({
      type: 'error',
      code: 'page-title',
      message: 'Page must have a title (WCAG 2.4.2)',
      count: 1,
      impact: 'serious',
      category: 'accessibility',
    });
  }

  // 4. Missing lang attribute
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    accessibilityIssues.push({
      type: 'error',
      code: 'html-lang',
      message: 'Page must have lang attribute (WCAG 3.1.1)',
      count: 1,
      impact: 'serious',
      category: 'accessibility',
    });
  }

  // 5. Links without text
  let emptyLinks = 0;
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) {
      emptyLinks++;
    }
  });
  if (emptyLinks > 0) {
    accessibilityIssues.push({
      type: 'error',
      code: 'link-name',
      message: 'Links must have discernible text (WCAG 2.4.4)',
      count: emptyLinks,
      impact: 'serious',
      category: 'accessibility',
    });
  }

  // 6. Buttons without text
  let emptyButtons = 0;
  $('button').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) {
      emptyButtons++;
    }
  });
  if (emptyButtons > 0) {
    accessibilityIssues.push({
      type: 'error',
      code: 'button-name',
      message: 'Buttons must have discernible text (WCAG 4.1.2)',
      count: emptyButtons,
      impact: 'critical',
      category: 'accessibility',
    });
  }

  // 7. Duplicate IDs
  const allIds = [];
  $('[id]').each((_, el) => {
    allIds.push($(el).attr('id'));
  });
  const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    accessibilityIssues.push({
      type: 'error',
      code: 'duplicate-id',
      message: 'IDs must be unique (WCAG 4.1.1)',
      count: duplicateIds.length,
      impact: 'serious',
      category: 'accessibility',
    });
  }

  // 8. Skip link (bypass)
  const hasSkipLink = $('a[href^="#"]').first().length > 0;
  if (!hasSkipLink) {
    accessibilityIssues.push({
      type: 'error',
      code: 'bypass',
      message: 'Page must have means to bypass repeated blocks (WCAG 2.4.1)',
      count: 1,
      impact: 'serious',
      category: 'accessibility',
    });
  }

  // ---- SEO Issues ----
  const seoIssues = [];
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const metaTitle = $('title').first().text().trim();

  if (!metaDesc) {
    seoIssues.push({
      type: 'error',
      code: 'meta-description',
      message: 'Meta description is missing',
      recommendation: 'Add a unique meta description between 150-160 characters',
      impact: 'serious',
      category: 'seo',
    });
  } else if (metaDesc.length < 50) {
    seoIssues.push({
      type: 'warning',
      code: 'meta-description-short',
      message: 'Meta description is too short',
      recommendation: 'Meta description should be 150-160 characters',
      impact: 'moderate',
      category: 'seo',
    });
  } else if (metaDesc.length > 160) {
    seoIssues.push({
      type: 'warning',
      code: 'meta-description-length',
      message: 'Meta description exceeds recommended length',
      recommendation: 'Keep meta description under 160 characters',
      impact: 'moderate',
      category: 'seo',
    });
  }

  if (!metaTitle) {
    seoIssues.push({
      type: 'error',
      code: 'title-tag',
      message: 'Title tag is missing',
      recommendation: 'Add unique title tag between 50-60 characters with target keywords',
      impact: 'critical',
      category: 'seo',
    });
  } else if (metaTitle.length < 10 || metaTitle.length > 70) {
    seoIssues.push({
      type: 'warning',
      code: 'title-tag-length',
      message: 'Title tag length is not optimal',
      recommendation: 'Title should be 50-60 characters',
      impact: 'moderate',
      category: 'seo',
    });
  }

  const h1Tags = $('h1');
  if (h1Tags.length === 0) {
    seoIssues.push({
      type: 'error',
      code: 'h1-tag',
      message: 'H1 tag is missing',
      recommendation: 'Use exactly one H1 tag per page with primary keyword',
      impact: 'serious',
      category: 'seo',
    });
  } else if (h1Tags.length > 1) {
    seoIssues.push({
      type: 'warning',
      code: 'h1-multiple',
      message: `Multiple H1 tags found (${h1Tags.length})`,
      recommendation: 'Use exactly one H1 tag per page',
      impact: 'moderate',
      category: 'seo',
    });
  }

  // Open Graph tags
  const hasOgTitle = $('meta[property="og:title"]').length > 0;
  if (!hasOgTitle) {
    seoIssues.push({
      type: 'warning',
      code: 'og-tags',
      message: 'Open Graph tags are missing',
      recommendation: 'Add Open Graph tags for better social sharing',
      impact: 'moderate',
      category: 'seo',
    });
  }

  // Canonical
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  if (!hasCanonical) {
    seoIssues.push({
      type: 'warning',
      code: 'canonical-tag',
      message: 'Canonical tag is missing',
      recommendation: 'Add canonical tag to prevent duplicate content issues',
      impact: 'serious',
      category: 'seo',
    });
  }

  // ---- Mobile Issues ----
  const mobileIssues = [];
  const viewport = $('meta[name="viewport"]').attr('content') || '';
  if (!viewport) {
    mobileIssues.push({
      type: 'error',
      code: 'viewport',
      message: 'Viewport meta tag not configured',
      impact: 'critical',
    });
  } else if (!viewport.includes('width=device-width')) {
    mobileIssues.push({
      type: 'warning',
      code: 'viewport-width',
      message: 'Viewport not configured for device width',
      impact: 'serious',
    });
  }

  // ---- Security Issues ----
  const securityIssues = [];
  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:') {
    securityIssues.push({
      type: 'error',
      code: 'https',
      message: 'Site is not served over HTTPS',
      impact: 'critical',
    });
  }

  const contentSecurityPolicy = headers['content-security-policy'];
  if (!contentSecurityPolicy) {
    securityIssues.push({
      type: 'warning',
      code: 'content-security-policy',
      message: 'Content Security Policy header is missing',
      impact: 'serious',
    });
  }

  const hstsHeader = headers['strict-transport-security'];
  if (!hstsHeader) {
    securityIssues.push({
      type: 'warning',
      code: 'hsts',
      message: 'HSTS header is missing',
      impact: 'moderate',
    });
  }

  // ---- Performance Metrics ----
  const performanceMetrics = {
    load_time: loadTime,
    status_code: statusCode,
    page_size: Buffer.byteLength(html, 'utf8'),
    firstContentfulPaint: Math.round(loadTime * 800), // rough estimate ms
  };

  // ---- DOM Analysis (rich element-level breakdown) ----
  const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const headings = {};
  headingLevels.forEach((tag) => {
    const items = [];
    $(tag).each((_, el) => {
      items.push($(el).text().trim().substring(0, 100));
    });
    headings[tag] = { count: items.length, items };
  });

  // All images with alt status — resolve to absolute URLs so the browser can load them
  const pageOrigin = (() => { try { const u = new URL(url); return u.origin; } catch { return ''; } })();
  const resolveUrl = (src) => {
    if (!src) return '';
    if (src.startsWith('data:')) return src; // inline data-URI, keep as-is
    try { return new URL(src, url).href; } catch { return src; }
  };

  const totalImages = $('img').length;
  const allImages = [];
  $('img').each((i, el) => {
    const alt = $(el).attr('alt');
    const rawSrc = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src') || '';
    const resolvedSrc = resolveUrl(rawSrc);
    const width  = $(el).attr('width')  || null;
    const height = $(el).attr('height') || null;
    const loading = $(el).attr('loading') || null;
    allImages.push({
      index:    i + 1,
      src:      resolvedSrc.substring(0, 400),
      rawSrc:   rawSrc.substring(0, 200),
      alt:      alt !== undefined && alt !== null ? alt : null,
      hasAlt:   alt !== undefined && alt !== null,
      isEmpty:  alt === '',
      width,
      height,
      loading,
    });
  });

  // All links with text status
  const totalLinks = $('a').length;
  const allLinks = [];
  $('a').each((i, el) => {
    const text = $(el).text().trim().substring(0, 80);
    const href = ($(el).attr('href') || '').substring(0, 100);
    const ariaLabel = $(el).attr('aria-label') || '';
    const hasText = !!(text || ariaLabel);
    allLinks.push({ index: i + 1, href, text: text || ariaLabel, hasText });
  });

  // All buttons
  const totalButtons = $('button').length;
  const allButtons = [];
  $('button').each((i, el) => {
    const text = $(el).text().trim().substring(0, 80);
    const ariaLabel = $(el).attr('aria-label') || '';
    const hasText = !!(text || ariaLabel);
    allButtons.push({ index: i + 1, text: text || ariaLabel, hasText });
  });

  // All form inputs
  const inputSelector =
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"])';
  const totalInputs = $(inputSelector).length;
  const allInputs = [];
  $(inputSelector).each((i, el) => {
    const id = $(el).attr('id');
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledBy = $(el).attr('aria-labelledby');
    const type = $(el).attr('type') || 'text';
    const hasLabel =
      !!(ariaLabel || ariaLabelledBy || (id && $(`label[for="${id}"]`).length > 0));
    allInputs.push({ index: i + 1, type, id: id || null, hasLabel });
  });

  // Meta / head tags
  const htmlLangAttr = $('html').attr('lang') || null;
  const viewportContent = $('meta[name="viewport"]').attr('content') || null;
  const canonicalHref = $('link[rel="canonical"]').attr('href') || null;
  const ogTitle = $('meta[property="og:title"]').attr('content') || null;
  const ogDescription = $('meta[property="og:description"]').attr('content') || null;
  const ogImage = $('meta[property="og:image"]').attr('content') || null;
  const twitterCard = $('meta[name="twitter:card"]').attr('content') || null;
  const robotsMeta = $('meta[name="robots"]').attr('content') || null;
  const faviconHref =
    $('link[rel="icon"], link[rel="shortcut icon"]').first().attr('href') || null;

  const domAnalysis = {
    page_title: pageTitle || null,
    page_title_length: pageTitle ? pageTitle.length : 0,
    meta_description: metaDesc || null,
    meta_description_length: metaDesc ? metaDesc.length : 0,
    html_lang: htmlLangAttr,
    viewport: viewportContent,
    canonical: canonicalHref,
    og_title: ogTitle,
    og_description: ogDescription,
    og_image: ogImage,
    twitter_card: twitterCard,
    robots: robotsMeta,
    favicon: faviconHref,
    headings,
    images: { total: totalImages, items: allImages.slice(0, 50) },
    links: { total: totalLinks, empty_count: emptyLinks, items: allLinks.slice(0, 30) },
    buttons: { total: totalButtons, empty_count: emptyButtons, items: allButtons.slice(0, 20) },
    inputs: { total: totalInputs, unlabeled_count: unlabeledInputs, items: allInputs.slice(0, 20) },
    duplicate_ids: duplicateIds.slice(0, 10),
    has_skip_link: hasSkipLink,
  };

  return {
    scan_successful: scanSuccessful,
    page_title: pageTitle || null,
    meta_description: metaDesc || null,
    images_without_alt: imagesWithoutAlt.slice(0, 10),
    accessibility_issues: accessibilityIssues,
    seo_issues: seoIssues,
    performance_metrics: performanceMetrics,
    mobile_issues: mobileIssues,
    security_issues: securityIssues,
    dom_analysis: domAnalysis,
  };
};

module.exports = { scanWebsite, validateUrl };
