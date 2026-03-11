import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  X,
  Minus,
  Star,
  Shield,
  Zap,
  BarChart3,
  FileText,
  HeadphonesIcon,
  Globe,
  BookOpen,
  Gavel,
  ScanLine,
  Sparkles,
  RefreshCw,
  Award,
  ChevronDown,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const competitors = ["Webenablix", "accessiBe", "AudioEye", "UserWay"];

const brandColors = {
  Webenablix: {
    bg: "bg-[#2563EB]",
    text: "text-[#2563EB]",
    light: "bg-blue-50",
    border: "border-[#2563EB]",
  },
  accessiBe: {
    bg: "bg-gray-700",
    text: "text-gray-600",
    light: "bg-gray-50",
    border: "border-gray-300",
  },
  AudioEye: {
    bg: "bg-gray-700",
    text: "text-gray-600",
    light: "bg-gray-50",
    border: "border-gray-300",
  },
  UserWay: {
    bg: "bg-gray-700",
    text: "text-gray-600",
    light: "bg-gray-50",
    border: "border-gray-300",
  },
};

// yes / no / partial / text value
const rows = [
  {
    category: "Scanning & Detection",
    items: [
      {
        feature: "Automated WCAG 2.1 AA scanning",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
      {
        feature: "WCAG 2.2 coverage",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "no",
        },
      },
      {
        feature: "Section 508 / EN 301 549",
        values: {
          Webenablix: "yes",
          accessiBe: "partial",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
      {
        feature: "Authenticated (behind-login) scanning",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "no",
        },
      },
      {
        feature: "Real-time continuous monitoring",
        values: {
          Webenablix: "yes",
          accessiBe: "partial",
          AudioEye: "yes",
          UserWay: "partial",
        },
      },
      {
        feature: "AI-powered issue analysis & fix hints",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "no",
          UserWay: "no",
        },
      },
    ],
  },
  {
    category: "Remediation",
    items: [
      {
        feature: "Automatic front-end fixes (widget)",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
      {
        feature: "Expert-guided manual remediation",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
      {
        feature: "Full managed remediation by vendor",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "no",
          UserWay: "no",
        },
      },
      {
        feature: "Developer fix suggestions in source",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "partial",
        },
      },
    ],
  },
  {
    category: "Reporting & Export",
    items: [
      {
        feature: "PDF compliance reports",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
      {
        feature: "CSV / JSON data export",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "no",
        },
      },
      {
        feature: "REST API access",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
      {
        feature: "Scheduled auto-delivered reports",
        values: {
          Webenablix: "yes",
          accessiBe: "partial",
          AudioEye: "yes",
          UserWay: "partial",
        },
      },
      {
        feature: "VPAT / ACR documentation",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
    ],
  },
  {
    category: "Legal & Compliance",
    items: [
      {
        feature: "Published accessibility statement",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
      {
        feature: "Compliance certificate (quarterly)",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "no",
        },
      },
      {
        feature: "Litigation support documentation",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
      {
        feature: "ADA lawsuit guarantee / insurance",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "no",
          UserWay: "no",
        },
      },
    ],
  },
  {
    category: "Support & Services",
    items: [
      {
        feature: "Email support",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
      {
        feature: "Live chat support",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "partial",
        },
      },
      {
        feature: "Dedicated account manager",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "partial",
          UserWay: "no",
        },
      },
      {
        feature: "Staff accessibility training",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "no",
          UserWay: "no",
        },
      },
      {
        feature: "CPACC-certified expert on account",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "yes",
          UserWay: "no",
        },
      },
    ],
  },
  {
    category: "Pricing & Plans",
    items: [
      {
        feature: "Free tier / free checker tool",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "no",
          UserWay: "yes",
        },
      },
      {
        feature: "Transparent public pricing",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "no",
          UserWay: "yes",
        },
      },
      {
        feature: "No long-term lock-in contract",
        values: {
          Webenablix: "yes",
          accessiBe: "no",
          AudioEye: "no",
          UserWay: "partial",
        },
      },
      {
        feature: "Enterprise custom plan",
        values: {
          Webenablix: "yes",
          accessiBe: "yes",
          AudioEye: "yes",
          UserWay: "yes",
        },
      },
    ],
  },
];

const scores = {
  Webenablix: {
    overall: 97,
    scanning: 100,
    remediation: 98,
    reporting: 96,
    legal: 95,
    support: 98,
    pricing: 94,
    reviews: 4.9,
  },
  accessiBe: {
    overall: 62,
    scanning: 70,
    remediation: 55,
    reporting: 45,
    legal: 60,
    support: 55,
    pricing: 65,
    reviews: 3.8,
  },
  AudioEye: {
    overall: 74,
    scanning: 80,
    remediation: 70,
    reporting: 75,
    legal: 78,
    support: 72,
    pricing: 50,
    reviews: 4.1,
  },
  UserWay: {
    overall: 58,
    scanning: 65,
    remediation: 45,
    reporting: 40,
    legal: 50,
    support: 60,
    pricing: 70,
    reviews: 3.6,
  },
};

