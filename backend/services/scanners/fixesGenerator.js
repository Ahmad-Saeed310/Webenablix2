/**
 * Fixes Generator
 * Generates concrete before/after code fix suggestions for detected issues.
 */

const generateFixes = ($, allIssues, scanData) => {
  const fixes = [];

  // Fix: Images without alt text
  const imgsNoAlt = (scanData.images_without_alt || []).slice(0, 5);
  for (const img of imgsNoAlt) {
    const src = (img.src || '').substring(0, 80);
    fixes.push({
      id: 'img-alt-fix',
      category: 'accessibility',
      priority: 'high',
      title: 'Add alt text to image',
      impact: 'Improves screen reader experience and SEO image indexing',
      before: `<img src="${src}">`,
      after: `<img src="${src}" alt="Descriptive text for this image">`,
      type: 'html_attribute',
    });
  }

  // Fix: Missing lang attribute
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    fixes.push({
      id: 'html-lang-fix',
      category: 'accessibility',
      priority: 'high',
      title: 'Add lang attribute to <html> element',
      impact: 'Screen readers use lang to select correct speech voice (WCAG 3.1.1)',
      before: '<html>',
      after: '<html lang="en">',
      type: 'html_attribute',
    });
  }

  // Fix: Missing page title
  const pageTitle = $('title').first().text().trim();
  if (!pageTitle) {
    fixes.push({
      id: 'page-title-fix',
      category: 'seo',
      priority: 'high',
      title: 'Add descriptive page title',
      impact: 'Title is the most important on-page SEO factor and required for accessibility',
      before: '<head>\n  <!-- no title -->\n</head>',
      after: '<head>\n  <title>Your Page Title - Brand Name</title>\n</head>',
      type: 'html_attribute',
    });
  }

  // Fix: Missing meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc) {
    fixes.push({
      id: 'meta-description-fix',
      category: 'seo',
      priority: 'high',
      title: 'Add meta description',
      impact: 'Meta descriptions appear in search results and improve click-through rates',
      before: '<head>\n  <title>...</title>\n</head>',
      after: '<head>\n  <title>...</title>\n  <meta name="description" content="Your 150-160 character description here">\n</head>',
      type: 'html_attribute',
    });
  }

  // Fix: Missing canonical tag
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) {
    fixes.push({
      id: 'canonical-fix',
      category: 'seo',
      priority: 'medium',
      title: 'Add canonical URL tag',
      impact: 'Prevents duplicate content issues in search engines',
      before: '<head>\n  ...\n</head>',
      after: '<head>\n  <link rel="canonical" href="https://yoursite.com/page">\n  ...\n</head>',
      type: 'html_attribute',
    });
  }

  // Fix: Missing viewport meta tag
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport) {
    fixes.push({
      id: 'viewport-fix',
      category: 'performance',
      priority: 'high',
      title: 'Add viewport meta tag for mobile rendering',
      impact: 'Without viewport meta, mobile browsers render at desktop width and scale down',
      before: '<head>\n  ...\n</head>',
      after: '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  ...\n</head>',
      type: 'html_attribute',
    });
  }

  // Fix: Render-blocking scripts in <head>
  const renderBlockingScripts = [];
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src') || '';
    const inHead = $(el).parents('head').length > 0;
    const hasAsync = $(el).attr('async') !== undefined;
    const hasDefer = $(el).attr('defer') !== undefined;
    if (inHead && !hasAsync && !hasDefer) {
      renderBlockingScripts.push(src);
    }
  });
  for (const src of renderBlockingScripts.slice(0, 3)) {
    const shortSrc = src.substring(0, 70);
    fixes.push({
      id: 'render-blocking-js-fix',
      category: 'resources',
      priority: 'medium',
      title: 'Defer render-blocking script',
      impact: 'Potential FCP/LCP improvement by not blocking HTML parsing',
      before: `<script src="${shortSrc}"></script>`,
      after: `<script src="${shortSrc}" defer></script>`,
      type: 'html_attribute',
    });
  }

  // Fix: Images without width/height
  let dimFixCount = 0;
  $('img').each((_, el) => {
    if (dimFixCount >= 3) return;
    const width = $(el).attr('width');
    const height = $(el).attr('height');
    if (!width || !height) {
      const src = ($(el).attr('src') || '').substring(0, 70);
      fixes.push({
        id: 'img-dimensions-fix',
        category: 'images',
        priority: 'medium',
        title: 'Add width and height to image',
        impact: 'Prevents Cumulative Layout Shift (CLS) during page load',
        before: `<img src="${src}">`,
        after: `<img src="${src}" width="800" height="600">`,
        type: 'html_attribute',
      });
      dimFixCount++;
    }
  });

  // Fix: LCP image with lazy loading
  const firstImg = $('img').first();
  if (firstImg.length && firstImg.attr('loading') === 'lazy') {
    const src = (firstImg.attr('src') || '').substring(0, 70);
    fixes.push({
      id: 'lcp-lazy-fix',
      category: 'images',
      priority: 'high',
      title: 'Remove lazy loading from LCP image',
      impact: 'Lazy loading the LCP image delays rendering of the largest visible element',
      before: `<img src="${src}" loading="lazy">`,
      after: `<img src="${src}">`,
      type: 'html_attribute',
    });
  }

  // Fix: Images not lazy loaded (below fold)
  let lazyFixCount = 0;
  $('img').each((i, el) => {
    if (i <= 2 || lazyFixCount >= 3) return;
    const loading = $(el).attr('loading');
    if (!loading) {
      const src = ($(el).attr('src') || '').substring(0, 70);
      fixes.push({
        id: 'img-lazy-fix',
        category: 'images',
        priority: 'medium',
        title: 'Add lazy loading to offscreen image',
        impact: 'Reduces initial page load by deferring offscreen image downloads',
        before: `<img src="${src}">`,
        after: `<img src="${src}" loading="lazy">`,
        type: 'html_attribute',
      });
      lazyFixCount++;
    }
  });

  // Fix: Google Fonts without display=swap
  $('link[href*="fonts.googleapis.com"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (!href.includes('display=swap') && !href.includes('display=optional')) {
      const separator = href.includes('?') ? '&' : '?';
      fixes.push({
        id: 'font-display-fix',
        category: 'code_quality',
        priority: 'medium',
        title: 'Add display=swap to Google Fonts',
        impact: 'Prevents invisible text during font loading (FOIT)',
        before: `<link href="${href.substring(0, 80)}" rel="stylesheet">`,
        after: `<link href="${href.substring(0, 80)}${separator}display=swap" rel="stylesheet">`,
        type: 'html_attribute',
      });
    }
  });

  // Fix: Missing security headers (server config)
  const securityIssues = allIssues.filter((i) => i.category === 'security');
  const hasCspIssue = securityIssues.some((i) => i.code === 'content-security-policy');
  const hasHstsIssue = securityIssues.some((i) => i.code === 'hsts');
  const hasClickjackIssue = securityIssues.some((i) => i.code === 'clickjacking');

  if (hasCspIssue || hasHstsIssue || hasClickjackIssue) {
    const headers = [];
    if (hasHstsIssue) headers.push("add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;");
    if (hasCspIssue) headers.push("add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';\" always;");
    if (hasClickjackIssue) headers.push("add_header X-Frame-Options \"SAMEORIGIN\" always;");

    fixes.push({
      id: 'security-headers-fix',
      category: 'security',
      priority: 'high',
      title: 'Add security headers (Nginx config)',
      impact: 'Protects against XSS, clickjacking, and protocol downgrade attacks',
      before: 'server {\n  # no security headers\n}',
      after: `server {\n  ${headers.join('\n  ')}\n}`,
      type: 'header_config',
    });
  }

  // Fix: Missing preconnect for third-party origins
  const networkIssues = allIssues.filter((i) => i.code === 'preconnect-missing');
  if (networkIssues.length > 0 && networkIssues[0].elements) {
    const origins = networkIssues[0].elements.slice(0, 3);
    const preconnectTags = origins.map((o) => `<link rel="preconnect" href="${o}" crossorigin>`).join('\n  ');
    fixes.push({
      id: 'preconnect-fix',
      category: 'network',
      priority: 'medium',
      title: 'Add preconnect hints for third-party origins',
      impact: 'Reduces connection setup time for critical third-party resources',
      before: '<head>\n  ...\n</head>',
      after: `<head>\n  ${preconnectTags}\n  ...\n</head>`,
      type: 'html_attribute',
    });
  }

  return fixes;
};

module.exports = { generateFixes };
