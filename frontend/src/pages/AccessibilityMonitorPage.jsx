import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BellRing,
  Check,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Activity,
  Calendar,
  ExternalLink,
  Layers,
  Lock,
  Radio,
  ScanLine,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Mock Dashboard Preview ──────────────────────────────────────────────────

const severityColors = {
  critical: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  serious: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  moderate: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  minor: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
};

const mockIssues = [
  {
    id: 1,
    type: "Missing alt text",
    page: "/about",
    severity: "critical",
    wcag: "1.1.1",
    status: "open",
  },
  {
    id: 2,
    type: "Low colour contrast",
    page: "/products",
    severity: "serious",
    wcag: "1.4.3",
    status: "open",
  },
  {
    id: 3,
    type: "Missing form label",
    page: "/contact",
    severity: "serious",
    wcag: "1.3.1",
    status: "fixed",
  },
  {
    id: 4,
    type: "Keyboard trap",
    page: "/checkout",
    severity: "critical",
    wcag: "2.1.2",
    status: "open",
  },
  {
    id: 5,
    type: "Empty button label",
    page: "/blog",
    severity: "moderate",
    wcag: "4.1.2",
    status: "open",
  },
];

const ScoreRing = ({ score }) => {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold text-gray-900">{score}</div>
        <div className="text-xs text-gray-500">/ 100</div>
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState("issues");

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 text-sm w-full max-w-lg">
      {/* Top bar */}
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-gray-400 text-xs ml-3 font-mono">
          monitor.webenablix.com
        </span>
      </div>

      {/* Scores row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 px-4 py-4">
        <div className="flex flex-col items-center gap-1 pr-4">
          <ScoreRing score={74} />
          <span className="text-gray-500 text-xs mt-1">Overall Score</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-xs text-gray-500">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">8</div>
            <div className="text-xs text-gray-500">Serious</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 pl-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">15</div>
            <div className="text-xs text-gray-500">Moderate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">21</div>
            <div className="text-xs text-gray-500">Minor</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {["issues", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "issues" ? "Live Issues" : "Scan History"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "issues" ? (
        <div className="divide-y divide-gray-50">
          {mockIssues.map((issue) => {
            const s = severityColors[issue.severity];
            return (
              <div
                key={issue.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {issue.severity}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium truncate">
                    {issue.type}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {issue.page} · WCAG {issue.wcag}
                  </p>
                </div>
                {issue.status === "fixed" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {[
            { date: "Today 09:14", score: 74, issues: 56, trend: "down" },
            { date: "Yesterday", score: 71, issues: 62, trend: "down" },
            { date: "Mar 9", score: 68, issues: 70, trend: "up" },
            { date: "Mar 8", score: 65, issues: 78, trend: "up" },
          ].map((scan, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <ScanLine className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium text-xs">{scan.date}</p>
                <p className="text-gray-400 text-xs">
                  {scan.issues} issues found
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700">{scan.score}</span>
                {scan.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer bar */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-100">
        <span className="text-gray-400 text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" /> Last scan: 2 min ago
        </span>
        <button className="flex items-center gap-1 text-[#2563EB] text-xs font-medium hover:underline">
          <Download className="w-3 h-3" /> Export PDF
        </button>
      </div>
    </div>
  );
};

// ─── Feature Card ─────────────────────────────────────────────────────────────