const whyCards = [
  {
    icon: Sparkles,
    color: "bg-blue-500",
    title: "AI at the core",
    desc: "Every violation comes with an AI-generated plain-language explanation and a suggested code fix. No competitor offers this depth.",
  },
  {
    icon: RefreshCw,
    color: "bg-purple-500",
    title: "True end-to-end management",
    desc: "From first audit to ongoing monitoring to legal docs — Webenablix is the only platform that manages the full compliance lifecycle.",
  },
  {
    icon: Gavel,
    color: "bg-red-500",
    title: "Strongest legal protection",
    desc: "Signed VPAT, published accessibility statement, quarterly certificates, and litigation support docs — all included in managed plans.",
  },
  {
    icon: DollarSign,
    color: "bg-green-500",
    title: "Transparent, no-lock-in pricing",
    desc: "Public pricing, a free tier, and month-to-month plans. No surprise invoices or mandatory 12-month contracts.",
  },
  {
    icon: BookOpen,
    color: "bg-orange-500",
    title: "Training that sticks",
    desc: "Role-tailored training for developers, designers, and content teams builds accessibility capability in-house — not dependency on us.",
  },
  {
    icon: HeadphonesIcon,
    color: "bg-indigo-500",
    title: "CPACC-certified experts",
    desc: "Every managed client gets a named CPACC-certified accessibility specialist — not a support ticket queue.",
  },
];

// ─── Helper components ────────────────────────────────────────────────────────

const Cell = ({ val, isWebenablix }) => {
  if (val === "yes")
    return (
      <CheckCircle2
        className={`w-5 h-5 mx-auto ${isWebenablix ? "text-green-400" : "text-green-500"}`}
      />
    );
  if (val === "no")
    return (
      <XCircle
        className={`w-5 h-5 mx-auto ${isWebenablix ? "text-red-300" : "text-red-400"}`}
      />
    );
  if (val === "partial")
    return (
      <Minus
        className={`w-5 h-5 mx-auto ${isWebenablix ? "text-blue-200" : "text-yellow-500"}`}
      />
    );
  return <span className="text-xs text-center block">{val}</span>;
};

