/**
 * Code Quality Scanner
 * Checks: minification, font-display, document.write, source maps,
 * font preloads, non-composited animations
 */

const scanCodeQuality = ($, html) => {
  const issues = [];

  // 1. Check inline CSS minification
  let unminifiedInlineCss = 0;
  $('style').each((_, el) => {
    const css = $(el).html() || '';
    // Heuristic: non-minified CSS has many newlines relative to length
    if (css.length > 500) {
      const newlineCount = (css.match(/\n/g) || []).length;
      const ratio = newlineCount / (css.length / 100);
      if (ratio > 2) {
        unminifiedInlineCss++;
      }
    }
  });
  if (unminifiedInlineCss > 0) {
    issues.push({
      type: 'warning', code: 'unminified-inline-css',
      message: `${unminifiedInlineCss} inline <style> block(s) appear unminified`,
      impact: 'moderate', category: 'code_quality',
      recommendation: 'Minify inline CSS to reduce page size',
    });
  }

  // 2. Check for font-display in @font-face (from inline styles)
  const allCss = [];
  $('style').each((_, el) => allCss.push($(el).html() || ''));
  const cssText = allCss.join('\n');
  const hasFontFace = cssText.includes('@font-face');
  const hasFontDisplay = cssText.includes('font-display');
  if (hasFontFace && !hasFontDisplay) {
    issues.push({
      type: 'warning', code: 'font-display-missing',
      message: '@font-face rules without font-display cause invisible text during font loading (FOIT)',
      impact: 'moderate', category: 'code_quality',
      recommendation: 'Add font-display: swap (or optional) to all @font-face rules',
    });
  }

  // 3. Check for Google Fonts link without display=swap
  $('link[href*="fonts.googleapis.com"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (!href.includes('display=swap') && !href.includes('display=optional')) {
      issues.push({
        type: 'warning', code: 'google-fonts-display',
        message: 'Google Fonts loaded without display=swap parameter',
        impact: 'moderate', category: 'code_quality',
        element: href.substring(0, 100),
        recommendation: 'Add &display=swap to Google Fonts URL to prevent FOIT',
      });
    }
  });

  // 4. Check for font preloads
  const fontPreloads = [];
  $('link[rel="preload"][as="font"]').each((_, el) => {
    fontPreloads.push($(el).attr('href') || '');
  });

  // 5. Detect document.write (deprecated, parser-blocking)
  let hasDocumentWrite = false;
  $('script:not([src])').each((_, el) => {
    const content = $(el).html() || '';
    if (content.includes('document.write')) {
      hasDocumentWrite = true;
    }
  });
  if (hasDocumentWrite) {
    issues.push({
      type: 'error', code: 'document-write',
      message: 'document.write() detected — it is deprecated and blocks HTML parsing',
      impact: 'serious', category: 'code_quality',
      recommendation: 'Replace document.write() with DOM manipulation methods (appendChild, insertAdjacentHTML)',
    });
  }

  // 6. Source maps detection
  let hasSourceMaps = false;
  $('script:not([src])').each((_, el) => {
    const content = $(el).html() || '';
    if (content.includes('sourceMappingURL')) {
      hasSourceMaps = true;
    }
  });

  // 7. Non-composited animations — detect animation/transition on non-transform/opacity
  let nonCompositedAnimHints = 0;
  $('[style*="animation"], [style*="transition"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    // Flag if animating properties other than transform and opacity
    if (style.includes('animation') || style.includes('transition')) {
      const animatesLayout = /(?:width|height|top|left|right|bottom|margin|padding)\s*[^;]*(?:animation|transition)/i.test(style) ||
        /(?:animation|transition)[^;]*(?:width|height|top|left|right|bottom|margin|padding)/i.test(style);
      if (animatesLayout) {
        nonCompositedAnimHints++;
      }
    }
  });
  if (nonCompositedAnimHints > 0) {
    issues.push({
      type: 'warning', code: 'non-composited-animations',
      message: `${nonCompositedAnimHints} element(s) may use non-composited animations (animating layout properties)`,
      impact: 'moderate', category: 'code_quality',
      recommendation: 'Use transform and opacity for animations instead of width, height, top, left, etc.',
    });
  }

  // 8. Detect inline event handlers (onclick, onmouseover, etc.) — code smell
  let inlineHandlers = 0;
  const handlerAttrs = ['onclick', 'onmouseover', 'onmouseout', 'onchange', 'onsubmit', 'onload', 'onerror', 'onfocus', 'onblur'];
  for (const attr of handlerAttrs) {
    $(`[${attr}]`).each(() => inlineHandlers++);
  }
  if (inlineHandlers > 5) {
    issues.push({
      type: 'warning', code: 'inline-event-handlers',
      message: `${inlineHandlers} inline event handlers detected (onclick, etc.)`,
      impact: 'minor', category: 'code_quality',
      recommendation: 'Move inline event handlers to external JavaScript using addEventListener',
    });
  }

  return {
    issues,
    summary: {
      unminified_inline_css: unminifiedInlineCss,
      has_font_face: hasFontFace,
      has_font_display: hasFontDisplay,
      font_preloads: fontPreloads.length,
      has_document_write: hasDocumentWrite,
      has_source_maps: hasSourceMaps,
      non_composited_animations: nonCompositedAnimHints,
      inline_event_handlers: inlineHandlers,
    },
  };
};

module.exports = { scanCodeQuality };