const FeatureCard = ({ icon: Icon, iconBg, title, description }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all group">
    <div
      className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// ─── How It Works Step ────────────────────────────────────────────────────────

const Step = ({ number, title, description, icon: Icon }) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div className="pt-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-[#2563EB]" />
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

// ─── Export Format Card ───────────────────────────────────────────────────────

const ExportCard = ({ format, description, icon: Icon, color }) => (
  <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all">
    <div
      className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-bold text-gray-900">{format}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const AccessibilityMonitorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#1e3a8a] via-[#2563EB] to-[#3B82F6] py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Monitoring
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Accessibility
                  <br />
                  <span className="text-blue-200">Monitor</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Continuously scan, analyze, and export accessibility issues
                  across your entire website — powered by AI that explains every
                  violation and suggests a fix.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate('/register')} className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-4 h-auto font-semibold shadow-lg">
                    Start Monitoring Free
                  </Button>
                  <Button
                    onClick={() => navigate('/products/checker')}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold"
                  >
                    View Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 mt-10 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> No credit card
                    required
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> WCAG 2.1 &amp;
                    2.2
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> Unlimited scans
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-14 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "350K+", label: "Websites monitored", icon: Globe },
                { value: "99.9%", label: "Uptime SLA", icon: Activity },
                { value: "2 min", label: "Average scan time", icon: Zap },
                {
                  value: "4,600+",
                  label: "ADA lawsuits filed / yr",
                  icon: ShieldAlert,
                },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="w-8 h-8 text-[#2563EB]" />
                  <div className="text-3xl font-bold text-gray-900">
                    {value}
                  </div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                What you get
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-4">
                Everything you need to{" "}
                <span className="text-[#2563EB]">stay compliant</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The Accessibility Monitor gives your team a complete picture of
                every issue on your site — from discovery to export — without
                writing a single line of code.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ScanLine,
                  iconBg: "bg-blue-500",
                  title: "Continuous Scanning",
                  description:
                    "Schedule daily, weekly, or real-time scans across every page of your website. Never miss a newly introduced violation again.",
                },
                {
                  icon: Sparkles,
                  iconBg: "bg-purple-500",
                  title: "AI-Powered Analysis",
                  description:
                    "Our AI engine explains each violation in plain language, maps it to the relevant WCAG criterion, and suggests actionable developer fixes.",
                },
                {
                  icon: Download,
                  iconBg: "bg-green-500",
                  title: "One-Click Exports",
                  description:
                    "Export full compliance reports as PDF, CSV, or JSON. Share them with stakeholders, legal teams, or auditors in seconds.",
                },
                {
                  icon: BellRing,
                  iconBg: "bg-orange-500",
                  title: "Smart Alerts",
                  description:
                    "Receive instant Slack, email, or webhook notifications when critical issues are introduced or your score drops below a set threshold.",
                },
                {
                  icon: BarChart3,
                  iconBg: "bg-pink-500",
                  title: "Trend & History",
                  description:
                    "Track your accessibility score over time. Visualise progress, spot regressions, and demonstrate compliance improvement to stakeholders.",
                },
                {
                  icon: Lock,
                  iconBg: "bg-indigo-500",
                  title: "Authenticated Scanning",
                  description:
                    "Scan pages behind login walls. Our secure credential vault lets the Monitor access member-only content without exposing passwords.",
                },
              ].map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                Up and running in{" "}
                <span className="text-[#2563EB]">minutes</span>
              </h2>
            </div>

            <div className="space-y-10">
              <Step
                number="1"
                icon={Globe}
                title="Connect your website"
                description="Enter your domain — or connect via our WordPress plugin, Shopify app, or REST API. We'll automatically discover and map every page on your site."
              />
              <Step
                number="2"
                icon={ScanLine}
                title="Run your first scan"
                description="Within minutes our crawler tests every page against all WCAG 2.1 AA success criteria, flagging violations by severity: critical, serious, moderate, and minor."
              />
              <Step
                number="3"
                icon={Sparkles}
                title="Review AI-generated insights"
                description="Each violation comes with a natural-language explanation, the offending code snippet, the relevant WCAG guideline, and a suggested fix — all generated by AI."
              />
              <Step
                number="4"
                icon={Download}
                title="Export &amp; share"
                description="Generate a branded compliance report in PDF, CSV, or JSON. Set a schedule so fresh reports land in your inbox automatically."
              />
              <Step
                number="5"
                icon={BellRing}
                title="Monitor continuously"
                description="Enable automated scanning so new violations are caught the moment they go live. Close the feedback loop between your dev team and your compliance score."
              />
            </div>
          </div>
        </section>

        {/* ── Export Formats ────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                  Export & Reporting
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                  Every format your team needs
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you're presenting to a board, filing a legal response,
                  or feeding issues into your CI pipeline, the Accessibility
                  Monitor has an export format ready for you.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ExportCard
                    format="PDF Report"
                    description="Branded, shareable compliance snapshot"
                    icon={FileText}
                    color="bg-red-500"
                  />
                  <ExportCard
                    format="CSV Export"
                    description="Raw data for spreadsheets &amp; dashboards"
                    icon={Layers}
                    color="bg-green-500"
                  />
                  <ExportCard
                    format="JSON / API"
                    description="Machine-readable for CI/CD pipelines"
                    icon={Zap}
                    color="bg-indigo-500"
                  />
                  <ExportCard
                    format="Scheduled Email"
                    description="Auto-deliver reports to any inbox"
                    icon={Bell}
                    color="bg-orange-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Sample Report Summary
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Website scanned",
                      value: "example.com",
                      icon: Globe,
                    },
                    {
                      label: "Pages crawled",
                      value: "142 pages",
                      icon: Search,
                    },
                    {
                      label: "Scan completed",
                      value: "Mar 11, 2026",
                      icon: Calendar,
                    },
                    {
                      label: "WCAG version",
                      value: "2.1 AA + 2.2",
                      icon: Shield,
                    },
                    {
                      label: "Critical issues",
                      value: "12",
                      icon: XCircle,
                      valueClass: "text-red-600",
                    },
                    {
                      label: "Issues auto-fixed",
                      value: "34",
                      icon: CheckCircle2,
                      valueClass: "text-green-600",
                    },
                    {
                      label: "Compliance score",
                      value: "74 / 100",
                      icon: Star,
                    },
                  ].map(({ label, value, icon: Icon, valueClass }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Icon className="w-4 h-4 text-[#2563EB]" />
                        {label}
                      </div>
                      <span
                        className={`font-semibold text-sm ${valueClass || "text-gray-900"}`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate('/products/audit')} className="w-full mt-6 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl py-3 h-auto font-semibold">
                  <Download className="w-4 h-4 mr-2" /> Download Sample PDF
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── WCAG Coverage ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Coverage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Full WCAG principle coverage
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                The Monitor tests against all four WCAG principles — every
                success criterion at Levels A and AA.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  letter: "P",
                  title: "Perceivable",
                  color: "bg-blue-500",
                  light: "bg-blue-50",
                  text: "text-blue-600",
                  items: [
                    "Alternative text",
                    "Captions & transcripts",
                    "Colour contrast",
                    "Resizable text",
                    "Non-text content",
                  ],
                },
                {
                  letter: "O",
                  title: "Operable",
                  color: "bg-purple-500",
                  light: "bg-purple-50",
                  text: "text-purple-600",
                  items: [
                    "Keyboard accessible",
                    "No keyboard traps",
                    "Skip navigation",
                    "Focus order",
                    "Timing controls",
                  ],
                },
                {
                  letter: "U",
                  title: "Understandable",
                  color: "bg-green-500",
                  light: "bg-green-50",
                  text: "text-green-600",
                  items: [
                    "Page language",
                    "On focus behaviour",
                    "Error identification",
                    "Labels & instructions",
                    "Consistent navigation",
                  ],
                },
                {
                  letter: "R",
                  title: "Robust",
                  color: "bg-orange-500",
                  light: "bg-orange-50",
                  text: "text-orange-600",
                  items: [
                    "Valid HTML",
                    "ARIA roles",
                    "Name/role/value",
                    "Status messages",
                    "Parsing errors",
                  ],
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className={`${p.light} rounded-2xl p-6 border border-transparent hover:border-current hover:shadow-md transition-all`}
                >
                  <div
                    className={`w-12 h-12 ${p.color} text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4`}
                  >
                    {p.letter}
                  </div>
                  <h3 className={`font-bold text-lg ${p.text} mb-4`}>
                    {p.title}
                  </h3>
                  <ul className="space-y-2">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${p.text} flex-shrink-0`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ─────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
              Integrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
              Fits into your existing workflow
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-12">
              Connect the Monitor to the tools your team already uses — no
              custom development required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Slack",
                "Jira",
                "GitHub Actions",
                "GitLab CI",
                "Zapier",
                "Microsoft Teams",
                "PagerDuty",
                "Webhooks",
                "REST API",
              ].map((tool) => (
                <div
                  key={tool}
                  className="px-5 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all"
                >
                  <span className="font-medium text-gray-700">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-r from-[#1e3a8a] to-[#2563EB]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ShieldCheck className="w-16 h-16 text-white/60 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start monitoring your website today
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join thousands of teams using the Accessibility Monitor to catch
              violations early, stay compliant, and protect against ADA
              litigation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => navigate('/register')} className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-10 py-4 h-auto font-semibold shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/products/checker')}
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-4 h-auto font-semibold"
              >
                Request a Demo
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-6">
              No credit card required · Cancel any time
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityMonitorPage;