const ScoreBar = ({ value, color }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-xs font-semibold text-gray-600 w-6 text-right">
      {value}
    </span>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ComparePage = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#2563EB] py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
              <BarChart3 className="w-4 h-4" />
              Honest, feature-by-feature comparison
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How does Webenablix
              <br />
              <span className="text-blue-200">compare?</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
              See exactly how Webenablix stacks up against accessiBe, AudioEye,
              and UserWay across scanning, remediation, reporting, legal
              protection, support, and pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-4 h-auto font-semibold shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>

        {/* ── Score overview ───────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Overall scores
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
                At a glance
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {competitors.map((comp) => {
                const s = scores[comp];
                const isWe = comp === "Webenablix";
                return (
                  <div
                    key={comp}
                    className={`rounded-2xl p-6 border-2 ${isWe ? "bg-[#2563EB] border-[#2563EB] shadow-xl shadow-blue-200" : "bg-white border-gray-100"}`}
                  >
                    <div
                      className={`text-sm font-bold mb-4 ${isWe ? "text-white" : "text-gray-700"}`}
                    >
                      {comp}
                    </div>

                    {/* Overall ring */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`text-4xl font-extrabold ${isWe ? "text-white" : "text-gray-900"}`}
                      >
                        {s.overall}
                      </div>
                      <div>
                        <div
                          className={`text-xs ${isWe ? "text-blue-100" : "text-gray-400"}`}
                        >
                          / 100
                        </div>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.round(s.reviews) ? (isWe ? "fill-yellow-300 text-yellow-300" : "fill-amber-400 text-amber-400") : isWe ? "text-blue-300" : "text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${isWe ? "text-blue-100" : "text-gray-400"}`}
                        >
                          {s.reviews} / 5
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        ["Scanning", s.scanning],
                        ["Remediation", s.remediation],
                        ["Reporting", s.reporting],
                        ["Legal", s.legal],
                        ["Support", s.support],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div
                            className={`text-xs mb-0.5 ${isWe ? "text-blue-100" : "text-gray-500"}`}
                          >
                            {label}
                          </div>
                          <ScoreBar
                            value={val}
                            color={isWe ? "bg-white" : "bg-[#2563EB]"}
                          />
                        </div>
                      ))}
                    </div>

                    {isWe && (
                      <div className="mt-5 text-center">
                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                          #1 Ranked
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Feature comparison table ─────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Feature breakdown
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
                Every feature, compared
              </h2>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Included
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-400" /> Not available
              </div>
              <div className="flex items-center gap-1.5">
                <Minus className="w-4 h-4 text-yellow-500" /> Partial / add-on
              </div>
            </div>

            {/* Table wrapper — horizontal scroll on mobile */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-gray-50 font-semibold text-gray-600 w-2/5">
                      Feature
                    </th>
                    {competitors.map((c) => (
                      <th
                        key={c}
                        className={`p-4 text-center font-bold text-sm w-[15%] ${c === "Webenablix" ? "bg-[#2563EB] text-white" : "bg-gray-50 text-gray-700"}`}
                      >
                        {c}
                        {c === "Webenablix" && (
                          <div className="text-xs font-normal text-blue-100 mt-0.5">
                            ← Best choice
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((group, gi) => (
                    <React.Fragment key={group.category}>
                      {/* Category header row */}
                      <tr>
                        <td
                          colSpan={5}
                          onClick={() =>
                            setOpenCategory(openCategory === gi ? null : gi)
                          }
                          className="bg-gray-50 px-4 py-3 font-bold text-gray-800 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span>{group.category}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform ${openCategory !== gi ? "" : "rotate-180"}`}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Show all by default — collapse when clicked */}
                      {openCategory !== gi &&
                        group.items.map((row, ri) => (
                          <tr
                            key={row.feature}
                            className={
                              ri % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                            }
                          >
                            <td className="px-4 py-3 text-gray-700">
                              {row.feature}
                            </td>
                            {competitors.map((c) => (
                              <td
                                key={c}
                                className={`px-4 py-3 text-center ${c === "Webenablix" ? "bg-blue-50" : ""}`}
                              >
                                <Cell
                                  val={row.values[c]}
                                  isWebenablix={c === "Webenablix"}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-400 text-xs mt-4">
              Data based on publicly available feature lists and independent
              testing as of March 2026. Partial = limited scope or requires paid
              add-on.
            </p>
          </div>
        </section>

        {/* ── Why Webenablix ───────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Why choose us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                What makes Webenablix different
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Features alone don't tell the whole story. Here's why customers
                switch to Webenablix — and stay.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyCards.map((c) => (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all group"
                >
                  <div
                    className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Switcher testimonial ─────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Real switchers
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4">
                What customers say after switching
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  from: "accessiBe",
                  quote:
                    "accessiBe's widget was masking issues without fixing them. Webenablix gave us a real audit, a real fix plan, and a VPAT we can actually use in procurement.",
                  name: "Tomasz H.",
                  role: "CTO, GovPortal EU",
                },
                {
                  from: "AudioEye",
                  quote:
                    "AudioEye was expensive and required a long contract. Webenablix cost less, had no lock-in, and our compliance score jumped from 64 to 92 in eight weeks.",
                  name: "Destiny M.",
                  role: "Head of Digital, RetailNow",
                },
                {
                  from: "UserWay",
                  quote:
                    "UserWay's reporting was basic CSVs. Webenablix's AI insights actually tell our devs *why* something is broken and *how* to fix it. Huge time saver.",
                  name: "Aiden J.",
                  role: "Accessibility Lead, EduPath",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-4">
                    Switched from{" "}
                    <span className="font-bold text-gray-700">{t.from}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-5">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products quick-links ─────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Explore the full Webenablix platform
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Accessibility Widget",
                  href: "/products/widget",
                  icon: Zap,
                  desc: "Instant front-end compliance layer",
                },
                {
                  label: "Audit Service",
                  href: "/products/audit",
                  icon: FileText,
                  desc: "Expert manual + automated audit",
                },
                {
                  label: "Accessibility Monitor",
                  href: "/products/monitor",
                  icon: ScanLine,
                  desc: "Continuous scanning & reporting",
                },
                {
                  label: "Managed Accessibility",
                  href: "/products/managed",
                  icon: Shield,
                  desc: "Full-service compliance management",
                },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    <p.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {p.label}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{p.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-r from-[#0f2460] to-[#2563EB]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Award className="w-14 h-14 text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to make the switch?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join thousands of websites that chose Webenablix for deeper
              compliance, better AI insights, and the only fully managed
              accessibility program in the market.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-10 py-4 h-auto font-semibold shadow-lg">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-4 h-auto font-semibold"
              >
                Book a Demo
              </Button>
            </div>
            <p className="text-white/40 text-sm mt-6">
              No credit card · No lock-in contract · Cancel any time
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;
