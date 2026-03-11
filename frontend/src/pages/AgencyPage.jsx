import React, { useState } from 'react';
import {
  ArrowRight, Award, BarChart3, Briefcase, Check, ChevronDown,
  Code, DollarSign, ExternalLink, Gift, Globe, GraduationCap,
  Layers, Lightbulb, MapPin, Package, Percent, Quote, Shield,
  Sparkles, Star, TrendingUp, Users, Zap, BadgeCheck, Crown,
  FileText, HeadphonesIcon, RefreshCw, Tag
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

// ─── Data ──────────────────────────────────────────────────────────────────────

const partnerTiers = [
  {
    name: 'Certified Partner',
    icon: BadgeCheck,
    color: 'border-gray-200',
    headerBg: 'bg-gray-50',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    badge: null,
    requirement: 'Refer 5+ clients / year',
    revenue: '20% recurring commission',
    perks: [
      'Co-branded proposal templates',
      'Partner badge & listing in directory',
      'Access to partner sales portal',
      'Dedicated partner onboarding call',
      'NFR (not-for-resale) licence for demos',
      'Email support SLA — 24 hours',
    ],
  },
  {
    name: 'Silver Partner',
    icon: Star,
    color: 'border-blue-200',
    headerBg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: null,
    requirement: 'Refer 15+ clients / year',
    revenue: '25% recurring commission',
    perks: [
      'Everything in Certified, plus:',
      'Priority placement in partner directory',
      'Co-marketing budget ($500/qtr)',
      'Quarterly business review with partner manager',
      'Early access to new features',
      'Email & chat support SLA — 8 hours',
    ],
  },
  {
    name: 'Gold Partner',
    icon: Crown,
    color: 'border-yellow-300',
    headerBg: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    badge: 'Most Popular',
    requirement: 'Refer 30+ clients / year',
    revenue: '30% recurring commission',
    perks: [
      'Everything in Silver, plus:',
      'Featured spotlight in newsletter & blog',
      'Co-marketing budget ($1,500/qtr)',
      'Joint webinars and case studies',
      'Dedicated partner success manager',
      'Phone + email support SLA — 4 hours',
    ],
  },
  {
    name: 'Elite Partner',
    icon: Sparkles,
    color: 'border-purple-300',
    headerBg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badge: 'By Invitation',
    requirement: 'Refer 60+ clients / year',
    revenue: '35% recurring + bonuses',
    perks: [
      'Everything in Gold, plus:',
      'Custom white-label option',
      'Executive co-selling & deal registration',
      'Unlimited co-marketing budget',
      'Priority roadmap input & beta access',
      '24/7 dedicated phone support line',
    ],
  },
];

const benefits = [
  {
    icon: DollarSign,
    color: 'bg-green-500',
    title: 'Industry-Leading Commissions',
    desc: 'Earn 20–35% recurring revenue on every client you refer — for the lifetime of their subscription. Most partners recoup annual costs in week one.',
  },
  {
    icon: Users,
    color: 'bg-blue-500',
    title: 'White-Label Ready',
    desc: 'Gold and Elite partners can offer Webenablix as their own branded accessibility product — your logo, your domain, your pricing.',
  },
  {
    icon: FileText,
    color: 'bg-purple-500',
    title: 'Co-Branded Materials',
    desc: 'Proposal decks, one-pagers, case studies, and compliance reports — all co-branded and ready to send to your clients on day one.',
  },
  {
    icon: HeadphonesIcon,
    color: 'bg-orange-500',
    title: 'Dedicated Partner Support',
    desc: 'You get a named partner success manager, not a ticket queue. Fast answers before client calls, joint discovery sessions, and deal-closing support.',
  },
  {
    icon: BarChart3,
    color: 'bg-red-500',
    title: 'Partner Portal & Dashboard',
    desc: 'Track referrals, commissions, client health scores, and renewal dates from a single dashboard. Commission payouts every 30 days, no minimum.',
  },
  {
    icon: GraduationCap,
    color: 'bg-teal-500',
    title: 'Certification & Training',
    desc: 'Free WCAG and Webenablix certification courses for your whole team. Certified consultants command higher rates — we help you get there.',
  },
];

const useCases = [
  {
    icon: Globe,
    title: 'Web Design & Development Agencies',
    desc: 'Embed accessibility compliance into every project delivery. Offer it as a premium add-on or include it in your monthly retainer — either way, you earn recurring revenue.',
    tags: ['Recurring Revenue', 'Retainer Add-on', 'White-label'],
  },
  {
    icon: Briefcase,
    title: 'Digital Marketing Agencies',
    desc: 'Improve SEO performance and expand your service offering. Accessibility drives organic reach and positions you as a responsible partner for enterprise clients.',
    tags: ['SEO Uplift', 'Upsell', 'Enterprise Ready'],
  },
  {
    icon: Shield,
    title: 'Legal & Compliance Consultancies',
    desc: 'Pair your legal expertise with automated compliance tooling. Help clients achieve ADA, Section 508, and EN 301 549 compliance faster and more cost-effectively.',
    tags: ['ADA Compliance', 'Section 508', 'VPAT'],
  },
  {
    icon: Code,
    title: 'SaaS & Technology Resellers',
    desc: 'Bundle Webenablix into your existing platform stack or managed service offering. Joint billing, API integration, and OEM agreements available at Elite tier.',
    tags: ['OEM', 'API Integration', 'Bundling'],
  },
];

const steps = [
  { num: '01', title: 'Apply Online', desc: 'Fill in the partner application — takes under 5 minutes. We review and respond within one business day.' },
  { num: '02', title: 'Onboarding Call', desc: 'A 45-minute call with your partner success manager to set up your account, access the portal, and agree your go-to-market plan.' },
  { num: '03', title: 'Get Certified', desc: 'Complete the free Webenablix Partner Certification course — typically 2 hours. All team members can certify at no extra cost.' },
  { num: '04', title: 'Start Earning', desc: 'Share your unique referral link or co-sell with our team. Commissions are tracked live and paid every 30 days.' },
];

const testimonials = [
  {
    quote: "We added Webenablix to every web project 18 months ago. It's now our #1 upsell — almost every client takes it — and the recurring commissions have added $120K ARR to our business.",
    name: 'Rachel Kim',
    role: 'Managing Director',
    company: 'Brightblock Studio',
    initials: 'RK',
    bg: 'bg-blue-500',
    tier: 'Gold Partner',
  },
  {
    quote: "The white-label option let us launch our own accessibility product in two weeks. We now have 60 clients on it, and none of them know the infrastructure is Webenablix — that's exactly what we needed.",
    name: 'Tom Ashford',
    role: 'CEO',
    company: 'Digiterra Agency',
    initials: 'TA',
    bg: 'bg-purple-500',
    tier: 'Elite Partner',
  },
  {
    quote: "As a compliance consultancy, having an automated tool to back our recommendations has cut our audit time in half. The VPAT reports Webenablix generates are accepted by every government client we work with.",
    name: 'Sunita Patel',
    role: 'Principal Consultant',
    company: 'AccessFirst Legal',
    initials: 'SP',
    bg: 'bg-green-500',
    tier: 'Silver Partner',
  },
];

const faqs = [
  {
    q: 'Is there a cost to join the partner programme?',
    a: 'No. Joining is completely free at all tiers. There are no upfront fees, no minimum commitments, and no lock-in periods.',
  },
  {
    q: 'How are commissions calculated and paid?',
    a: 'You earn a percentage of the monthly or annual subscription fee paid by every client you refer, for as long as they remain a customer. Commissions are calculated on net revenue (after refunds) and paid monthly via bank transfer or Stripe.',
  },
  {
    q: 'Can I white-label the widget and reports?',
    a: 'White-labelling is available to Gold and Elite partners. You can use your own brand name, logo, colour scheme, and domain. Managed accessibility reports and VPAT documents can also be co-branded.',
  },
  {
    q: 'What counts as a referral?',
    a: 'Any new paying customer who signs up via your unique referral link, or is registered in the partner portal as a referred deal before the prospect speaks to our sales team.',
  },
  {
    q: 'Can I manage multiple client accounts from one login?',
    a: 'Yes. The partner portal includes a multi-account management view, so you can onboard clients, monitor their compliance scores, and manage renewals from a single dashboard.',
  },
  {
    q: 'Do you offer deal registration to protect my pipeline?',
    a: 'Yes — Gold and Elite partners can register deals to lock in a 90-day protected period, preventing conflicts with our direct sales team.',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <details className="group border border-gray-100 rounded-xl overflow-hidden" open={open}>
      <summary
        onClick={e => { e.preventDefault(); setOpen(!open); }}
        className="flex items-center justify-between px-6 py-5 cursor-pointer bg-white hover:bg-gray-50 transition-colors list-none"
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </summary>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </details>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const AgencyPage = () => (
  <div className="min-h-screen bg-white">
    <Header />

    {/* ── Hero ──────────────────────────────────────────────────────────────── */}
    <section className="relative bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#2563EB] overflow-hidden pt-24 pb-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
          <Award className="w-4 h-4 text-yellow-300" />
          Agency &amp; Reseller Partner Programme
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Grow your agency with<br />
          <span className="text-blue-200">accessibility revenue.</span>
        </h1>
        <p className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Earn 20–35% recurring commission, offer white-label accessibility to your clients, and become the compliance experts your market needs.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-3 h-auto text-base font-semibold shadow-xl">
            Apply to Partner <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-3 h-auto text-base font-semibold">
            Download Partner Guide <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Floating stat cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {[
            { value: '35%',     label: 'Max Recurring Commission' },
            { value: '500+',    label: 'Active Agency Partners' },
            { value: '$8,400',  label: 'Avg Annual Partner Earnings' },
            { value: '1 day',   label: 'Application Review Time' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 backdrop-blur px-6 py-7 text-center">
              <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-white/60 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Benefits ──────────────────────────────────────────────────────────── */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">Why Partner With Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to win client business</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We've built the programme around what agencies actually asked for — commissions that compound, tools that close deals, and support that's there when you need it.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(b => {
            const IC = b.icon;
            return (
              <div key={b.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all">
                <div className={`w-11 h-11 ${b.color} rounded-xl flex items-center justify-center mb-5`}>
                  <IC className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Partner Tiers ──────────────────────────────────────────────────────── */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">Partner Tiers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pick your level. Grow into the next.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">All tiers are free to join. You move up automatically as your referral volume grows.</p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {partnerTiers.map(tier => {
            const IC = tier.icon;
            return (
              <div key={tier.name} className={`bg-white rounded-2xl border-2 ${tier.color} overflow-hidden flex flex-col`}>
                {/* Header */}
                <div className={`${tier.headerBg} px-6 pt-6 pb-5 border-b border-gray-100 relative`}>
                  {tier.badge && (
                    <span className="absolute top-4 right-4 text-xs font-bold bg-[#2563EB] text-white px-2.5 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                  <div className={`w-10 h-10 ${tier.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                    <IC className={`w-5 h-5 ${tier.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{tier.name}</h3>
                  <p className="text-gray-500 text-xs">{tier.requirement}</p>
                </div>
                {/* Revenue highlight */}
                <div className="px-6 py-4 border-b border-gray-50 bg-white">
                  <p className="text-xs text-gray-400 mb-0.5">Commission</p>
                  <p className="font-bold text-[#2563EB] text-sm">{tier.revenue}</p>
                </div>
                {/* Perks */}
                <div className="px-6 py-5 flex-1">
                  <ul className="space-y-2.5">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm ${i === 0 && perk.startsWith('Everything') ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                        {!(i === 0 && perk.startsWith('Everything')) && (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl h-10 text-sm font-semibold">
                    Apply Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Who It's For ──────────────────────────────────────────────────────── */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">Who Partners With Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for agencies of every kind</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {useCases.map(uc => {
            const IC = uc.icon;
            return (
              <div key={uc.title} className="flex gap-5 bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#2563EB] hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IC className="w-6 h-6 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{uc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{uc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map(tag => (
                      <span key={tag} className="text-xs bg-blue-50 text-[#2563EB] font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── How It Works ──────────────────────────────────────────────────────── */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">Getting Started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Up and running in four steps</h2>
        </div>
        <div className="relative">
          {/* connector line */}
          <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gray-200 hidden md:block" />
          <div className="space-y-8">
            {steps.map(step => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-[#2563EB] text-white rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0 z-10 shadow-lg shadow-blue-100">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h3 className="font-bold text-gray-900 mb-1.5">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Testimonials ──────────────────────────────────────────────────────── */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">Partner Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What our partners say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex flex-col">
              <Quote className="w-8 h-8 text-[#2563EB]/20 mb-4" />
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.bg} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                </div>
                <span className="ml-auto text-xs font-semibold bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full whitespace-nowrap">{t.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#2563EB] font-semibold text-sm mb-3 uppercase tracking-wide">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner programme questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
        </div>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────────────────────────── */}
    <section className="py-20 bg-gradient-to-r from-[#0f2460] to-[#2563EB]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Award className="w-12 h-12 text-white/30 mx-auto mb-5" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join 500+ agency partners earning with Webenablix</h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Apply in 5 minutes. Approved in 1 business day. Start earning recurring commissions from your very first referral.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-full px-8 py-3 h-auto text-base font-semibold shadow-xl">
            Apply Now — It's Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-3 h-auto text-base font-semibold">
            Talk to Partner Team
          </Button>
        </div>
        <p className="text-white/40 text-xs mt-6">No fees · No minimums · No lock-in</p>
      </div>
    </section>

    <Footer />
  </div>
);

export default AgencyPage;
