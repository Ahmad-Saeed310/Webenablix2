import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Lightbulb,
  Play,
  Search,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Zap,
  Key,
  Bell,
  BarChart3,
  Lock,
  RefreshCw,
  Package,
  Puzzle,
  Users,
  HelpCircle,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CodeBlock = ({ code, language = "html" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-4">
      <div className="bg-gray-900 flex items-center justify-between px-4 py-2">
        <span className="text-gray-400 text-xs font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-950 text-green-300 text-xs p-5 overflow-x-auto leading-relaxed font-mono whitespace-pre">
        {code}
      </pre>
    </div>
  );
};

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
};

// ─── Sidebar nav data ─────────────────────────────────────────────────────────

const sidebarSections = [
  {
    title: "Getting Started",
    icon: Play,
    items: ["Introduction", "Quick Start", "Installation", "Core Concepts"],
  },
  {
    title: "Widget",
    icon: Puzzle,
    items: [
      "Overview",
      "Configuration",
      "Customisation",
      "JavaScript API",
      "Events",
    ],
  },
  {
    title: "REST API",
    icon: Code,
    items: ["Authentication", "Endpoints", "Rate Limits", "Errors", "Webhooks"],
  },
  {
    title: "Accessibility Monitor",
    icon: BarChart3,
    items: ["Scanning", "Reports", "Scheduled Scans", "Exports"],
  },
  {
    title: "Integrations",
    icon: Layers,
    items: ["WordPress", "Shopify", "Webflow", "GTM", "GitHub Actions"],
  },
  {
    title: "Compliance",
    icon: Shield,
    items: ["WCAG 2.1", "WCAG 2.2", "Section 508", "EN 301 549", "VPAT"],
  },
  {
    title: "Reference",
    icon: FileText,
    items: ["Error Codes", "WCAG Criteria Map", "Changelog", "SDK"],
  },
];

// ─── Content sections ─────────────────────────────────────────────────────────

