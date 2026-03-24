import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe,
  HeadphonesIcon,
  MessageCircle,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
  ArrowUpRight,
  Briefcase,
  Gavel,
  Lightbulb,
} from "lucide-react";
import {
  injectSchema,
  managedPageMainSchema,
  managedServiceFeaturesSchema,
  managedServiceOfferingSchema,
  managedEssentialPlanSchema,
  managedProfessionalPlanSchema,
  managedServiceProcessSchema,
  managedServiceStatisticsSchema,
  managedServiceBenefitsSchema,
  managedServiceTestimonialsSchema,
  managedServiceModulesSchema,
  managedServiceFaqSchema,
  managedServiceExpertiseSchema,
  managedServiceTrustSchema,
  managedServiceCtaSchema,
} from "../utils/schemaMarkup";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Sub-components ───────────────────────────────────────────────────────────

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

const PlanCard = ({
  name,
  badge,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  onCtaClick,
}) => (
  <div
    className={`relative rounded-2xl p-8 flex flex-col ${
      highlighted
        ? "bg-[#2563EB] text-white shadow-2xl shadow-blue-200 scale-105"
        : "bg-white border border-gray-200 hover:border-[#2563EB] hover:shadow-xl transition-all"
    }`}
  >
    {badge && (
      <span
        className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
          highlighted ? "bg-white text-[#2563EB]" : "bg-[#2563EB] text-white"
        }`}
      >
        {badge}
      </span>
    )}
    <div className="mb-6">
      <h3
        className={`text-xl font-bold mb-1 ${highlighted ? "text-white" : "text-gray-900"}`}
      >
        {name}
      </h3>
      <p
        className={`text-sm mb-4 ${highlighted ? "text-blue-100" : "text-gray-500"}`}
      >
        {description}
      </p>
      <div className="flex items-end gap-1">
        <span
          className={`text-4xl font-extrabold ${highlighted ? "text-white" : "text-gray-900"}`}
        >
          {price}
        </span>
        {period && (
          <span
            className={`text-sm mb-1 ${highlighted ? "text-blue-100" : "text-gray-400"}`}
          >
            {period}
          </span>
        )}
      </div>
    </div>
    <ul className="space-y-3 flex-1 mb-8">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm">
          <CheckCircle2
            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlighted ? "text-blue-200" : "text-emerald-500"}`}
          />
          <span className={highlighted ? "text-blue-50" : "text-gray-700"}>
            {f}
          </span>
        </li>
      ))}
    </ul>
    <Button
      onClick={onCtaClick}
      className={`w-full rounded-full py-3 h-auto font-semibold ${
        highlighted
          ? "bg-white text-[#2563EB] hover:bg-blue-50"
          : "bg-[#2563EB] text-white hover:bg-blue-700"
      }`}
    >
      {cta}
    </Button>
  </div>
);

const TestimonialCard = ({ quote, name, title, company, rating }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
      "{quote}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
        {name[0]}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-gray-500 text-xs">
          {title}, {company}
        </p>
      </div>
    </div>
  </div>
);

