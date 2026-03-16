/**
 * Images & Media Scanner
 * Checks: alt text, width/height, lazy loading, LCP image lazy,
 * image format (WebP/AVIF), srcset usage
 */

const scanImages = ($) => {
  const issues = [];
  const images = [];

  $('img').each((_, el) => {
    const src = $(el).attr('src') || '';
    const alt = $(el).attr('alt');
    const width = $(el).attr('width');
    const height = $(el).attr('height');
    const loading = $(el).attr('loading');
    const srcset = $(el).attr('srcset') || '';
    const sizes = $(el).attr('sizes') || '';
    const idx = images.length;

    images.push({ src, alt, width, height, loading, srcset: !!srcset, sizes: !!sizes, index: idx });
  });

  let noAltCount = 0;
  let noDimensionsCount = 0;
  let notLazyCount = 0;
  let legacyFormatCount = 0;
  let lcpLazy = false;

  for (const img of images) {
    // Missing alt
    if (img.alt === undefined || img.alt === null) {
      noAltCount++;
    }

    // Missing width/height (causes CLS)
    if (!img.width || !img.height) {
      noDimensionsCount++;
      if (noDimensionsCount <= 5) {
        issues.push({
          type: 'warning', code: 'img-dimensions',
          message: `Image missing explicit width/height attributes`,
          impact: 'moderate', category: 'images',
          element: `<img src="${img.src.substring(0, 80)}">`,
          recommendation: 'Add width and height attributes to prevent Cumulative Layout Shift',
        });
      }
    }

    // Lazy loading: below-fold images (index > 2) should be lazy loaded
    if (!img.loading && img.index > 2) {
      notLazyCount++;
      if (notLazyCount <= 3) {
        issues.push({
          type: 'warning', code: 'img-lazy',
          message: `Offscreen image not using lazy loading`,
          impact: 'moderate', category: 'images',
          element: `<img src="${img.src.substring(0, 80)}">`,
          recommendation: 'Add loading="lazy" to below-the-fold images',
        });
      }
    }

    // LCP image should NOT be lazy loaded (first meaningful image, index 0)
    if (img.loading === 'lazy' && img.index === 0) {
      lcpLazy = true;
      issues.push({
        type: 'error', code: 'img-lcp-lazy',
        message: 'Potential LCP image has loading="lazy" which delays rendering',
        impact: 'serious', category: 'images',
        element: `<img src="${img.src.substring(0, 80)}" loading="lazy">`,
        recommendation: 'Remove loading="lazy" from the LCP (hero) image',
      });
    }

    // Image format check — flag non-modern formats
    const ext = img.src.split('?')[0].split('#')[0].split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(ext)) {
      legacyFormatCount++;
      if (legacyFormatCount <= 3) {
        issues.push({
          type: 'warning', code: 'img-format',
          message: `Image uses ${ext.toUpperCase()} format — consider WebP/AVIF for smaller file sizes`,
          impact: 'moderate', category: 'images',
          element: `<img src="${img.src.substring(0, 80)}">`,
          recommendation: `Convert ${ext.toUpperCase()} images to WebP or AVIF for 25-50% size reduction`,
        });
      }
    }
  }

  // Summary issues for aggregate counts
  if (noDimensionsCount > 5) {
    issues.push({
      type: 'warning', code: 'img-dimensions-summary',
      message: `${noDimensionsCount} images missing width/height attributes (showing first 5)`,
      impact: 'moderate', category: 'images',
    });
  }

  if (notLazyCount > 3) {
    issues.push({
      type: 'warning', code: 'img-lazy-summary',
      message: `${notLazyCount} offscreen images not lazy-loaded (showing first 3)`,
      impact: 'moderate', category: 'images',
    });
  }

  if (legacyFormatCount > 3) {
    issues.push({
      type: 'warning', code: 'img-format-summary',
      message: `${legacyFormatCount} images use legacy formats (JPEG/PNG/GIF) — consider WebP/AVIF`,
      impact: 'moderate', category: 'images',
    });
  }

  return {
    issues,
    images: images.slice(0, 20),
    summary: {
      total: images.length,
      without_alt: noAltCount,
      without_dimensions: noDimensionsCount,
      not_lazy_loaded: notLazyCount,
      legacy_format: legacyFormatCount,
      lcp_lazy_loaded: lcpLazy,
    },
  };
};

module.exports = { scanImages };