const sections = {
  Introduction: {
    title: "Introduction",
    badge: { text: "Getting Started", color: "green" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed text-base">
          Welcome to the <strong>Webenablix documentation</strong>. This
          reference covers everything you need to integrate, configure, and
          manage the full Webenablix platform — from the one-line widget embed
          to full REST API automation.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              color: "bg-blue-500",
              title: "Widget",
              desc: "Add the front-end accessibility layer to any site in minutes.",
              link: "Quick Start",
            },
            {
              icon: Code,
              color: "bg-purple-500",
              title: "REST API",
              desc: "Automate scanning, reporting, and site management via API.",
              link: "Authentication",
            },
            {
              icon: BarChart3,
              color: "bg-green-500",
              title: "Monitor",
              desc: "Schedule scans, view reports, and export compliance data.",
              link: "Scanning",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#2563EB] transition-all group cursor-pointer"
            >
              <div
                className={`w-9 h-9 ${c.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <c.icon className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{c.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 text-sm mb-1">
                New to Webenablix?
              </p>
              <p className="text-blue-700 text-sm">
                Start with the <strong>Quick Start</strong> guide — you'll have
                the widget running on your site in under 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  "Quick Start": {
    title: "Quick Start",
    badge: { text: "Getting Started", color: "green" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Get the Webenablix accessibility widget live on your site in three
          steps.
        </p>
        <div className="space-y-8">
          {[
            {
              num: "1",
              title: "Get your API key",
              desc: "Sign up at app.webenablix.com → Settings → Sites → Copy Site Key.",
              code: null,
            },
            {
              num: "2",
              title: "Add the script to your site",
              desc: "Paste this snippet just before the closing </body> tag of every page, or in your global layout template.",
              code: `<!-- Webenablix Accessibility Widget -->
<script>
  (function(w,d,s,l){
    w._webenablix=l;
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
    j.async=true;
    j.src='https://cdn.webenablix.com/widget.js?key='+l;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','YOUR_API_KEY');
</script>`,
              lang: "html",
            },
            {
              num: "3",
              title: "Verify",
              desc: "Reload your site. The accessibility icon appears in the bottom-right corner. Click it to confirm the widget opens.",
              code: null,
            },
          ].map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="w-8 h-8 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
                {step.code && (
                  <CodeBlock code={step.code} language={step.lang} />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 text-sm">
            That's it! For platform-specific guides see{" "}
            <strong>Installation → </strong> your platform.
          </p>
        </div>
      </div>
    ),
  },

  Configuration: {
    title: "Widget Configuration",
    badge: { text: "Widget", color: "blue" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Pass a{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
            window._webenablixConfig
          </code>{" "}
          object <em>before</em> the widget script to customise behaviour
          programmatically.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Place this BEFORE the Webenablix script tag
window._webenablixConfig = {
  // Widget position: 'bottom-right' (default) | 'bottom-left' | 'top-right' | 'top-left'
  position: 'bottom-right',

  // Language: 'auto' detects browser language, or pass ISO 639-1 code e.g. 'fr', 'de'
  language: 'auto',

  // Accent colour (hex). Defaults to brand blue
  color: '#2563EB',

  // Hide widget button until manually triggered via JS API
  hideButton: false,

  // Disable specific adjustments (array of feature IDs — see Feature Reference)
  disabledAdjustments: [],

  // Lead data pre-fill (for analytics)
  metadata: {
    userId: 'USER_ID',   // optional
    plan: 'professional',
  },
};`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Option
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Type
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Default
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [
                  "position",
                  "string",
                  '"bottom-right"',
                  "Widget button position on screen",
                ],
                [
                  "language",
                  "string",
                  '"auto"',
                  'Interface language (ISO 639-1 or "auto")',
                ],
                ["color", "string", '"#2563EB"', "Primary accent colour (hex)"],
                [
                  "hideButton",
                  "boolean",
                  "false",
                  "Hide the floating button on load",
                ],
                [
                  "disabledAdjustments",
                  "string[]",
                  "[]",
                  "Array of feature IDs to disable",
                ],
                [
                  "metadata",
                  "object",
                  "{}",
                  "Custom key/value pairs for analytics",
                ],
              ].map(([opt, type, def, desc]) => (
                <tr key={opt} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#2563EB]">
                    {opt}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {type}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {def}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  "JavaScript API": {
    title: "JavaScript API",
    badge: { text: "Widget", color: "blue" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          The widget exposes a global{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
            window.Webenablix
          </code>{" "}
          object after initialisation.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Open the widget panel
window.Webenablix.open();

// Close the widget panel
window.Webenablix.close();

// Toggle open/closed
window.Webenablix.toggle();

// Reset all user adjustments to defaults
window.Webenablix.reset();

// Enable a specific adjustment programmatically
window.Webenablix.enable('high-contrast');

// Disable a specific adjustment
window.Webenablix.disable('dyslexia-font');

// Get the current state of all adjustments
const state = window.Webenablix.getState();
// => { 'high-contrast': true, 'dyslexia-font': false, ... }

// Re-initialise after a route change (SPA)
window.Webenablix.reinit();`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Method
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Returns
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["open()", "void", "Opens the widget accessibility panel"],
                ["close()", "void", "Closes the widget panel"],
                ["toggle()", "void", "Toggles open/closed state"],
                ["reset()", "void", "Resets all adjustments to default values"],
                ["enable(featureId)", "void", "Enables a named adjustment"],
                ["disable(featureId)", "void", "Disables a named adjustment"],
                [
                  "getState()",
                  "object",
                  "Returns an object of all current adjustments",
                ],
                [
                  "reinit()",
                  "void",
                  "Re-runs widget initialisation (use after SPA route change)",
                ],
              ].map(([method, ret, desc]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#2563EB]">
                    {method}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {ret}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  Authentication: {
    title: "REST API Authentication",
    badge: { text: "REST API", color: "purple" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          All REST API requests are authenticated using a{" "}
          <strong>Bearer token</strong>. Generate API tokens in your Webenablix
          dashboard under <strong>Settings → API Tokens</strong>.
        </p>
        <CodeBlock
          language="http"
          code={`GET /v1/sites HTTP/1.1
Host: api.webenablix.com
Authorization: Bearer wbenx_live_YOUR_TOKEN_HERE
Content-Type: application/json`}
        />
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 text-sm mb-1">
              Keep tokens secret
            </p>
            <p className="text-yellow-800 text-sm">
              Never expose API tokens in client-side code or public
              repositories. Use environment variables on the server side.
            </p>
          </div>
        </div>
        <h3 className="font-bold text-gray-900">Token prefixes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Prefix
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Environment
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Scope
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [
                  "wbenx_live_…",
                  "Production",
                  "Full access — modifies live data",
                ],
                [
                  "wbenx_test_…",
                  "Sandbox",
                  "Read-only test environment — no live changes",
                ],
              ].map(([prefix, env, scope]) => (
                <tr key={prefix} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#2563EB]">
                    {prefix}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">{env}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  Endpoints: {
    title: "API Endpoints",
    badge: { text: "REST API", color: "purple" },
    content: (
      <div className="space-y-8">
        <p className="text-gray-700 leading-relaxed">
          Base URL:{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">
            https://api.webenablix.com/v1
          </code>
        </p>

        {[
          {
            group: "Sites",
            endpoints: [
              {
                method: "GET",
                path: "/sites",
                desc: "List all sites in your account",
              },
              { method: "POST", path: "/sites", desc: "Create a new site" },
              {
                method: "GET",
                path: "/sites/:id",
                desc: "Retrieve a single site",
              },
              {
                method: "PATCH",
                path: "/sites/:id",
                desc: "Update site settings",
              },
              { method: "DELETE", path: "/sites/:id", desc: "Delete a site" },
            ],
          },
          {
            group: "Scans",
            endpoints: [
              {
                method: "POST",
                path: "/sites/:id/scans",
                desc: "Trigger a new scan",
              },
              {
                method: "GET",
                path: "/sites/:id/scans",
                desc: "List scans for a site",
              },
              {
                method: "GET",
                path: "/scans/:scanId",
                desc: "Get scan details and issues",
              },
              {
                method: "GET",
                path: "/scans/:scanId/export",
                desc: "Export scan report (PDF/CSV/JSON)",
              },
            ],
          },
          {
            group: "Issues",
            endpoints: [
              {
                method: "GET",
                path: "/scans/:scanId/issues",
                desc: "List all issues in a scan",
              },
              {
                method: "GET",
                path: "/issues/:issueId",
                desc: "Get a single issue with AI analysis",
              },
              {
                method: "PATCH",
                path: "/issues/:issueId",
                desc: "Update issue status (open/fixed/ignored)",
              },
            ],
          },
        ].map(({ group, endpoints }) => (
          <div key={group}>
            <h3 className="font-bold text-gray-900 mb-3">{group}</h3>
            <div className="space-y-2">
              {endpoints.map((ep) => {
                const colors = {
                  GET: "bg-green-100 text-green-700",
                  POST: "bg-blue-100 text-blue-700",
                  PATCH: "bg-yellow-100 text-yellow-700",
                  DELETE: "bg-red-100 text-red-700",
                };
                return (
                  <div
                    key={ep.path}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                  >
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${colors[ep.method]} w-14 text-center flex-shrink-0`}
                    >
                      {ep.method}
                    </span>
                    <code className="text-xs font-mono text-gray-800 flex-1">
                      {ep.path}
                    </code>
                    <span className="text-xs text-gray-500 hidden md:block">
                      {ep.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <h3 className="font-bold text-gray-900">Example: trigger a scan</h3>
        <CodeBlock
          language="bash"
          code={`curl -X POST https://api.webenablix.com/v1/sites/site_abc123/scans \\
  -H "Authorization: Bearer wbenx_live_YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "depth": "full",
    "standard": "wcag21aa",
    "notifyEmail": "you@example.com"
  }'

# Response
{
  "scanId": "scan_xyz789",
  "status": "queued",
  "estimatedSeconds": 120,
  "createdAt": "2026-03-11T09:14:00Z"
}`}
        />
      </div>
    ),
  },

  Webhooks: {
    title: "Webhooks",
    badge: { text: "REST API", color: "purple" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Webenablix can send HTTP POST payloads to a URL you configure whenever
          key events happen — scan completed, compliance score dropped, or a new
          critical issue is found.
        </p>
        <h3 className="font-bold text-gray-900">Register a webhook</h3>
        <CodeBlock
          language="bash"
          code={`curl -X POST https://api.webenablix.com/v1/webhooks \\
  -H "Authorization: Bearer wbenx_live_YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yoursite.com/hooks/webenablix",
    "events": ["scan.completed", "score.dropped", "issue.critical"],
    "secret": "your_signing_secret"
  }'`}
        />
        <h3 className="font-bold text-gray-900">Verify webhook signatures</h3>
        <p className="text-gray-600 text-sm">
          Each webhook request includes a{" "}
          <code className="bg-gray-100 px-1 rounded font-mono">
            X-Webenablix-Signature-256
          </code>{" "}
          header. Verify it to ensure the payload came from Webenablix.
        </p>
        <CodeBlock
          language="javascript"
          code={`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}

// Express.js example
app.post('/hooks/webenablix', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['x-webenablix-signature-256'];
  if (!verifyWebhook(req.body, sig, process.env.WEBHOOK_SECRET)) {
    return res.status(403).send('Forbidden');
  }
  const event = JSON.parse(req.body);
  console.log('Event:', event.type, event.data);
  res.status(200).send('OK');
});`}
        />
        <h3 className="font-bold text-gray-900">Event types</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              event: "scan.completed",
              desc: "A scheduled or manual scan finished",
            },
            { event: "scan.failed", desc: "A scan could not be completed" },
            {
              event: "score.dropped",
              desc: "Compliance score fell below your threshold",
            },
            {
              event: "issue.critical",
              desc: "A new critical-severity issue was found",
            },
            {
              event: "site.created",
              desc: "A new site was added to your account",
            },
            {
              event: "report.ready",
              desc: "A scheduled PDF/CSV report is ready to download",
            },
          ].map(({ event, desc }) => (
            <div
              key={event}
              className="flex items-start gap-2 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
            >
              <code className="text-xs font-mono text-[#2563EB] flex-shrink-0">
                {event}
              </code>
              <span className="text-xs text-gray-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  Scanning: {
    title: "Accessibility Monitor — Scanning",
    badge: { text: "Monitor", color: "orange" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          The Accessibility Monitor crawls your entire site and tests every page
          against WCAG 2.1 AA (and optionally WCAG 2.2) success criteria.
        </p>
        <h3 className="font-bold text-gray-900">Scan modes</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Manual",
              desc: "Trigger on demand from the dashboard or API.",
              badge: "green",
            },
            {
              title: "Scheduled",
              desc: "Run daily, weekly, or monthly on a cron.",
              badge: "blue",
            },
            {
              title: "CI/CD",
              desc: "Block deploys via GitHub Actions or GitLab CI.",
              badge: "purple",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <Badge color={s.badge}>{s.title}</Badge>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-gray-900">Trigger a scan via API</h3>
        <CodeBlock
          language="bash"
          code={`curl -X POST https://api.webenablix.com/v1/sites/SITE_ID/scans \\
  -H "Authorization: Bearer wbenx_live_TOKEN" \\
  -d '{ "depth": "full", "standard": "wcag21aa" }'`}
        />
        <h3 className="font-bold text-gray-900">GitHub Actions integration</h3>
        <CodeBlock
          language="yaml"
          code={`# .github/workflows/accessibility.yml
name: Accessibility Check

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Webenablix scan
        uses: webenablix/scan-action@v2
        with:
          api-token: \${{ secrets.WEBENABLIX_TOKEN }}
          site-id:   \${{ secrets.WEBENABLIX_SITE_ID }}
          fail-on:   critical    # fail build if critical issues found`}
        />
        <h3 className="font-bold text-gray-900">Issue severity levels</h3>
        <div className="space-y-2">
          {[
            {
              sev: "Critical",
              color: "bg-red-500",
              desc: "Makes content completely inaccessible. Fix before go-live.",
            },
            {
              sev: "Serious",
              color: "bg-orange-500",
              desc: "Significant impact. Prioritise in next sprint.",
            },
            {
              sev: "Moderate",
              color: "bg-yellow-500",
              desc: "Notable barrier for some users. Plan to address.",
            },
            {
              sev: "Minor",
              color: "bg-blue-400",
              desc: "Low impact. Address as part of regular maintenance.",
            },
          ].map((s) => (
            <div
              key={s.sev}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <span
                className={`w-3 h-3 rounded-full ${s.color} flex-shrink-0 mt-1`}
              />
              <div>
                <span className="font-semibold text-gray-900 text-sm">
                  {s.sev} —{" "}
                </span>
                <span className="text-gray-600 text-sm">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  "GitHub Actions": {
    title: "GitHub Actions Integration",
    badge: { text: "Integrations", color: "gray" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          The official{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
            webenablix/scan-action
          </code>{" "}
          blocks your CI pipeline when accessibility regressions are introduced.
        </p>
        <CodeBlock
          language="yaml"
          code={`# .github/workflows/accessibility.yml
name: Accessibility Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Webenablix Accessibility Scan
        uses: webenablix/scan-action@v2
        with:
          api-token:     \${{ secrets.WEBENABLIX_TOKEN }}
          site-id:       \${{ secrets.WEBENABLIX_SITE_ID }}
          # 'critical' | 'serious' | 'moderate' | 'minor' | 'none'
          fail-on:       serious
          output-format: sarif     # Upload to GitHub Security tab
          report-path:   a11y-report.sarif

      - name: Upload SARIF report
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: a11y-report.sarif`}
        />
        <h3 className="font-bold text-gray-900">Action inputs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Input
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Required
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [
                  "api-token",
                  "Yes",
                  "Your Webenablix API token (store as a secret)",
                ],
                [
                  "site-id",
                  "Yes",
                  "The site ID to scan (found in dashboard → Settings)",
                ],
                [
                  "fail-on",
                  "No",
                  "Minimum severity level to fail the build (default: critical)",
                ],
                [
                  "output-format",
                  "No",
                  '"sarif" | "json" | "none" (default: none)',
                ],
                ["report-path", "No", "File path to write the report output"],
              ].map(([input, req, desc]) => (
                <tr key={input} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#2563EB]">
                    {input}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <Badge color={req === "Yes" ? "red" : "gray"}>{req}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  "WCAG 2.1": {
    title: "WCAG 2.1 Coverage",
    badge: { text: "Compliance", color: "green" },
    content: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Webenablix tests against all 50 Level A and AA success criteria in
          WCAG 2.1. The table below shows coverage by principle.
        </p>
        {[
          { principle: "Perceivable (1.x)", total: 13, auto: 11, manual: 2 },
          { principle: "Operable (2.x)", total: 17, auto: 14, manual: 3 },
          { principle: "Understandable (3.x)", total: 13, auto: 10, manual: 3 },
          { principle: "Robust (4.x)", total: 7, auto: 7, manual: 0 },
        ].map((p) => (
          <div
            key={p.principle}
            className="bg-gray-50 rounded-xl p-5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-900 text-sm">{p.principle}</p>
              <div className="flex gap-3 text-xs text-gray-500">
                <span>
                  <Badge color="green">Auto {p.auto}</Badge>
                </span>
                <span>
                  <Badge color="orange">Manual {p.manual}</Badge>
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full"
                style={{ width: `${(p.auto / p.total) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">
              {p.auto} of {p.total} criteria covered by automated scanning
            </p>
          </div>
        ))}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-sm">
            Manual-only criteria (such as focus order logic and cognitive load)
            are flagged as "needs review" in scan reports, with guidance for
            your QA team.
          </p>
        </div>
      </div>
    ),
  },

  Changelog: {
    title: "Changelog",
    badge: { text: "Reference", color: "gray" },
    content: (
      <div className="space-y-8">
        {[
          {
            version: "v3.4.0",
            date: "March 11, 2026",
            tag: "Latest",
            changes: [
              {
                type: "new",
                text: "WCAG 2.2 criterion 2.5.7 (Dragging Movements) now flagged in scans",
              },
              {
                type: "new",
                text: "Webhook support for score.dropped and issue.critical events",
              },
              {
                type: "new",
                text: "GitHub Actions scan-action v2 — SARIF output for GitHub Security tab",
              },
              {
                type: "fix",
                text: "Fixed widget button z-index conflict with Intercom launcher",
              },
              {
                type: "fix",
                text: "Corrected colour-contrast ratio calculation for APCA algorithm",
              },
            ],
          },
          {
            version: "v3.3.0",
            date: "February 18, 2026",
            tag: null,
            changes: [
              {
                type: "new",
                text: "Authenticated scanning — scan pages behind login",
              },
              {
                type: "new",
                text: "BigCommerce native Script Manager integration",
              },
              {
                type: "change",
                text: "API rate limit increased from 100 to 500 requests/minute on Pro plans",
              },
              {
                type: "fix",
                text: "Fixed false positives on SVG title elements",
              },
            ],
          },
          {
            version: "v3.2.0",
            date: "January 7, 2026",
            tag: null,
            changes: [
              {
                type: "new",
                text: "AI-generated fix suggestions added to every scan issue",
              },
              {
                type: "new",
                text: "Scheduled scans dashboard with history graph",
              },
              {
                type: "change",
                text: "Widget initialisation time reduced by 40ms",
              },
            ],
          },
        ].map((release) => (
          <div key={release.version}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-bold text-gray-900 text-lg">
                {release.version}
              </h3>
              {release.tag && <Badge color="blue">{release.tag}</Badge>}
              <span className="text-gray-400 text-sm">{release.date}</span>
            </div>
            <div className="space-y-2 pl-4 border-l-2 border-gray-100">
              {release.changes.map((c, i) => {
                const styles = {
                  new: "bg-green-100 text-green-700",
                  fix: "bg-blue-100 text-blue-700",
                  change: "bg-yellow-100 text-yellow-700",
                };
                return (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5 ${styles[c.type]}`}
                    >
                      {c.type.toUpperCase()}
                    </span>
                    <span className="text-gray-700">{c.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

// ─── Default content for sections without dedicated content ───────────────────

const DefaultSection = ({ title, badge }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
      <BookOpen className="w-10 h-10 text-blue-400 mx-auto mb-3" />
      <p className="font-semibold text-blue-900 mb-1">{title}</p>
      <p className="text-blue-700 text-sm">
        This section is being expanded. Detailed documentation is available in
        the full developer portal.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-1.5 mt-4 text-[#2563EB] text-sm font-medium hover:underline"
      >
        Open developer portal <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
);

// ─── Main Documentation Page ──────────────────────────────────────────────────

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [openSections, setOpenSections] = useState({
    "Getting Started": true,
    Widget: false,
    "REST API": false,
    "Accessibility Monitor": false,
    Integrations: false,
    Compliance: false,
    Reference: false,
  });
  const [search, setSearch] = useState("");

  const toggleSection = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const allItems = sidebarSections.flatMap((s) => s.items);
  const filteredItems = search
    ? allItems.filter((i) => i.toLowerCase().includes(search.toLowerCase()))
    : null;

  const currentContent = sections[activeSection];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#2563EB] py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-5">
            <BookOpen className="w-4 h-4" />
            Developer Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Webenablix Docs
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Everything you need to integrate, configure, and automate Webenablix
            across your digital properties.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documentation…"
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-gray-800 text-sm shadow-lg border-0 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Search results dropdown */}
          {filteredItems && filteredItems.length > 0 && (
            <div className="relative max-w-lg mx-auto mt-2">
              <div className="absolute w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 text-left overflow-hidden">
                {filteredItems.slice(0, 8).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item);
                      setSearch("");
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] flex items-center gap-2 border-b border-gray-50 last:border-0"
                  >
                    <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "Quick Start",
              "JavaScript API",
              "Endpoints",
              "Webhooks",
              "GitHub Actions",
              "Changelog",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-full transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Layout: Sidebar + Content ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-10">
          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
            <nav className="space-y-1">
              {sidebarSections.map((section) => {
                const SectionIcon = section.icon;
                const isOpen = openSections[section.title];
                return (
                  <div key={section.title}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SectionIcon className="w-4 h-4 text-gray-400" />
                        {section.title}
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="ml-6 mt-1 space-y-0.5">
                        {section.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              activeSection === item
                                ? "bg-[#2563EB] text-white font-medium"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Help card */}
            <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <HelpCircle className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-blue-900 font-semibold text-sm mb-1">
                Need help?
              </p>
              <p className="text-blue-700 text-xs mb-3">
                Our support team is available 24/7.
              </p>
              <a
                href="#"
                className="text-xs text-[#2563EB] font-medium hover:underline flex items-center gap-1"
              >
                Contact support <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* ── Mobile section picker ──────────────────────────────────────── */}
          <div className="lg:hidden w-full mb-6">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white"
            >
              {sidebarSections.map((s) => (
                <optgroup key={s.title} label={s.title}>
                  {s.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* ── Content pane ──────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
              <span>Docs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600 font-medium">{activeSection}</span>
            </div>

            {/* Title + badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {currentContent?.title ?? activeSection}
              </h1>
              {currentContent?.badge && (
                <Badge color={currentContent.badge.color}>
                  {currentContent.badge.text}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="prose-sm max-w-none">
              {currentContent ? (
                currentContent.content
              ) : (
                <DefaultSection title={activeSection} />
              )}
            </div>

            {/* Next / Prev navigation */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center gap-4">
              {(() => {
                const idx = allItems.indexOf(activeSection);
                const prev = allItems[idx - 1];
                const next = allItems[idx + 1];
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => setActiveSection(prev)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2563EB] transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" /> {prev}
                      </button>
                    ) : (
                      <div />
                    )}
                    {next && (
                      <button
                        onClick={() => setActiveSection(next)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2563EB] transition-colors ml-auto"
                      >
                        {next} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </main>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a8a] to-[#2563EB]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Terminal className="w-12 h-12 text-white/40 mx-auto mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to build with Webenablix?
          </h2>
          <p className="text-white/75 mb-8">
            Get your API key and start making the web more accessible today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-3 h-auto font-semibold shadow-lg">
              Get API Key <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3 h-auto font-semibold"
            >
              View on GitHub <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocsPage;
