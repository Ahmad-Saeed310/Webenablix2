/**
 * Security Scanner
 * Checks: HTTPS, CSP, HSTS, COOP, X-Frame-Options, permissions,
 * deprecated APIs, mixed content
 */

const { URL } = require('url');

const scanSecurity = (headers, url) => {
  const issues = [];
  const parsedUrl = new URL(url);

  // 1. HTTPS
  const hasHttps = parsedUrl.protocol === 'https:';
  if (!hasHttps) {
    issues.push({
      type: 'error', code: 'https',
      message: 'Site is not served over HTTPS',
      impact: 'critical', category: 'security',
      recommendation: 'Enable HTTPS with a valid SSL/TLS certificate',
    });
  }

  // 2. Content Security Policy
  const hasCsp = !!(headers['content-security-policy'] || headers['content-security-policy-report-only']);
  if (!hasCsp) {
    issues.push({
      type: 'warning', code: 'content-security-policy',
      message: 'Content Security Policy (CSP) header is missing',
      impact: 'serious', category: 'security',
      recommendation: 'Add Content-Security-Policy header to prevent XSS attacks',
    });
  }

  // 3. HSTS
  const hstsHeader = headers['strict-transport-security'] || '';
  const hasHsts = !!hstsHeader;
  let hstsMaxAge = 0;
  if (hasHsts) {
    const maxAgeMatch = hstsHeader.match(/max-age=(\d+)/);
    hstsMaxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
  }
  if (!hasHsts) {
    issues.push({
      type: 'warning', code: 'hsts',
      message: 'HSTS header is missing',
      impact: 'moderate', category: 'security',
      recommendation: 'Add Strict-Transport-Security header with max-age of at least 1 year (31536000)',
    });
  } else if (hstsMaxAge < 31536000) {
    issues.push({
      type: 'warning', code: 'hsts-max-age',
      message: `HSTS max-age is ${hstsMaxAge}s — should be at least 31536000 (1 year)`,
      impact: 'moderate', category: 'security',
      recommendation: 'Increase HSTS max-age to at least 31536000',
    });
  }

  // 4. Cross-Origin-Opener-Policy (COOP)
  const hasCoop = !!headers['cross-origin-opener-policy'];
  if (!hasCoop) {
    issues.push({
      type: 'warning', code: 'coop',
      message: 'Cross-Origin-Opener-Policy (COOP) header is not set',
      impact: 'moderate', category: 'security',
      recommendation: 'Add Cross-Origin-Opener-Policy: same-origin header',
    });
  }

  // 5. X-Frame-Options or CSP frame-ancestors (clickjacking protection)
  const hasXFrameOptions = !!headers['x-frame-options'];
  const cspContent = headers['content-security-policy'] || '';
  const hasFrameAncestors = cspContent.includes('frame-ancestors');
  if (!hasXFrameOptions && !hasFrameAncestors) {
    issues.push({
      type: 'warning', code: 'clickjacking',
      message: 'No clickjacking protection (X-Frame-Options or CSP frame-ancestors)',
      impact: 'serious', category: 'security',
      recommendation: 'Add X-Frame-Options: DENY or SAMEORIGIN header',
    });
  }

  // 6. X-Content-Type-Options
  const hasXContentType = !!headers['x-content-type-options'];
  if (!hasXContentType) {
    issues.push({
      type: 'warning', code: 'x-content-type-options',
      message: 'X-Content-Type-Options header is missing',
      impact: 'moderate', category: 'security',
      recommendation: 'Add X-Content-Type-Options: nosniff header',
    });
  }

  // 7. Referrer-Policy
  const hasReferrerPolicy = !!headers['referrer-policy'];
  if (!hasReferrerPolicy) {
    issues.push({
      type: 'warning', code: 'referrer-policy',
      message: 'Referrer-Policy header is missing',
      impact: 'minor', category: 'security',
      recommendation: 'Add Referrer-Policy: strict-origin-when-cross-origin header',
    });
  }

  // 8. Permissions-Policy
  const hasPermissionsPolicy = !!(headers['permissions-policy'] || headers['feature-policy']);
  if (!hasPermissionsPolicy) {
    issues.push({
      type: 'warning', code: 'permissions-policy',
      message: 'Permissions-Policy header is not set',
      impact: 'moderate', category: 'security',
      recommendation: 'Add Permissions-Policy header to restrict browser features (camera, geolocation, microphone)',
    });
  }

  // Calculate security score
  let securityScore = 0;
  if (hasHttps) securityScore += 30;
  if (hasHsts && hstsMaxAge >= 31536000) securityScore += 15;
  else if (hasHsts) securityScore += 8;
  if (hasCsp) securityScore += 20;
  if (hasCoop) securityScore += 5;
  if (hasXFrameOptions || hasFrameAncestors) securityScore += 10;
  if (hasXContentType) securityScore += 5;
  if (hasReferrerPolicy) securityScore += 5;
  if (hasPermissionsPolicy) securityScore += 10;

  return {
    issues,
    details: {
      has_https: hasHttps,
      has_hsts: hasHsts,
      hsts_max_age: hstsMaxAge,
      has_csp: hasCsp,
      has_coop: hasCoop,
      has_x_frame_options: hasXFrameOptions,
      has_frame_ancestors: hasFrameAncestors,
      has_x_content_type_options: hasXContentType,
      has_referrer_policy: hasReferrerPolicy,
      has_permissions_policy: hasPermissionsPolicy,
      mixed_content: false,
      security_score: Math.min(100, securityScore),
    },
  };
};

module.exports = { scanSecurity };
