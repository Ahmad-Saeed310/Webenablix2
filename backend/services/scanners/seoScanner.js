/**
 * SEO Scanner
 * Checks: title, meta description, H1, canonical, OG tags, structured data,
 * hreflang, robots meta, crawlable links
 */

const scanSeo = ($) => {
  const issues = [];

  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const metaTitle = $('title').first().text().trim();

  // Meta description
  if (!metaDesc) {
    issues.push({
      type: 'error', code: 'meta-description',
      message: 'Meta description is missing',
      recommendation: 'Add a unique meta description between 150-160 characters',
      impact: 'serious', category: 'seo',
    });
  } else if (metaDesc.length < 50) {
    issues.push({
      type: 'warning', code: 'meta-description-short',
      message: 'Meta description is too short',
      recommendation: 'Meta description should be 150-160 characters',
      impact: 'moderate', category: 'seo',
    });
  } else if (metaDesc.length > 160) {
    issues.push({
      type: 'warning', code: 'meta-description-length',
      message: 'Meta description exceeds recommended length',
      recommendation: 'Keep meta description under 160 characters',
      impact: 'moderate', category: 'seo',
    });
  }

  // Title tag
  if (!metaTitle) {
    issues.push({
      type: 'error', code: 'title-tag',
      message: 'Title tag is missing',
      recommendation: 'Add unique title tag between 50-60 characters with target keywords',
      impact: 'critical', category: 'seo',
    });
  } else if (metaTitle.length < 10 || metaTitle.length > 70) {
    issues.push({
      type: 'warning', code: 'title-tag-length',
      message: 'Title tag length is not optimal',
      recommendation: 'Title should be 50-60 characters',
      impact: 'moderate', category: 'seo',
    });
  }

  // H1 tag
  const h1Tags = $('h1');
  if (h1Tags.length === 0) {
    issues.push({
      type: 'error', code: 'h1-tag',
      message: 'H1 tag is missing',
      recommendation: 'Use exactly one H1 tag per page with primary keyword',
      impact: 'serious', category: 'seo',
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      type: 'warning', code: 'h1-multiple',
      message: `Multiple H1 tags found (${h1Tags.length})`,
      recommendation: 'Use exactly one H1 tag per page',
      impact: 'moderate', category: 'seo',
    });
  }

  // Open Graph tags
  const hasOgTitle = $('meta[property="og:title"]').length > 0;
  const hasOgDesc = $('meta[property="og:description"]').length > 0;
  const hasOgImage = $('meta[property="og:image"]').length > 0;
  if (!hasOgTitle) {
    issues.push({
      type: 'warning', code: 'og-tags',
      message: 'Open Graph tags are missing',
      recommendation: 'Add Open Graph tags for better social sharing',
      impact: 'moderate', category: 'seo',
    });
  }

  // Canonical
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  if (!canonical) {
    issues.push({
      type: 'warning', code: 'canonical-tag',
      message: 'Canonical tag is missing',
      recommendation: 'Add canonical tag to prevent duplicate content issues',
      impact: 'serious', category: 'seo',
    });
  }

  // Structured data (JSON-LD)
  const jsonLdScripts = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html());
      const type = data['@type'] || (Array.isArray(data['@graph']) ? 'Graph' : 'Unknown');
      jsonLdScripts.push(type);
    } catch {
      jsonLdScripts.push('invalid');
    }
  });
  const hasStructuredData = jsonLdScripts.length > 0;
  const structuredDataValid = !jsonLdScripts.includes('invalid');
  if (!hasStructuredData) {
    issues.push({
      type: 'warning', code: 'structured-data',
      message: 'No structured data (JSON-LD) found',
      recommendation: 'Add Schema.org structured data for rich search snippets',
      impact: 'moderate', category: 'seo',
    });
  } else if (!structuredDataValid) {
    issues.push({
      type: 'error', code: 'structured-data-invalid',
      message: 'Invalid JSON-LD structured data detected',
      recommendation: 'Fix JSON syntax in application/ld+json script tags',
      impact: 'serious', category: 'seo',
    });
  }

  // Hreflang
  const hreflangTags = [];
  $('link[rel="alternate"][hreflang]').each((_, el) => {
    hreflangTags.push({
      lang: $(el).attr('hreflang'),
      href: $(el).attr('href'),
    });
  });

  // Robots meta
  const robotsMeta = $('meta[name="robots"]').attr('content') || '';

  // Crawlable links — check for JS-only links
  let jsOnlyLinks = 0;
  $('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href === '#' || href.startsWith('javascript:') || href === '') {
      jsOnlyLinks++;
    }
  });
  if (jsOnlyLinks > 5) {
    issues.push({
      type: 'warning', code: 'crawlable-links',
      message: `${jsOnlyLinks} links are not crawlable (href="#" or javascript:)`,
      recommendation: 'Use real URLs for links so search engines can crawl them',
      impact: 'moderate', category: 'seo',
    });
  }

  // Images without alt (also SEO concern)
  let imagesNoAlt = 0;
  $('img').each((_, el) => {
    if ($(el).attr('alt') === undefined || $(el).attr('alt') === null) {
      imagesNoAlt++;
    }
  });
  if (imagesNoAlt > 0) {
    issues.push({
      type: 'warning', code: 'seo-img-alt',
      message: `${imagesNoAlt} images missing alt attributes (affects SEO image indexing)`,
      recommendation: 'Add descriptive alt text to all images',
      impact: 'moderate', category: 'seo',
    });
  }

  return {
    issues,
    structured_data: {
      has_schema: hasStructuredData,
      schema_types: jsonLdScripts.filter((t) => t !== 'invalid'),
      is_valid: structuredDataValid,
      errors: structuredDataValid ? [] : ['Invalid JSON-LD syntax detected'],
      warnings: [],
    },
    meta: {
      title: metaTitle,
      title_length: metaTitle.length,
      description: metaDesc,
      description_length: metaDesc.length,
      canonical,
      og: { title: hasOgTitle, description: hasOgDesc, image: hasOgImage },
      hreflang: hreflangTags,
      robots: robotsMeta,
    },
  };
};

module.exports = { scanSeo };