const ProcessStep = ({ number, title, description, icon: Icon, color }) => (
  <div className="relative flex gap-5">
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 ${color} text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 z-10`}
      >
        {number}
      </div>
      <div className="w-0.5 flex-1 bg-gray-200 mt-2 last:hidden" />
    </div>
    <div className="pb-10 pt-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-[#2563EB]" />
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ManagedAccessibilityPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject main managed service schema
    const cleanup1 = injectSchema(managedPageMainSchema, "managed-main-schema");

    // Inject service features schema
    const cleanup2 = injectSchema(
      managedServiceFeaturesSchema,
      "managed-features-schema",
    );

    // Inject service offerings schema
    const cleanup3 = injectSchema(
      managedServiceOfferingSchema,
      "managed-offering-schema",
    );

    // Inject essential plan details
    const cleanup4 = injectSchema(
      managedEssentialPlanSchema,
      "managed-essential-schema",
    );

    // Inject professional plan details
    const cleanup5 = injectSchema(
      managedProfessionalPlanSchema,
      "managed-professional-schema",
    );

    // Inject process schema
    const cleanup6 = injectSchema(
      managedServiceProcessSchema,
      "managed-process-schema",
    );

    // Inject statistics schema
    const cleanup7 = injectSchema(
      managedServiceStatisticsSchema,
      "managed-stats-schema",
    );

    // Inject benefits schema
    const cleanup8 = injectSchema(
      managedServiceBenefitsSchema,
      "managed-benefits-schema",
    );

    // Inject testimonials schema
    const cleanup9 = injectSchema(
      managedServiceTestimonialsSchema,
      "managed-testimonials-schema",
    );

    // Inject service modules schema
    const cleanup10 = injectSchema(
      managedServiceModulesSchema,
      "managed-modules-schema",
    );

    // Inject FAQ schema
    const cleanup11 = injectSchema(
      managedServiceFaqSchema,
      "managed-faq-schema",
    );

    // Inject expertise schema
    const cleanup12 = injectSchema(
      managedServiceExpertiseSchema,
      "managed-expertise-schema",
    );

    // Inject trust schema
    const cleanup13 = injectSchema(
      managedServiceTrustSchema,
      "managed-trust-schema",
    );

    // Inject CTA schema
    const cleanup14 = injectSchema(
      managedServiceCtaSchema,
      "managed-cta-schema",
    );

    // Cleanup all schemas on unmount
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
      cleanup10();
      cleanup11();
      cleanup12();
      cleanup13();
      cleanup14();
    };
  }, []);

  const tabs = [
    {
      label: "Audit & Remediation",
      icon: ClipboardList,
      heading: "Find every issue — then fix it",
      body: "Our certified experts conduct a thorough manual + automated audit of your entire digital presence. We then hand you a prioritised remediation plan and work alongside your developers to close every gap.",
      points: [
        "Full WCAG 2.1 & 2.2 audit",
        "Manual & automated testing",
        "Developer-ready remediation guide",
        "Re-test verification included",
      ],
    },
    {
      label: "Ongoing Monitoring",
      icon: BarChart3,
      heading: "Stay compliant as your site evolves",
      body: "New content and features introduce new violations. Our Managed plan watches your site continuously and alerts you the moment a regression appears — with an expert ready to help you resolve it.",
      points: [
        "24 / 7 automated scanning",
        "Real-time Slack & email alerts",
        "Monthly compliance health report",
        "Dedicated accessibility manager",
      ],
    },
    {
      label: "Legal Protection",
      icon: Gavel,
      heading: "Reduce your legal exposure",
      body: "ADA web lawsuits are at an all-time high. Our managed clients receive a Voluntary Product Accessibility Template (VPAT), an accessibility statement, and can reference our certified audit in any legal proceedings.",
      points: [
        "VPAT / ACR document",
        "Published accessibility statement",
        "Litigation support documentation",
        "Quarterly compliance certificate",
      ],
    },
    {
      label: "Training & Advisory",
      icon: BookOpen,
      heading: "Build accessibility into your team's DNA",
      body: "Accessibility is a team sport. We train your designers, developers, and content authors — so new work ships accessible from day one, reducing remediation costs long-term.",
      points: [
        "Role-tailored training sessions",
        "Self-paced e-learning platform",
        "Design system accessibility review",
        "On-demand expert Q&A",
      ],
    },
  ];

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

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
                  <Award className="w-4 h-4" />
                  Certified Accessibility Experts
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Managed
                  <br />
                  <span className="text-blue-200">Accessibility</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Let our certified experts handle your entire accessibility
                  program — from audit and remediation to continuous monitoring,
                  legal documentation, and staff training.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => navigate("/register")}
                    className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-4 h-auto font-semibold shadow-lg"
                  >
                    Schedule a Consultation
                  </Button>
                  <Button
                    onClick={() => navigate("/pricing")}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold"
                  >
                    View Pricing <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-6 mt-10 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> WCAG 2.1 &amp;
                    2.2 Certified
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> ADA &amp;
                    Section 508
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" /> Dedicated
                    account manager
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-white space-y-5">
                <h3 className="font-bold text-xl mb-2">What's included</h3>
                {[
                  {
                    icon: ClipboardList,
                    label: "Expert manual + automated audit",
                  },
                  { icon: RefreshCw, label: "Ongoing remediation support" },
                  {
                    icon: BarChart3,
                    label: "Continuous compliance monitoring",
                  },
                  { icon: Gavel, label: "VPAT & legal documentation" },
                  { icon: BookOpen, label: "Team training & advisory" },
                  {
                    icon: HeadphonesIcon,
                    label: "Dedicated accessibility manager",
                  },
                  { icon: FileText, label: "Monthly compliance reports" },
                  {
                    icon: ShieldCheck,
                    label: "Quarterly compliance certificate",
                  },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-200" />
                    </div>
                    <span className="text-white/90 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust bar ────────────────────────────────────────────────────── */}
        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest font-medium">
              Trusted by leading organisations
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                "US Department of Education",
                "HealthFirst",
                "LegalShield",
                "RetailNow",
                "CityGov Portal",
                "EduPath LMS",
              ].map((b) => (
                <div
                  key={b}
                  className="px-6 py-2.5 bg-white rounded-full shadow-sm border border-gray-100"
                >
                  <span className="font-semibold text-gray-600 text-sm">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "98%", label: "Client satisfaction rate", icon: Star },
                {
                  value: "2,400+",
                  label: "Managed sites worldwide",
                  icon: Globe,
                },
                {
                  value: "0",
                  label: "Successful ADA lawsuits\nagainst managed clients",
                  icon: ShieldCheck,
                },
                {
                  value: "6 wks",
                  label: "Avg. time to full compliance",
                  icon: TrendingUp,
                },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="w-8 h-8 text-[#2563EB]" />
                  <div className="text-3xl font-bold text-gray-900">
                    {value}
                  </div>
                  <div className="text-gray-500 text-sm whitespace-pre-line leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tabbed services ──────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                A complete accessibility program,
                <br />
                <span className="text-[#2563EB]">fully managed for you</span>
              </h2>
            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {tabs.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                      activeTab === i
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {tabs[activeTab].heading}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {tabs[activeTab].body}
                  </p>
                  <ul className="space-y-3">
                    {tabs[activeTab].points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-3 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`flex items-center justify-center p-10 bg-gradient-to-br ${
                    [
                      "from-blue-50 to-indigo-100",
                      "from-purple-50 to-blue-100",
                      "from-red-50 to-orange-100",
                      "from-green-50 to-teal-100",
                    ][activeTab]
                  }`}
                >
                  {React.createElement(tabs[activeTab].icon, {
                    className: "w-32 h-32 text-[#2563EB] opacity-20",
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How we work ────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                The Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                How Managed Accessibility works
              </h2>
            </div>

            <div>
              <ProcessStep
                number="1"
                icon={MessageCircle}
                color="bg-blue-600"
                title="Discovery call"
                description="We start with a 30-minute consultation to understand your site, your tech stack, your traffic, and your legal exposure. No obligation."
              />
              <ProcessStep
                number="2"
                icon={ClipboardList}
                color="bg-purple-600"
                title="Baseline audit"
                description="Our experts run a comprehensive manual and automated audit. You receive a prioritised issues list within 5 business days, mapped to WCAG success criteria."
              />
              <ProcessStep
                number="3"
                icon={Lightbulb}
                color="bg-green-600"
                title="Remediation sprint"
                description="We work alongside your dev team (or remediate directly, depending on your plan) to close critical and serious violations first — fastest path to compliance."
              />
              <ProcessStep
                number="4"
                icon={ShieldCheck}
                color="bg-orange-500"
                title="Certification & documentation"
                description="Once compliant, you receive a signed VPAT, a published accessibility statement, and a compliance certificate for use in legal or procurement contexts."
              />
              <ProcessStep
                number="5"
                icon={RefreshCw}
                color="bg-indigo-600"
                title="Continuous management"
                description="We monitor your site 24/7, remediate regressions, deliver monthly reports, and are reachable any time via your dedicated accessibility manager."
              />
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Plans for every organisation
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                All plans include a dedicated accessibility manager, WCAG 2.1 AA
                coverage, and monthly reporting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              <PlanCard
                name="Essential"
                price="$499"
                period="/mo"
                description="For small sites that need a solid compliance foundation"
                cta="Get Started"
                highlighted={false}
                onCtaClick={() => navigate("/register")}
                features={[
                  "Up to 50 pages monitored",
                  "Annual manual audit",
                  "Automated daily scans",
                  "Email & Slack alerts",
                  "Accessibility statement",
                  "Email support (48 h SLA)",
                ]}
              />
              <PlanCard
                name="Professional"
                badge="Most Popular"
                price="$1,299"
                period="/mo"
                description="For growing businesses with ongoing compliance needs"
                cta="Start Free Trial"
                highlighted={true}
                onCtaClick={() => navigate("/register")}
                features={[
                  "Up to 500 pages monitored",
                  "Semi-annual manual audit",
                  "Automated real-time scans",
                  "VPAT / ACR document",
                  "Dedicated account manager",
                  "Remediation support (40 h / mo)",
                  "Priority support (4 h SLA)",
                  "Quarterly compliance certificate",
                ]}
              />
              <PlanCard
                name="Enterprise"
                price="Custom"
                period=""
                description="For large enterprises, government, and regulated industries"
                cta="Contact Sales"
                highlighted={false}
                onCtaClick={() => navigate("/about")}
                features={[
                  "Unlimited pages",
                  "Quarterly manual audits",
                  "Full remediation by our team",
                  "Litigation support package",
                  "Custom SLA",
                  "Staff training program",
                  "Design system review",
                  "Named CPACC-certified lead",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                What clients say
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                Real results for real organisations
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                rating={5}
                quote="Within 6 weeks we went from failing an external VPAT review to passing it with flying colours. The team handled everything — we barely had to lift a finger."
                name="Sandra Okafor"
                title="Chief Digital Officer"
                company="HealthFirst"
              />
              <TestimonialCard
                rating={5}
                quote="We faced an ADA demand letter and turned to Webenablix. Their Managed plan got us compliant fast and the legal documentation helped us resolve the case without litigation."
                name="Marcus Webb"
                title="General Counsel"
                company="LegalShield"
              />
              <TestimonialCard
                rating={5}
                quote="The monthly compliance reports have become a standing agenda item in our board meetings. Stakeholders love the clear score trend and the proactive approach."
                name="Priya Nair"
                title="VP Technology"
                company="EduPath LMS"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                FAQ
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4">
                Common questions
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'What does "managed" actually mean?',
                  a: "It means our team handles the full accessibility lifecycle for you — audit, remediation guidance (or direct code fixes on Enterprise), monitoring, reporting, and legal docs. You retain final sign-off, but the heavy lifting is ours.",
                },
                {
                  q: "How long does the initial audit take?",
                  a: "For most sites under 200 pages, we deliver the full written audit within 5 business days of kick-off. Larger or more complex sites typically take 7–10 business days.",
                },
                {
                  q: "What standards do you audit against?",
                  a: "We audit against WCAG 2.1 Level AA as the baseline, with optional WCAG 2.2 and Section 508 coverage. Enterprise clients can also request EN 301 549 (European standard) coverage.",
                },
                {
                  q: "Can you work with any tech stack?",
                  a: "Yes. We have experts across React, Angular, Vue, WordPress, Shopify, Drupal, Sitecore, and bespoke platforms. We adapt our remediation approach to match your tooling.",
                },
                {
                  q: "What happens if a lawsuit is filed while Im a managed client?",
                  a: "Enterprise clients receive litigation support documentation including the signed VPAT, audit trail, and a letter from our compliance team. We also provide expert witness support upon request.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-white rounded-xl border border-gray-100 group overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-gray-900 select-none list-none">
                    {q}
                    <ArrowRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-r from-[#0f2460] to-[#2563EB]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Award className="w-16 h-16 text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to put accessibility on autopilot?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Schedule a free 30-minute consultation. We'll assess your current
              compliance posture and recommend the right plan — no obligations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => navigate("/register")}
                className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-10 py-4 h-auto font-semibold shadow-lg"
              >
                Book Free Consultation <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate("/pricing")}
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-4 h-auto font-semibold"
              >
                View Pricing
              </Button>
            </div>
            <p className="text-white/40 text-sm mt-6">
              No credit card · No commitment · Response within 1 business day
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ManagedAccessibilityPage;
