import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  Linkedin,
  Twitter,
  ExternalLink,
  Building2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import {
  injectSchema,
  aboutPageSchema,
  aboutCompanyStatsSchema,
  aboutCompanyValuesSchema,
  aboutCompanyHistorySchema,
  aboutTeamLeadershipSchema,
  aboutCompanyRecognitionSchema,
  aboutCompanyMissionSchema,
  aboutCultureSchema,
  aboutCtaSchema,
} from "../utils/schemaMarkup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

// ─── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: "40,000+", label: "Websites Protected", icon: Globe },
  { value: "99.7%", label: "Uptime SLA", icon: Zap },
  { value: "190+", label: "Countries Served", icon: MapPin },
  { value: "#1", label: "Rated Accessibility Tool", icon: Star },
];

const values = [
  {
    icon: Heart,
    color: "bg-red-500",
    title: "Inclusion First",
    desc: "We believe the web is for everyone. Every feature, every decision starts by asking: does this make the web more inclusive?",
  },
  {
    icon: Shield,
    color: "bg-blue-500",
    title: "Trust & Transparency",
    desc: "No dark patterns, no hidden limitations. Our pricing, our scan methodology, and our compliance reports are fully transparent.",
  },
  {
    icon: Lightbulb,
    color: "bg-yellow-500",
    title: "Relentless Innovation",
    desc: "Accessibility standards evolve — so do we. We ship WCAG 2.2 support, AI-powered fix suggestions, and CI/CD tooling ahead of the market.",
  },
  {
    icon: Users,
    color: "bg-purple-500",
    title: "Customer Obsession",
    desc: "Our NPS is 78 and climbing. We embed with customers' engineering teams, attend court cases with them, and celebrate compliance wins together.",
  },
  {
    icon: Target,
    color: "bg-green-500",
    title: "Impact at Scale",
    desc: "Over 2.3 billion people live with a disability. Every site we make accessible is a real person who can now bank, learn, shop, or connect online.",
  },
  {
    icon: TrendingUp,
    color: "bg-orange-500",
    title: "Sustainable Growth",
    desc: "We are profitable, independent, and built to last — not chasing the next funding round but focused on long-term customer success.",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    desc: "Three former WCAG auditors start Webenablix from a co-working space in Austin, TX, frustrated that accessibility compliance required months of manual effort.",
  },
  {
    year: "2020",
    title: "First 1,000 Sites",
    desc: "The widget and monitor launch in private beta. 1,000 sites go live within 90 days, driven entirely by word-of-mouth from accessibility consultants.",
  },
  {
    year: "2021",
    title: "Series A — $8M",
    desc: "Raised $8M to build the REST API, CMS integrations, and expand to the EU market. Team grows from 6 to 35.",
  },
  {
    year: "2022",
    title: "Enterprise & VPAT",
    desc: "Launched enterprise-grade VPAT reports, SLA-backed managed remediation, and SOC 2 Type II certification. ARR crosses $5M.",
  },
  {
    year: "2023",
    title: "10,000 Customers",
    desc: "Crossed 10,000 active sites protected. Launched the GitHub Actions integration and AI-generated fix suggestions — an industry first.",
  },
  {
    year: "2024",
    title: "WCAG 2.2 + Global Scale",
    desc: "First accessibility platform to ship full WCAG 2.2 AA automated coverage. Expanded to Asia-Pacific with local support in 8 languages.",
  },
  {
    year: "2025",
    title: "40,000+ Sites",
    desc: "Now serving 40,000+ websites across 190 countries. Launched Managed Accessibility bundles and the accessibility developer SDK.",
  },
  {
    year: "2026",
    title: "What's Next",
    desc: "Building AI-native remediation that auto-patches issues directly in your codebase — making manual accessibility fixes a thing of the past.",
    current: true,
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Co-founder & CEO",
    bio: "Former WCAG lead auditor at Deloitte. Certified IAAP CPACC. Spoke at CSUN Assistive Technology Conference 7 years running.",
    location: "Austin, TX",
    img: null,
    initials: "SC",
    bg: "bg-blue-500",
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Marcus Oyelaran",
    role: "Co-founder & CTO",
    bio: "Previously Staff Engineer at Cloudflare. Built the edge scanning infrastructure that runs 4M page checks per day.",
    location: "London, UK",
    img: null,
    initials: "MO",
    bg: "bg-purple-500",
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Priya Nair",
    role: "Co-founder & CPO",
    bio: "Accessibility researcher & product designer. Contributed to the WCAG 2.2 working group and authored 20+ WCAG technique documents.",
    location: "Austin, TX",
    img: null,
    initials: "PN",
    bg: "bg-green-500",
    links: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Daniel Torres",
    role: "VP of Engineering",
    bio: "12 years in developer tooling. Led infrastructure at HashiCorp before joining Webenablix to scale the API platform.",
    location: "San Francisco, CA",
    img: null,
    initials: "DT",
    bg: "bg-orange-500",
    links: { linkedin: "#" },
  },
  {
    name: "Aisha Kamara",
    role: "Head of Compliance",
    bio: "Former DOJ accessibility consultant. Expert in ADA, Section 508, EN 301 549, and AODA. Manages VPAT and legal-hold reporting.",
    location: "Washington, DC",
    img: null,
    initials: "AK",
    bg: "bg-red-500",
    links: { linkedin: "#" },
  },
  {
    name: "James Park",
    role: "Head of Customer Success",
    bio: "Grew Webenablix's NPS from 54 to 78 in 18 months. Formerly VP of CS at Intercom. Leads a global team of 40 accessibility specialists.",
    location: "Seoul / Remote",
    img: null,
    initials: "JP",
    bg: "bg-teal-500",
    links: { linkedin: "#", twitter: "#" },
  },
];

