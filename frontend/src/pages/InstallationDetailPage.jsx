import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Folder,
  Lightbulb,
  Settings,
  ShoppingBag,
  Tag,
  Terminal,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { installationsData } from "../data/installations";
import {
  injectSchema,
  installationEmbedPageSchema,
  installationEmbedProcessSchema,
  installationEmbedBenefitsSchema,
  installationEmbedTipsSchema,
  installationEmbedFaqSchema,
  installationMethodsSchema,
  webenablixWidgetSchema,
  installationEmbedCtaSchema,
  installationWordPressPageSchema,
  installationWordPressProcessSchema,
  installationWordPressPluginBenefitsSchema,
  installationWordPressTipsSchema,
  installationWordPressFaqSchema,
  installationWordPressCachingSchema,
  installationWordPressCompatibilitySchema,
  installationWordPressCtaSchema,
} from "../utils/schemaMarkup";

// ─── Code block with copy button ─────────────────────────────────────────────

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden border border-gray-200">
      <div className="bg-gray-900 flex items-center justify-between px-4 py-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
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

// ─── Step card ────────────────────────────────────────────────────────────────

const StepCard = ({ step, index, total, accentBg }) => (
  <div className="flex gap-5">
    <div className="flex flex-col items-center flex-shrink-0">
      <div
        className={`w-10 h-10 ${accentBg} text-white rounded-full flex items-center justify-center font-bold text-sm z-10`}
      >
        {index + 1}
      </div>
      {index < total - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-2" />}
    </div>
    <div className={`pb-10 ${index === total - 1 ? "pb-0" : ""} flex-1`}>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {step.description}
      </p>
      {step.code && <CodeBlock code={step.code} />}
    </div>
  </div>
);

// ─── FAQ item ─────────────────────────────────────────────────────────────────

const FaqItem = ({ q, a }) => (
  <details className="bg-white rounded-xl border border-gray-100 group overflow-hidden">
    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-gray-900 select-none list-none">
      {q}
      <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4" />
    </summary>
    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
      {a}
    </div>
  </details>
);

// ─── Platform navigation ──────────────────────────────────────────────────────

const allPlatforms = [
  { slug: "embed", label: "Embed" },
  { slug: "wordpress", label: "WordPress" },
  { slug: "custom", label: "Custom" },
  { slug: "wix", label: "Wix" },
  { slug: "webflow", label: "Webflow" },
  { slug: "shopify", label: "Shopify" },
  { slug: "hubspot", label: "HubSpot" },
  { slug: "gtm", label: "GTM" },
  { slug: "bigcommerce", label: "BigCommerce" },
  { slug: "squarespace", label: "Squarespace" },
  { slug: "gohighlevel", label: "Go High Level" },
  { slug: "manage", label: "Manage" },
];

// ─── Icon / badge lookup ─────────────────────────────────────────────────────

const PlatformBadge = ({ icon, name, accentBg }) => {
  const iconMap = {
    Code: <Code className="w-5 h-5 text-white" />,
    Settings: <Settings className="w-5 h-5 text-white" />,
    Shopify: <ShoppingBag className="w-5 h-5 text-white" />,
    GTM: <Tag className="w-5 h-5 text-white" />,
    Folder: <Folder className="w-5 h-5 text-white" />,
  };
  return (
    <div
      className={`w-14 h-14 ${accentBg} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
    >
      {iconMap[icon] ?? <span className="text-sm">{icon}</span>}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const InstallationDetailPage = () => {
  const { platform } = useParams();
  const data = installationsData[platform];

  useEffect(() => {
    if (platform === "embed") {
      const cleanup1 = injectSchema(
        installationEmbedPageSchema,
        "install-embed-page-schema",
      );
      const cleanup2 = injectSchema(
        installationEmbedProcessSchema,
        "install-embed-process-schema",
      );
      const cleanup3 = injectSchema(
        installationEmbedBenefitsSchema,
        "install-embed-benefits-schema",
      );
      const cleanup4 = injectSchema(
        installationEmbedTipsSchema,
        "install-embed-tips-schema",
      );
      const cleanup5 = injectSchema(
        installationEmbedFaqSchema,
        "install-embed-faq-schema",
      );
      const cleanup6 = injectSchema(
        installationMethodsSchema,
        "install-methods-schema",
      );
      const cleanup7 = injectSchema(
        webenablixWidgetSchema,
        "webenablix-widget-schema",
      );
      const cleanup8 = injectSchema(
        installationEmbedCtaSchema,
        "install-embed-cta-schema",
      );

      return () => {
        cleanup1();
        cleanup2();
        cleanup3();
        cleanup4();
        cleanup5();
        cleanup6();
        cleanup7();
        cleanup8();
      };
    } else if (platform === "wordpress") {
      const cleanup1 = injectSchema(
        installationWordPressPageSchema,
        "install-wordpress-page-schema",
      );
      const cleanup2 = injectSchema(
        installationWordPressProcessSchema,
        "install-wordpress-process-schema",
      );
      const cleanup3 = injectSchema(
        installationWordPressPluginBenefitsSchema,
        "install-wordpress-benefits-schema",
      );
      const cleanup4 = injectSchema(
        installationWordPressTipsSchema,
        "install-wordpress-tips-schema",
      );
      const cleanup5 = injectSchema(
        installationWordPressFaqSchema,
        "install-wordpress-faq-schema",
      );
      const cleanup6 = injectSchema(
        installationWordPressCachingSchema,
        "install-wordpress-caching-schema",
      );
      const cleanup7 = injectSchema(
        installationWordPressCompatibilitySchema,
        "install-wordpress-compat-schema",
      );
      const cleanup8 = injectSchema(
        installationWordPressCtaSchema,
        "install-wordpress-cta-schema",
      );

      return () => {
        cleanup1();
        cleanup2();
        cleanup3();
        cleanup4();
        cleanup5();
        cleanup6();
        cleanup7();
        cleanup8();
      };
    }
  }, [platform]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Installation guide not found
          </h1>
          <a href="/installation" className="text-[#2563EB] underline">
            Back to Installations
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className={`bg-gradient-to-br ${data.gradient} py-18 lg:py-24 relative overflow-hidden`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-14">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-8">
              <a
                href="/installation"
                className="hover:text-white transition-colors"
              >
                Installation
              </a>
              <span>/</span>
              <span className="text-white">{data.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <PlatformBadge
                icon={data.icon}
                name={data.name}
                accentBg="bg-white/20"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${data.badgeColor}`}
                  >
                    {data.name}
                  </span>
                  {data.difficulty !== "N/A" && (
                    <span className="text-xs font-medium bg-white/10 text-white/80 px-3 py-1 rounded-full">
                      Difficulty: {data.difficulty}
                    </span>
                  )}
                  {data.time && (
                    <span className="flex items-center gap-1 text-xs font-medium bg-white/10 text-white/80 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {data.time}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  {data.tagline}
                </h1>
                <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-7 py-3 h-auto font-semibold shadow-lg">
                Get My API Key <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="/installation"
                className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 rounded-full px-7 py-3 text-sm font-semibold transition-colors"
              >
                All Platforms
              </a>
            </div>
          </div>
        </section>

        {/* ── Platform switcher ────────────────────────────────────────────── */}
        <section className="py-5 bg-gray-50 border-b border-gray-100 sticky top-0 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {allPlatforms.map((p) => (
                <a
                  key={p.slug}
                  href={`/installation/${p.slug}`}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    p.slug === platform
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Steps ────────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-12">
              <span
                className={`${data.accentText} font-semibold text-sm uppercase tracking-widest`}
              >
                Step-by-step guide
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3">
                How to install on {data.name}
              </h2>
            </div>
            <div>
              {data.steps.map((step, i) => (
                <StepCard
                  key={i}
                  step={step}
                  index={i}
                  total={data.steps.length}
                  accentBg={data.accentBg}
                />
              ))}
            </div>

            {/* Done banner */}
            <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 mb-1">You're all set!</p>
                <p className="text-green-700 text-sm">
                  The Webenablix widget is now installed. Visit your live site
                  to confirm it's working. If you need help, our support team is
                  available 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tips ─────────────────────────────────────────────────────────── */}
        {data.tips?.length > 0 && (
          <section className="py-14 bg-gray-50 border-y border-gray-100">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className={`w-5 h-5 ${data.accentText}`} />
                <h2 className="text-lg font-bold text-gray-900">
                  Pro tips for {data.name}
                </h2>
              </div>
              <ul className="space-y-3">
                {data.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-700 text-sm"
                  >
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-10">
              <span
                className={`${data.accentText} font-semibold text-sm uppercase tracking-widest`}
              >
                FAQ
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3">
                Common questions about {data.name} installation
              </h2>
            </div>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <FaqItem key={i} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Other platforms ──────────────────────────────────────────────── */}
        <section className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm mb-6">
              Install on another platform
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {allPlatforms
                .filter((p) => p.slug !== platform)
                .map((p) => (
                  <a
                    key={p.slug}
                    href={`/installation/${p.slug}`}
                    className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm transition-all"
                  >
                    {p.label}
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className={`py-20 bg-gradient-to-r ${data.gradient}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Terminal className="w-12 h-12 text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to go live on {data.name}?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Get your API key, follow the steps above, and your site will be
              accessible to every user in minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-10 py-4 h-auto font-semibold shadow-lg">
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-4 h-auto font-semibold"
              >
                Contact Support
              </Button>
            </div>
            <p className="text-white/40 text-sm mt-6">
              No credit card · 5-minute setup · 24/7 support
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstallationDetailPage;
