/**
 * Network & Caching Scanner
 * Checks: cache-control, compression, CDN detection, HTTP/2,
 * ETag/Last-Modified, preconnect hints
 */

const scanNetwork = ($, headers, url) => {
  const issues = [];

  // 1. Cache-Control header (for the HTML document)
  const cacheControl = headers['cache-control'] || '';
  if (!cacheControl) {
    issues.push({
      type: 'warning', code: 'no-cache-control',
      message: 'Cache-Control header is missing on the HTML document',
      impact: 'moderate', category: 'network',
      recommendation: 'Add Cache-Control header to control browser caching behavior',
    });
  }

  // 2. Compression (content-encoding)
  const encoding = headers['content-encoding'] || '';
  const hasCompression = ['gzip', 'br', 'deflate', 'zstd'].includes(encoding);
  if (!hasCompression) {
    issues.push({
      type: 'warning', code: 'no-compression',
      message: 'HTML response is not compressed (no gzip/brotli)',
      impact: 'serious', category: 'network',
      recommendation: 'Enable gzip or Brotli compression on the server for text resources',
    });
  }

  // 3. CDN detection via response headers
  const cdnHeaders = {
    'cf-ray': 'Cloudflare',
    'x-vercel-id': 'Vercel',
    'x-netlify-id': 'Netlify',
    'x-amz-cf-id': 'AWS CloudFront',
    'x-cache': 'CDN',
    'x-cdn': 'CDN',
    'x-served-by': 'CDN/Varnish',
    'x-fastly-request-id': 'Fastly',
    'x-azure-ref': 'Azure CDN',
    'server': null,
  };
  let cdnDetected = false;
  let cdnName = null;
  for (const [header, name] of Object.entries(cdnHeaders)) {
    if (headers[header]) {
      if (header === 'server') {
        const server = headers[header].toLowerCase();
        if (server.includes('cloudflare') || server.includes('cloudfront') ||
            server.includes('akamai') || server.includes('fastly')) {
          cdnDetected = true;
          cdnName = headers[header];
        }
      } else {
        cdnDetected = true;
        cdnName = name;
        break;
      }
    }
  }
  if (!cdnDetected) {
    issues.push({
      type: 'warning', code: 'no-cdn',
      message: 'No CDN detected — resources may be served from origin only',
      impact: 'moderate', category: 'network',
      recommendation: 'Use a CDN (Cloudflare, CloudFront, Vercel, Netlify) for faster global delivery',
    });
  }

  // 4. HTTP/2 — detect from alt-svc or server headers
  const altSvc = headers['alt-svc'] || '';
  const hasHttp2Hint = altSvc.includes('h2') || altSvc.includes('h3');

  // 5. ETag / Last-Modified for conditional requests
  const hasEtag = !!headers['etag'];
  const hasLastModified = !!headers['last-modified'];

  // 6. Preconnect hints in HTML
  const preconnects = [];
  $('link[rel="preconnect"]').each((_, el) => {
    preconnects.push($(el).attr('href') || '');
  });

  // 7. DNS prefetch hints
  const dnsPrefetch = [];
  $('link[rel="dns-prefetch"]').each((_, el) => {
    dnsPrefetch.push($(el).attr('href') || '');
  });

  // 8. Check for preload hints
  const preloads = [];
  $('link[rel="preload"]').each((_, el) => {
    preloads.push({
      href: $(el).attr('href') || '',
      as: $(el).attr('as') || '',
    });
  });

  // 9. Detect third-party origins that might need preconnect
  const thirdPartyOrigins = new Set();
  $('script[src], link[href], img[src]').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('href') || '';
    try {
      const parsed = new URL(src, url);
      const pageOrigin = new URL(url).origin;
      if (parsed.origin !== pageOrigin && parsed.origin !== 'null') {
        thirdPartyOrigins.add(parsed.origin);
      }
    } catch (e) { /* skip invalid URLs */ }
  });

  const connectedOrigins = new Set([...preconnects, ...dnsPrefetch]);
  const unconnectedOrigins = [...thirdPartyOrigins].filter((o) => !connectedOrigins.has(o));
  if (unconnectedOrigins.length > 2) {
    issues.push({
      type: 'warning', code: 'preconnect-missing',
      message: `${unconnectedOrigins.length} third-party origins without preconnect hints`,
      impact: 'moderate', category: 'network',
      recommendation: 'Add <link rel="preconnect"> for critical third-party origins',
      elements: unconnectedOrigins.slice(0, 5),
    });
  }

  return {
    issues,
    details: {
      cache_control: cacheControl || null,
      compression: encoding || 'none',
      cdn_detected: cdnDetected,
      cdn_name: cdnName,
      http2_hint: hasHttp2Hint,
      etag: hasEtag,
      last_modified: hasLastModified,
      preconnects,
      dns_prefetch: dnsPrefetch,
      preloads,
      third_party_origins: [...thirdPartyOrigins].slice(0, 10),
      unconnected_origins: unconnectedOrigins.slice(0, 5),
    },
  };
};

module.exports = { scanNetwork };
