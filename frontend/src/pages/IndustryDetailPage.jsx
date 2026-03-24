import React from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  ArrowRight,
  Download,
  Check,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Building,
  Landmark,
  GraduationCap,
  ShoppingCart,
  Code,
  HeartPulse,
  Car,
  Home,
  Heart,
  Tv,
  Star,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { industriesData } from "../data/industries";

// ─── Icon map ─────────────────────────────────────────────────────────────────
const iconMap = {
  Building,
  Landmark,
  GraduationCap,
  ShoppingCart,
  Code,
  HeartPulse,
  Car,
  Home,
  Heart,
  Tv,
  Shield,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const RegCard = ({ name, desc }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
    <div className="flex items-start gap-3">
      <ShieldCheck className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-gray-900 text-sm">{name}</p>
        <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const ChallengeCard = ({ title, desc }) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
      <AlertTriangle className="w-4 h-4 text-red-500" />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const SolutionCard = ({ title, desc, index, accentBg }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all group">
    <div
      className={`w-10 h-10 ${accentBg} text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform`}
    >
      {index + 1}
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

// ─── Main Template ────────────────────────────────────────────────────────────

const IndustryDetailPage = () => {
  const { industry } = useParams();
  const data = industriesData[industry];

  const handleDownloadGuide = () => {
    if (!data) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    let cursorY = margin;

    const ensureSpace = (neededHeight = 16) => {
      if (cursorY + neededHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
    };

    const writeHeading = (text, size = 16) => {
      ensureSpace(size + 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.setTextColor(17, 24, 39);
      doc.text(text, margin, cursorY);
      cursorY += size + 8;
    };

    const writeParagraph = (text, size = 11, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(55, 65, 81);
      const lines = doc.splitTextToSize(text, maxWidth);
      const lineHeight = Math.max(14, size * 1.35);

      lines.forEach((line) => {
        ensureSpace(lineHeight);
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
      cursorY += 6;
    };

    writeHeading(`${data.name} Accessibility Guide`, 22);
    writeParagraph(data.tagline, 12, true);
    writeParagraph(data.description, 11);

    writeHeading("Key Regulations", 15);
    data.regulations.forEach((reg, index) => {
      writeParagraph(`${index + 1}. ${reg.name}`, 12, true);
      writeParagraph(reg.desc, 11);
    });

    writeHeading("Common Challenges", 15);
    data.challenges.forEach((challenge, index) => {
      writeParagraph(`${index + 1}. ${challenge.title}`, 12, true);
      writeParagraph(challenge.desc, 11);
    });

    writeHeading("Recommended Solutions", 15);
    data.solutions.forEach((solution, index) => {
      writeParagraph(`${index + 1}. ${solution.title}`, 12, true);
      writeParagraph(solution.desc, 11);
    });

    writeHeading("Source", 13);
    writeParagraph("Generated from Webenablix Industry Page content.", 10);
    writeParagraph(`Date: ${new Date().toLocaleDateString()}`, 10);

    doc.save(`${data.id}-accessibility-guide.pdf`);
  };

  // Fallback for unknown slugs
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Industry page not found
          </h1>
          <a href="/industries" className="text-[#2563EB] underline">
            Back to Industries
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const IndustryIcon = iconMap[data.icon] || Shield;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className={`bg-gradient-to-br ${data.heroGradient} py-20 lg:py-28 relative overflow-hidden`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                  <a
                    href="/industries"
                    className="hover:text-white transition-colors"
                  >
                    Industries
                  </a>
                  <span>/</span>
                  <span className="text-white">{data.name}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
                  <IndustryIcon className="w-4 h-4" />
                  {data.name} Accessibility
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {data.tagline}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {data.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-4 h-auto font-semibold shadow-lg">
                    {data.cta.primary}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownloadGuide}
                    className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {data.cta.secondary}
                  </Button>
                </div>
              </div>

              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-4">
                {data.stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl font-extrabold text-white mb-1">
                      {value}
                    </div>
                    <div className="text-white/70 text-sm leading-snug">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust checklist ──────────────────────────────────────────────── */}
        <section className="py-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "WCAG 2.1 & 2.2 Certified",
                "ADA & Section 508",
                "Dedicated Account Manager",
                "VPAT Documentation",
                "Continuous Monitoring",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-gray-600 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Regulations ──────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                  Compliance landscape
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                  Laws &amp; standards that apply to {data.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Non-compliance in the {data.name.toLowerCase()} sector carries
                  significant legal and financial risk. These are the key
                  regulations your digital properties must meet.
                </p>
                <div className="space-y-4">
                  {data.regulations.map((r) => (
                    <RegCard key={r.name} {...r} />
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                  Common pain points
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-8">
                  Challenges facing {data.name}
                </h2>
                <div className="space-y-6">
                  {data.challenges.map((c) => (
                    <ChallengeCard key={c.title} {...c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Solutions ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest">
                How we help
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Webenablix solutions for{" "}
                <span className={data.accentColor}>{data.name}</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Purpose-built workflows and expertise for the unique
                accessibility challenges of the {data.name.toLowerCase()}{" "}
                sector.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.solutions.map((s, i) => (
                <SolutionCard
                  key={s.title}
                  index={i}
                  accentBg={data.accentBg}
                  {...s}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Products quick-links ─────────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Find the right solution for your team
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Accessibility Widget",
                  href: "/products/widget",
                  desc: "Instant front-end compliance layer",
                },
                {
                  label: "Audit Service",
                  href: "/products/audit",
                  desc: "Expert manual + automated audit",
                },
                {
                  label: "Accessibility Monitor",
                  href: "/products/monitor",
                  desc: "Continuous scanning & reporting",
                },
                {
                  label: "Managed Accessibility",
                  href: "/products/managed",
                  desc: "Full-service compliance program",
                },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all text-left group"
                >
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-[#2563EB] transition-colors">
                    {p.label}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{p.desc}</p>
                  <div className="flex items-center gap-1 text-[#2563EB] text-xs mt-3 font-medium">
                    Learn more{" "}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="flex gap-1 justify-center mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8 italic">
              "{data.testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {data.testimonial.name[0]}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">
                  {data.testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {data.testimonial.role}, {data.testimonial.org}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other industries ─────────────────────────────────────────────── */}
        <section className="py-14 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm mb-6">
              Explore other industries
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Government", href: "/industries/government" },
                { label: "Banking", href: "/industries/banking" },
                { label: "Academic", href: "/industries/academic" },
                { label: "Retail", href: "/industries/retail" },
                { label: "IT", href: "/industries/it" },
                { label: "HealthCare", href: "/industries/healthcare" },
                { label: "Automotive", href: "/industries/automotive" },
                { label: "Real Estate", href: "/industries/real-estate" },
                { label: "NGO / NPO", href: "/industries/ngo" },
                { label: "Media & Entertainment", href: "/industries/media" },
                {
                  label: "Law Enforcement",
                  href: "/industries/law-enforcement",
                },
              ]
                .filter((i) => i.href !== `/industries/${industry}`)
                .map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm transition-all"
                  >
                    {i.label}
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className={`py-20 bg-gradient-to-r ${data.heroGradient}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <IndustryIcon className="w-14 h-14 text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to make {data.name} more accessible?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Talk to a specialist who understands the compliance requirements
              of your sector.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-10 py-4 h-auto font-semibold shadow-lg">
                {data.cta.primary} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadGuide}
                className="border-white text-white hover:bg-white/10 rounded-full px-10 py-4 h-auto font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                {data.cta.secondary}
              </Button>
            </div>
            <p className="text-white/40 text-sm mt-6">
              No commitment · Response within 1 business day
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustryDetailPage;
