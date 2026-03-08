/**
 * /api/preview – Proxy route that fetches a target URL, rewrites it for iframe
 * embedding, and injects an annotation script so the frontend can draw overlays.
 */
const express = require('express');
const axios   = require('axios');
const https   = require('https');
const { URL } = require('url');

const router = express.Router();

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// The script injected at the END of <body>.
// After the page has fully rendered it measures every annotated element and
// posts all bounding rects to the parent frame.
const ANNOTATION_SCRIPT = `
<script>
(function () {
  function collect() {
    var pw = document.documentElement.scrollWidth;
    var ph = document.documentElement.scrollHeight;
    var annotations = [];
    var idx = 0;

    // ── Headings ────────────────────────────────────────────────────────────
    ['h1','h2','h3','h4','h5','h6'].forEach(function(tag) {
      var isH1 = tag === 'h1';
      document.querySelectorAll(tag).forEach(function(el, i) {
        var r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        var text = (el.textContent || '').trim().substring(0, 80);
        // H1 good if exists; warn if multiple h1; h2-h6 always informational
        var count = document.querySelectorAll(tag).length;
        var status = isH1 ? (count > 1 ? 'warn' : 'good') : 'info';
        annotations.push({
          id: idx++, type: tag,
          label: '<' + tag + '>',
          detail: text || '(empty)',
          status: status,
          issue: isH1 && count > 1 ? 'Multiple H1 tags — should be exactly 1 (SEO)' :
                 isH1 && !text     ? 'H1 is empty (SEO + accessibility)' : null,
          top: r.top + window.scrollY, left: r.left + window.scrollX,
          width: r.width, height: r.height
        });
      });
    });

    // ── Images ──────────────────────────────────────────────────────────────
    document.querySelectorAll('img').forEach(function(el, i) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      var hasAlt   = el.hasAttribute('alt');
      var emptyAlt = hasAlt && el.alt === '';
      var status   = !hasAlt ? 'error' : emptyAlt ? 'warn' : 'good';
      annotations.push({
        id: idx++, type: 'img',
        label: '<img>',
        detail: hasAlt ? (emptyAlt ? 'alt="" (empty)' : 'alt="' + el.alt.substring(0,50) + '"') : 'missing alt',
        status: status,
        issue: !hasAlt   ? 'Missing alt attribute — screen readers cannot describe this image (WCAG 1.1.1)' :
               emptyAlt  ? 'Empty alt="" — mark as role="presentation" if decorative, otherwise add description' : null,
        src: el.src ? el.src.substring(0, 120) : '',
        top: r.top + window.scrollY, left: r.left + window.scrollX,
        width: r.width, height: r.height
      });
    });

    // ── Links ────────────────────────────────────────────────────────────────
    document.querySelectorAll('a').forEach(function(el, i) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      var text  = (el.textContent || '').trim();
      var aria  = el.getAttribute('aria-label') || '';
      var hasText = !!(text || aria);
      if (!hasText) {
        annotations.push({
          id: idx++, type: 'a',
          label: '<a>',
          detail: el.href ? el.href.substring(0,60) : '(no href)',
          status: 'error',
          issue: 'Link has no discernible text — screen readers announce it as "link" with no context (WCAG 2.4.4)',
          top: r.top + window.scrollY, left: r.left + window.scrollX,
          width: r.width, height: r.height
        });
      }
    });

    // ── Buttons ──────────────────────────────────────────────────────────────
    document.querySelectorAll('button').forEach(function(el) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      var text = (el.textContent || '').trim();
      var aria = el.getAttribute('aria-label') || '';
      if (!text && !aria) {
        annotations.push({
          id: idx++, type: 'button',
          label: '<button>',
          detail: '(no label)',
          status: 'error',
          issue: 'Button has no accessible label — assistive tech cannot communicate its purpose (WCAG 4.1.2)',
          top: r.top + window.scrollY, left: r.left + window.scrollX,
          width: r.width, height: r.height
        });
      }
    });

    // ── Inputs ───────────────────────────────────────────────────────────────
    var inputSel = 'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset])';
    document.querySelectorAll(inputSel).forEach(function(el) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      var id   = el.id;
      var aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || '';
      var lbl  = id ? document.querySelector('label[for="' + id + '"]') : null;
      if (!aria && !lbl) {
        annotations.push({
          id: idx++, type: 'input',
          label: '<input>',
          detail: 'type="' + (el.type || 'text') + '"' + (id ? ' id="' + id + '"' : ''),
          status: 'error',
          issue: 'Form input has no associated label — users and screen readers cannot identify this field (WCAG 1.3.1)',
          top: r.top + window.scrollY, left: r.left + window.scrollX,
          width: r.width, height: r.height
        });
      }
    });

    window.parent.postMessage({
      type: 'webenablix-annotations',
      annotations: annotations,
      pageWidth: pw,
      pageHeight: ph
    }, '*');
  }

  // Fire after layout is stable
  if (document.readyState === 'complete') {
    setTimeout(collect, 600);
  } else {
    window.addEventListener('load', function() { setTimeout(collect, 600); });
  }
})();
</script>
`;

// GET /api/preview?url=https://example.com
router.get('/', async (req, res) => {
  const rawUrl = req.query.url;
  if (!rawUrl) return res.status(400).send('Missing url parameter');

  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

  try {
    new URL(targetUrl); // validate
  } catch {
    return res.status(400).send('Invalid URL');
  }

  try {
    const upstream = await axios.get(targetUrl, {
      timeout: 20000,
      httpsAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      maxRedirects: 5,
      responseType: 'text',
    });

    let html = upstream.data;

    // 1. Strip meta tags that would block the iframe (CSP, X-Frame-Options)
    html = html.replace(/<meta[^>]+http-equiv=["']?(x-frame-options|content-security-policy)["']?[^>]*>/gi, '');

    // 2. Inject <base> so all relative assets resolve against the target site
    const baseTag = `<base href="${targetUrl}">`;
    if (/<head[\s>]/i.test(html)) {
      html = html.replace(/(<head[^>]*>)/i, `$1${baseTag}`);
    } else {
      html = baseTag + html;
    }

    // 2. Inject annotation script before </body> (or at end)
    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, ANNOTATION_SCRIPT + '</body>');
    } else {
      html += ANNOTATION_SCRIPT;
    }

    // 3. Strip any server-sent X-Frame-Options / CSP that would block the iframe
    res.removeHeader('X-Frame-Options');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    // Intentionally do NOT forward X-Frame-Options from upstream
    return res.send(html);
  } catch (err) {
    console.error('Preview proxy error:', err.message);
    return res.status(502).send(`<html><body style="font-family:sans-serif;padding:2rem;color:#666">
      <h2>Could not load preview</h2>
      <p>${err.message}</p>
      <p>The site may be blocking external requests or require authentication.</p>
    </body></html>`);
  }
});

module.exports = router;
