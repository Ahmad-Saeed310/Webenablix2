/**
 * Resources & JavaScript Scanner
 * Checks: render-blocking scripts/CSS, DOM size, page size,
 * inline script size, third-party scripts
 */

const THIRD_PARTY_PATTERNS = [
  'google-analytics.com', 'googletagmanager.com', 'google.com/recaptcha',
  'facebook.net', 'fbcdn.net', 'connect.facebook.net',
  'twitter.com', 'platform.twitter.com',
  'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com',
  'fonts.googleapis.com', 'fonts.gstatic.com',
  'hotjar.com', 'clarity.ms', 'intercom.io',
  'stripe.com', 'js.stripe.com',
  'sentry.io', 'cdn.segment.com',
];

const scanResources = ($, html) => {
  const issues = [];

  // Render-blocking scripts (in <head> without async/defer)
  const scripts = [];
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src') || '';
    const hasAsync = $(el).attr('async') !== undefined;
    const hasDefer = $(el).attr('defer') !== undefined;
    const inHead = $(el).parents('head').length > 0;
    const isThirdParty = THIRD_PARTY_PATTERNS.some((p) => src.includes(p));
    scripts.push({ src, async: hasAsync, defer: hasDefer, inHead, isThirdParty });

    if (inHead && !hasAsync && !hasDefer) {
      issues.push({
        type: 'error', code: 'render-blocking-js',
        message: `Render-blocking script in <head>: ${src.substring(0, 100)}`,
        impact: 'serious', category: 'resources',
        element: `<script src="${src.substring(0, 100)}">`,
      });
    }
  });

  // Render-blocking CSS
  const stylesheets = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const media = $(el).attr('media') || 'all';
    stylesheets.push({ href, media });
    if (media === 'all' || media === '') {
      issues.push({
        type: 'warning', code: 'render-blocking-css',
        message: `Potentially render-blocking stylesheet: ${href.substring(0, 100)}`,
        impact: 'moderate', category: 'resources',
        element: `<link rel="stylesheet" href="${href.substring(0, 100)}">`,
      });
    }
  });

  // Inline script size
  let inlineScriptBytes = 0;
  $('script:not([src])').each((_, el) => {
    inlineScriptBytes += ($(el).html() || '').length;
  });

  // DOM element count
  const domCount = $('*').length;
  if (domCount > 1500) {
    issues.push({
      type: domCount > 3000 ? 'error' : 'warning',
      code: 'dom-size',
      message: `Excessive DOM size: ${domCount.toLocaleString()} elements (recommended < 1,500)`,
      impact: domCount > 3000 ? 'serious' : 'moderate',
      category: 'resources',
    });
  }

  // Page size estimate
  const pageSize = Buffer.byteLength(html, 'utf8');
  if (pageSize > 3 * 1024 * 1024) {
    issues.push({
      type: 'error', code: 'page-size',
      message: `Page size is ${(pageSize / 1024 / 1024).toFixed(1)}MB (recommended < 3MB)`,
      impact: 'serious', category: 'resources',
    });
  }

  // Third-party script count
  const thirdPartyScripts = scripts.filter((s) => s.isThirdParty);
  if (thirdPartyScripts.length > 5) {
    issues.push({
      type: 'warning', code: 'third-party-scripts',
      message: `${thirdPartyScripts.length} third-party scripts detected — may block main thread`,
      impact: 'moderate', category: 'resources',
      elements: thirdPartyScripts.map((s) => s.src.substring(0, 80)),
    });
  }

  const renderBlockingCount = scripts.filter((s) => s.inHead && !s.async && !s.defer).length +
    stylesheets.filter((s) => s.media === 'all' || s.media === '').length;

  return {
    issues,
    summary: {
      total_scripts: scripts.length,
      total_stylesheets: stylesheets.length,
      render_blocking_count: renderBlockingCount,
      dom_element_count: domCount,
      page_size_bytes: pageSize,
      inline_script_bytes: inlineScriptBytes,
      third_party_scripts: thirdPartyScripts.length,
    },
  };
};

module.exports = { scanResources };