const awards = [
  { org: "G2", award: "Leader — Web Accessibility, Spring 2026", stars: 5 },
  {
    org: "Capterra",
    award: "Best Ease of Use — Accessibility Software",
    stars: 5,
  },
  { org: "W3C WAI", award: "Endorsed Implementation Partner", stars: null },
  {
    org: "Deloitte Fast 500",
    award: "Fastest Growing Tech Company — 2025",
    stars: null,
  },
  {
    org: "Built In Austin",
    award: "Best Places to Work — 2024 & 2025",
    stars: null,
  },
  {
    org: "IAAP",
    award: "Corporate Accessibility Leader of the Year",
    stars: null,
  },
];

const pressLogos = [
  "TechCrunch",
  "Forbes",
  "Wired",
  "Fast Company",
  "VentureBeat",
  "The Verge",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const Avatar = ({ member }) => (
  <div
    className={`w-20 h-20 ${member.bg} rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
  >
    {member.initials}
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const AboutPage = () => {
  const [expandTimeline, setExpandTimeline] = useState(false);
  const navigate = useNavigate();
  const visibleMilestones = expandTimeline
    ? milestones
    : milestones.slice(0, 4);

  useEffect(() => {
    const cleanup1 = injectSchema(aboutPageSchema, "about-page-schema");
    const cleanup2 = injectSchema(
      aboutCompanyStatsSchema,
      "about-stats-schema",
    );
    const cleanup3 = injectSchema(
      aboutCompanyValuesSchema,
      "about-values-schema",
    );
    const cleanup4 = injectSchema(
      aboutCompanyHistorySchema,
      "about-history-schema",
    );
    const cleanup5 = injectSchema(
      aboutTeamLeadershipSchema,
      "about-team-schema",
    );
    const cleanup6 = injectSchema(
      aboutCompanyRecognitionSchema,
      "about-recognition-schema",
    );
    const cleanup7 = injectSchema(
      aboutCompanyMissionSchema,
      "about-mission-schema",
    );
    const cleanup8 = injectSchema(aboutCultureSchema, "about-culture-schema");
    const cleanup9 = injectSchema(aboutCtaSchema, "about-cta-schema");

    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
      cleanup5();
      cleanup6();
      cleanup7();
      cleanup8();
      cleanup9();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#2563EB] overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4 text-red-300" />
            Building a more inclusive web since 2019
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            We make the web
            <br />
            <span className="text-blue-200">work for everyone.</span>
          </h1>
          <p className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed">
            Webenablix was founded by accessibility auditors who were tired of
            watching businesses fail compliance lawsuits and — more importantly
            — exclude 2.3 billion people.
          </p>
          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur px-6 py-7 text-center"
              >
                <Icon className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-white/60 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Accessibility Score",
                      value: "98 / 100",
                      bar: 98,
                      color: "bg-green-500",
                    },
                    {
                      label: "Issues Found",
                      value: "2 critical",
                      bar: 10,
                      color: "bg-red-400",
                    },
                    {
                      label: "WCAG 2.1 AA",
                      value: "47 / 50",
                      bar: 94,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Sites Protected",
                      value: "40,000+",
                      bar: 100,
                      color: "bg-purple-500",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <p className="text-xs text-gray-500 mb-1">{c.label}</p>
                      <p className="font-bold text-gray-900 text-sm mb-2">
                        {c.value}
                      </p>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${c.color} rounded-full`}
                          style={{ width: `${c.bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Latest scan</p>
                    <p className="text-sm font-bold text-gray-900">
                      No critical issues · ADA compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Make digital accessibility the <em>default</em>, not an
                afterthought.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Today, over 96% of the world's top websites have detectible WCAG
                failures. For the 2.3 billion people living with a disability,
                this means being locked out of banking, healthcare, education,
                and commerce every single day.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We built Webenablix so that any team — regardless of dedicated
                accessibility expertise — can meet the highest standards
                automatically and stay compliant as their product evolves.
              </p>
              <div className="space-y-3">
                {[
                  "One script to protect millions of users",
                  "Automated monitoring that never sleeps",
                  "Legal protection from ADA & WCAG lawsuits",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              These aren't posters on a wall — they're the criteria we use to
              hire, build, and make decisions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const IC = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all"
                >
                  <div
                    className={`w-11 h-11 ${v.color} rounded-xl flex items-center justify-center mb-5`}
                  >
                    <IC className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From a co-working desk to 40,000 sites
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gray-100" />
            <div className="space-y-10">
              {visibleMilestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 relative">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0 z-10 ${m.current ? "bg-[#2563EB] text-white shadow-lg shadow-blue-200" : "bg-gray-900 text-white"}`}
                  >
                    {m.year}
                  </div>
                  <div className="pt-3 pb-2">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {m.title}
                      {m.current && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!expandTimeline && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setExpandTimeline(true)}
                className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-medium hover:underline"
              >
                Show full story <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
              The People
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Leadership Team
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Accessibility professionals, engineers, and customer champions —
              united by a shared conviction that the web should exclude no one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar member={member} />
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-[#2563EB] text-sm font-medium">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {member.location}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex items-center gap-3">
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      className="text-gray-400 hover:text-[#2563EB] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.links.twitter && (
                    <a
                      href={member.links.twitter}
                      className="text-gray-400 hover:text-[#2563EB] transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Hiring band */}
          <div className="mt-10 bg-[#2563EB] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-white font-bold text-xl mb-1">Join the team</p>
              <p className="text-white/75 text-sm">
                We're hiring engineers, accessibility specialists, and customer
                success managers across all timezones.
              </p>
            </div>
            <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-3 h-auto font-semibold flex-shrink-0 whitespace-nowrap">
              View Open Roles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Awards & Recognition ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
              Recognition
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Awards & Certifications
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((a) => (
              <div
                key={a.award}
                className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100"
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    {a.org}
                  </p>
                  <p className="text-gray-900 text-sm font-semibold leading-snug">
                    {a.award}
                  </p>
                  {a.stars && (
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: a.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Press */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm mb-8 uppercase tracking-wide font-medium">
              As seen in
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {pressLogos.map((name) => (
                <div
                  key={name}
                  className="text-gray-300 font-bold text-lg hover:text-gray-500 transition-colors cursor-pointer select-none"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Offices ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">
              Where We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global & Remote-First
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Headquarters in Austin with offices in London and Singapore — and
              team members in 28 countries worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                city: "Austin, TX",
                flag: "🇺🇸",
                role: "Headquarters",
                detail: "1201 W 5th St, Suite 400",
                teams: ["Product", "Engineering", "Compliance"],
              },
              {
                city: "London, UK",
                flag: "🇬🇧",
                role: "EMEA Office",
                detail: "30 St Mary Axe, EC3A 8BF",
                teams: ["Engineering", "Sales", "Customer Success"],
              },
              {
                city: "Singapore",
                flag: "🇸🇬",
                role: "APAC Office",
                detail: "1 Raffles Place, Tower 2",
                teams: ["Sales", "Support", "Partnerships"],
              },
            ].map((office) => (
              <div
                key={office.city}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{office.flag}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-0.5">
                  {office.city}
                </h3>
                <p className="text-[#2563EB] text-sm font-medium mb-3">
                  {office.role}
                </p>
                <div className="flex items-start gap-2 text-gray-400 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {office.detail}
                </div>
                <div className="flex flex-wrap gap-2">
                  {office.teams.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-blue-50 text-[#2563EB] font-medium px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#0f2460] to-[#2563EB]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 text-white/30 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make your site accessible?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Join 40,000+ websites protected by Webenablix. Start free — no
            credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-3 h-auto text-base font-semibold shadow-xl">
              Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-3 h-auto text-base font-semibold"
              onClick={() => navigate("/about")}
            >
              Talk to Sales
            </Button>
          </div>
          <p className="text-white/40 text-xs mt-6">
            14-day free trial · No credit card · Cancel any time
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
