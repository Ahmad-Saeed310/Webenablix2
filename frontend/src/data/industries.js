// Industry-specific page data for all 11 industry detail pages

export const industriesData = {
  government: {
    id: "government",
    name: "Government",
    tagline: "Digital services that serve every citizen",
    description:
      "Government websites are legally required to be accessible to all citizens, including those with disabilities. Non-compliance exposes agencies to ADA and Section 508 litigation while excluding millions from essential services.",
    heroGradient: "from-[#1e3a5f] via-[#1e40af] to-[#2563EB]",
    accentColor: "text-[#2563EB]",
    accentBg: "bg-[#2563EB]",
    icon: "Building",
    stats: [
      { value: "61M", label: "US adults with a disability" },
      { value: "4,600+", label: "ADA lawsuits filed annually" },
      { value: "$75K+", label: "Average ADA settlement cost" },
      { value: "20%", label: "Population with a disability" },
    ],
    regulations: [
      {
        name: "Section 508",
        desc: "Federal law requiring all government ICT to be accessible to people with disabilities.",
      },
      {
        name: "ADA Title II",
        desc: "Prohibits discrimination in state and local government programs and services.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The internationally recognised technical standard referenced by Section 508.",
      },
      {
        name: "CVAA",
        desc: "Communications and Video Accessibility Act covering digital communications.",
      },
    ],
    challenges: [
      {
        title: "Legacy infrastructure",
        desc: "Decades of legacy CMS platforms and custom-built portals that were never designed with accessibility in mind.",
      },
      {
        title: "Budget constraints",
        desc: "Limited IT budgets make full redesigns impractical — agencies need cost-effective compliance paths.",
      },
      {
        title: "Litigation risk",
        desc: "Federal agencies and municipalities face an increasing volume of ADA Title II demand letters and lawsuits.",
      },
      {
        title: "Staff awareness",
        desc: "Content authors and developers lack accessibility training, causing new violations with every update.",
      },
    ],
    solutions: [
      {
        title: "Automated compliance layer",
        desc: "Instantly remediate hundreds of WCAG violations across your site without touching a single line of underlying code.",
      },
      {
        title: "Section 508 audit & VPAT",
        desc: "Receive a full Voluntary Product Accessibility Template accepted by federal procurement teams.",
      },
      {
        title: "Ongoing monitoring",
        desc: "Catch new violations the moment they are published — before a citizen files a complaint.",
      },
      {
        title: "Staff training program",
        desc: "Role-tailored training helps content authors, developers, and procurement staff maintain compliance independently.",
      },
    ],
    testimonial: {
      quote:
        "After a Section 508 complaint we were facing a 6-month remediation timeline. Webenablix got us to full compliance in 5 weeks and the VPAT helped us close the case.",
      name: "Patricia Goldstein",
      role: "Chief Information Officer",
      org: "County Digital Services",
    },
    cta: {
      primary: "Request a Government Demo",
      secondary: "Download Section 508 Guide",
    },
  },

  banking: {
    id: "banking",
    name: "Banking",
    tagline: "Financial services accessible to everyone",
    description:
      "Banking and financial websites serve customers across every demographic. Inaccessible interfaces lock out millions of users with disabilities and expose institutions to mounting regulatory and litigation risk.",
    heroGradient: "from-[#0c2340] via-[#0e4d92] to-[#1a6bb5]",
    accentColor: "text-[#0e4d92]",
    accentBg: "bg-[#0e4d92]",
    icon: "Landmark",
    stats: [
      { value: "$8T", label: "Global assets at risk from non-compliance" },
      { value: "26%", label: "US adults with at least one disability" },
      { value: "#2", label: "Finance: 2nd most-sued sector for ADA" },
      { value: "72 h", label: "Average time to resolve with Webenablix" },
    ],
    regulations: [
      {
        name: "ADA Title III",
        desc: "Requires places of public accommodation — including online banking — to be accessible.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The technical standard underpinning ADA digital compliance.",
      },
      {
        name: "CFPB Guidance",
        desc: "Consumer Financial Protection Bureau guidance on inclusive digital access.",
      },
      {
        name: "FFIEC Guidance",
        desc: "Federal Financial Institutions Examination Council guidance on digital accessibility.",
      },
    ],
    challenges: [
      {
        title: "Complex transactional interfaces",
        desc: "Loan calculators, account dashboards, and payment flows are difficult to make accessible without breaking functionality.",
      },
      {
        title: "Third-party widgets",
        desc: "Chat bots, payment processors, and rate tables introduced by vendors often fail accessibility standards.",
      },
      {
        title: "Regulatory scrutiny",
        desc: "CFPB and OCC are increasingly examining digital accessibility as part of fair-lending reviews.",
      },
      {
        title: "Multi-brand portfolios",
        desc: "Large banks manage dozens of microsites and subsidiary brands — each needing independent compliance.",
      },
    ],
    solutions: [
      {
        title: "Transactional UI remediation",
        desc: "Our experts specialise in making complex financial interfaces — forms, calculators, tables — fully keyboard and screen-reader accessible.",
      },
      {
        title: "Third-party widget scanning",
        desc: "Identify and flag accessibility failures in embedded third-party components, with recommended vendor alternatives.",
      },
      {
        title: "Multi-site monitoring",
        desc: "Monitor every brand and subsidiary from a single dashboard with consolidated compliance reporting.",
      },
      {
        title: "Regulatory documentation",
        desc: "VPAT and audit reports formatted for CFPB and OCC review processes.",
      },
    ],
    testimonial: {
      quote:
        "We operate 14 regional brands. Webenablix gave us one compliance dashboard and a single managed team — it cut our accessibility overhead by 60%.",
      name: "Robert Eames",
      role: "VP Digital Channels",
      org: "MidWest Financial Group",
    },
    cta: {
      primary: "Get a Banking Compliance Demo",
      secondary: "Download CFPB Readiness Guide",
    },
  },

  academic: {
    id: "academic",
    name: "Academic",
    tagline: "Inclusive education starts with accessible technology",
    description:
      "Universities, colleges, and K-12 institutions must ensure every student — regardless of ability — can access course materials, student portals, and administrative services. Federal law and accreditation standards demand it.",
    heroGradient: "from-[#14532d] via-[#166534] to-[#15803d]",
    accentColor: "text-[#166534]",
    accentBg: "bg-[#166534]",
    icon: "GraduationCap",
    stats: [
      { value: "19%", label: "Higher-ed students with a disability" },
      { value: "2x", label: "Growth in OCR complaints in 5 years" },
      { value: "$500K+", label: "Average OCR resolution agreement cost" },
      { value: "100%", label: "Title II coverage for public institutions" },
    ],
    regulations: [
      {
        name: "Section 504",
        desc: "Prohibits disability discrimination in any program receiving federal funding.",
      },
      {
        name: "ADA Title II & III",
        desc: "Covers public and private universities' digital services.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "Referenced in OCR resolution agreements as the required technical standard.",
      },
      {
        name: "IDEA",
        desc: "Individuals with Disabilities Education Act — accessibility obligations for K-12.",
      },
    ],
    challenges: [
      {
        title: "LMS & courseware",
        desc: "Learning management systems like Canvas and Blackboard host thousands of documents and videos that must meet accessibility standards.",
      },
      {
        title: "Student portal complexity",
        desc: "Registration, financial aid, and housing portals involve complex multi-step workflows that are hard to make accessible.",
      },
      {
        title: "Faculty-generated content",
        desc: "PDFs, slide decks, and videos uploaded by faculty are major sources of violations that no automated tool alone can fix.",
      },
      {
        title: "OCR complaint backlogs",
        desc: "The Office for Civil Rights receives thousands of higher-ed complaints annually, with resolution processes that can span years.",
      },
    ],
    solutions: [
      {
        title: "LMS content scanning",
        desc: "Deep-scan uploaded documents, videos, and course pages inside your LMS to surface violations before students encounter them.",
      },
      {
        title: "Portal remediation",
        desc: "Expert remediation of student-facing portals with specialised knowledge of Banner, PeopleSoft, and custom platforms.",
      },
      {
        title: "Faculty training",
        desc: "Self-paced, accredited training modules that teach faculty to create accessible content at the source.",
      },
      {
        title: "OCR response support",
        desc: "Audit documentation and remediation evidence packages formatted for OCR resolution agreements.",
      },
    ],
    testimonial: {
      quote:
        "An OCR complaint forced us to remediate our entire LMS. Webenablix delivered the audit, remediaton plan, and evidence package in time for our resolution conference.",
      name: "Dr. Angela Torres",
      role: "VP of Student Affairs",
      org: "Lakeside University",
    },
    cta: {
      primary: "Request an Education Demo",
      secondary: "Download OCR Compliance Guide",
    },
  },

  retail: {
    id: "retail",
    name: "Retail",
    tagline: "Every shopper deserves a seamless experience",
    description:
      "E-commerce and retail websites that are inaccessible turn away a $490B customer segment and attract ADA lawsuits. Webenablix helps retailers build accessible shopping journeys that convert — for every customer.",
    heroGradient: "from-[#7c2d12] via-[#c2410c] to-[#ea580c]",
    accentColor: "text-[#c2410c]",
    accentBg: "bg-[#c2410c]",
    icon: "ShoppingCart",
    stats: [
      { value: "$490B", label: "Spending power of US disabled consumers" },
      { value: "71%", label: "Disabled users leave inaccessible sites" },
      { value: "#1", label: "E-commerce: most-sued sector for ADA" },
      { value: "+12%", label: "Revenue uplift from accessible UX" },
    ],
    regulations: [
      {
        name: "ADA Title III",
        desc: "Places of public accommodation — including online stores — must be accessible.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The technical standard courts reference when adjudicating e-commerce ADA cases.",
      },
      {
        name: "CCPA / State Laws",
        desc: "Several state accessibility laws impose stricter requirements on consumer-facing digital products.",
      },
      {
        name: "Robles v. Domino's",
        desc: "Landmark ruling confirming ADA applies to commercial websites — cited in thousands of subsequent cases.",
      },
    ],
    challenges: [
      {
        title: "Product imagery & alt text",
        desc: "Thousands of product images with missing or inadequate alt text are among the most common e-commerce violations.",
      },
      {
        title: "Checkout flows",
        desc: "Multi-step checkout processes with dynamic form validation are a major source of keyboard and screen-reader failures.",
      },
      {
        title: "Third-party apps",
        desc: "Review widgets, chat tools, and recommendation engines from third-party apps often inject new violations.",
      },
      {
        title: "Flash sales & seasonal content",
        desc: "Fast-moving promotional content updated by marketing teams frequently introduces new accessibility failures.",
      },
    ],
    solutions: [
      {
        title: "Automated alt-text generation",
        desc: "AI-generated alt text for every product image — accurate, contextual, and ready for screen readers.",
      },
      {
        title: "Checkout accessibility audit",
        desc: "Specialised deep-dive on your checkout funnel to eliminate every keyboard trap and form error that blocks conversion.",
      },
      {
        title: "Continuous monitoring",
        desc: "Real-time scanning catches new violations introduced by marketing updates or third-party app changes the moment they go live.",
      },
      {
        title: "Shopify & BigCommerce integration",
        desc: "Native integrations for the most popular e-commerce platforms — deploy in minutes, not weeks.",
      },
    ],
    testimonial: {
      quote:
        "We received an ADA demand letter right before our peak season. Webenablix remediated our checkout in 10 days and our conversion rate for screen-reader users went up 18%.",
      name: "Naomi Park",
      role: "Head of E-Commerce",
      org: "Luxe & Co.",
    },
    cta: {
      primary: "Get a Retail Accessibility Demo",
      secondary: "Download E-Commerce Checklist",
    },
  },

  it: {
    id: "it",
    name: "IT",
    tagline: "Build accessibility into your digital DNA",
    description:
      "Technology companies — from SaaS platforms to enterprise software vendors — must embed accessibility throughout the development lifecycle to win enterprise deals, pass procurement reviews, and serve the broadest possible user base.",
    heroGradient: "from-[#312e81] via-[#4338ca] to-[#6366f1]",
    accentColor: "text-[#4338ca]",
    accentBg: "bg-[#4338ca]",
    icon: "Code",
    stats: [
      {
        value: "70%",
        label: "Enterprise RFPs now include accessibility requirements",
      },
      { value: "$1M+", label: "Lost deals from failed accessibility audits" },
      { value: "1.3B", label: "People globally with a disability" },
      {
        value: "40%",
        label: "Reduction in support tickets with accessible UI",
      },
    ],
    regulations: [
      {
        name: "WCAG 2.1 AA",
        desc: "The baseline standard for accessible web and mobile applications.",
      },
      {
        name: "Section 508",
        desc: "Required for any software sold to US federal agencies.",
      },
      {
        name: "EN 301 549",
        desc: "The European accessibility standard for ICT products and services.",
      },
      {
        name: "VPAT / ACR",
        desc: "Voluntary Product Accessibility Template — expected in most enterprise and government procurement.",
      },
    ],
    challenges: [
      {
        title: "Shifting UI components",
        desc: "Component libraries evolve rapidly; accessibility regressions slip in with every UI framework update or design system change.",
      },
      {
        title: "CI/CD integration",
        desc: "Accessibility testing needs to be embedded in the build pipeline — not bolted on as an afterthought.",
      },
      {
        title: "VPAT production",
        desc: "Enterprise deals require a current, accurate VPAT. Most dev teams lack the expertise to produce and maintain one.",
      },
      {
        title: "Mobile & SPAs",
        desc: "Single-page apps and mobile web present unique ARIA and focus-management challenges that automated tools miss.",
      },
    ],
    solutions: [
      {
        title: "CI/CD accessibility gates",
        desc: "REST API and GitHub Actions integration let you block deployments that introduce new WCAG violations automatically.",
      },
      {
        title: "Component library audit",
        desc: "Deep assessment of your design system components with developer-ready remediation code for every finding.",
      },
      {
        title: "VPAT production & maintenance",
        desc: "Our CPACC-certified experts produce and keep your VPAT current — including re-testing after major releases.",
      },
      {
        title: "SPA & mobile expertise",
        desc: "Specialised testing for React, Angular, Vue, and React Native applications with expert-authored remediation guidance.",
      },
    ],
    testimonial: {
      quote:
        "We were losing government deals because we couldn't produce an accurate VPAT. Webenablix fixed our app and maintains our VPAT — we've since won three federal contracts.",
      name: "David Chu",
      role: "VP of Engineering",
      org: "NovaTech SaaS",
    },
    cta: {
      primary: "Get a Developer Demo",
      secondary: "Download VPAT Template",
    },
  },

  healthcare: {
    id: "healthcare",
    name: "HealthCare",
    tagline: "Accessible healthcare is a fundamental right",
    description:
      "Healthcare providers, insurers, and health tech companies must ensure that every patient — including those with vision, hearing, motor, and cognitive disabilities — can access critical health information and services online.",
    heroGradient: "from-[#164e63] via-[#0e7490] to-[#06b6d4]",
    accentColor: "text-[#0e7490]",
    accentBg: "bg-[#0e7490]",
    icon: "HeartPulse",
    stats: [
      { value: "61M", label: "US adults with a disability need health access" },
      {
        value: "3x",
        label: "Higher unmet health needs for people with disabilities",
      },
      { value: "$250K", label: "Average OCR/HHS resolution cost" },
      { value: "100%", label: "ACA requires accessible patient portals" },
    ],
    regulations: [
      {
        name: "Section 504 / ACA",
        desc: "Prohibits disability discrimination in health programs receiving federal funding.",
      },
      {
        name: "ADA Title III",
        desc: "Applies to hospital websites, telehealth platforms, and health insurance portals.",
      },
      {
        name: "HIPAA Crossover",
        desc: "Accessible communication is a component of HIPAA's effective communication requirements.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "Referenced in HHS guidance as the required standard for patient-facing digital services.",
      },
    ],
    challenges: [
      {
        title: "Patient portal complexity",
        desc: "MyChart, Epic, and custom portals involve lab results, appointment scheduling, and medication management — each a potential accessibility minefield.",
      },
      {
        title: "Telehealth interfaces",
        desc: "Video consultation platforms must support captions, audio descriptions, and keyboard-only navigation for patients with disabilities.",
      },
      {
        title: "PDF health documents",
        desc: "Discharge summaries, informed consent forms, and benefit explanations are often inaccessible PDFs.",
      },
      {
        title: "Emergency information",
        desc: "Crisis and emergency health pages must be accessible to all users under all conditions.",
      },
    ],
    solutions: [
      {
        title: "Patient portal accessibility audit",
        desc: "Comprehensive audit of Epic, Cerner, and custom patient portals with remediation guidance tailored to healthcare workflows.",
      },
      {
        title: "Document accessibility",
        desc: "Remediate PDF health documents, forms, and consent materials to WCAG PDF Techniques standards.",
      },
      {
        title: "Telehealth compliance",
        desc: "Ensure video platforms, chat interfaces, and appointment scheduling meet WCAG 2.1 AA for all disability types.",
      },
      {
        title: "HHS/OCR documentation",
        desc: "Produce audit evidence and corrective action logs formatted for HHS Office for Civil Rights review.",
      },
    ],
    testimonial: {
      quote:
        "An HHS complaint about our patient portal forced a top-to-bottom remediation. Webenablix delivered in six weeks — the fastest our compliance team had ever seen.",
      name: "Dr. James Okafor",
      role: "Chief Digital Health Officer",
      org: "MedFirst Health System",
    },
    cta: {
      primary: "Request a Healthcare Demo",
      secondary: "Download HHS Compliance Guide",
    },
  },

  automotive: {
    id: "automotive",
    name: "Automotive",
    tagline: "Every driver deserves access to your digital showroom",
    description:
      "Automotive brands, dealerships, and fleet operators rely on digital experiences to drive sales, service bookings, and brand loyalty. Inaccessible configurators and dealer portals exclude millions and attract litigation.",
    heroGradient: "from-[#1c1917] via-[#44403c] to-[#78716c]",
    accentColor: "text-[#57534e]",
    accentBg: "bg-[#57534e]",
    icon: "Car",
    stats: [
      { value: "6M+", label: "US adults with adaptive driving needs" },
      { value: "40%", label: "Car research happens solely online" },
      { value: "$30B", label: "Market of adaptive vehicle buyers" },
      {
        value: "3x",
        label: "Conversion uplift with accessible chat & configurators",
      },
    ],
    regulations: [
      {
        name: "ADA Title III",
        desc: "Online dealerships and manufacturer websites must be accessible to people with disabilities.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The technical baseline referenced in automotive ADA consent decrees.",
      },
      {
        name: "EU Web Accessibility Directive",
        desc: "Affects European automotive brands' dealer network sites.",
      },
      {
        name: "CVAA",
        desc: "Communications and Video Accessibility Act — relevant to connected-vehicle apps and entertainment systems.",
      },
    ],
    challenges: [
      {
        title: "Vehicle configurators",
        desc: "Interactive 3D configurators with colour pickers and trim selectors are nearly always inaccessible to keyboard and screen-reader users.",
      },
      {
        title: "Dealer network scale",
        desc: "OEMs managing hundreds of dealer microsites face enormous complexity in keeping every local site compliant.",
      },
      {
        title: "Finance calculators",
        desc: "Complex payment and lease calculators are frequent sources of keyboard trap and labelling violations.",
      },
      {
        title: "Live chat & chatbots",
        desc: "AI-powered sales chat tools frequently fail keyboard and screen-reader accessibility requirements.",
      },
    ],
    solutions: [
      {
        title: "Configurator accessibility",
        desc: "Expert remediation of interactive vehicle configurators — including canvas-based and WebGL components — to WCAG standards.",
      },
      {
        title: "Dealer network monitoring",
        desc: "Central dashboard to monitor compliance across every dealer microsite with automated alerts and bulk reporting.",
      },
      {
        title: "Finance tool auditing",
        desc: "Deep-dive audit and fix of payment calculators, trade-in tools, and lease comparison widgets.",
      },
      {
        title: "Multi-market compliance",
        desc: "Support for WCAG, Section 508, EU Web Accessibility Directive, and EN 301 549 from a single platform.",
      },
    ],
    testimonial: {
      quote:
        "We have 320 dealer websites. Before Webenablix, compliance was a manual nightmare. Now we have one dashboard, one report, and every dealer site is green.",
      name: "Stefan Bauer",
      role: "Head of Digital Retail",
      org: "NordAuto Group",
    },
    cta: {
      primary: "Get an Automotive Demo",
      secondary: "Download Dealer Network Guide",
    },
  },

  "real-estate": {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Accessible listings reach every buyer and renter",
    description:
      "Real estate platforms, brokerages, and property management companies must ensure that every prospective buyer, renter, or homeowner can access listings, apply for properties, and communicate with agents — regardless of disability.",
    heroGradient: "from-[#14532d] via-[#15803d] to-[#16a34a]",
    accentColor: "text-[#15803d]",
    accentBg: "bg-[#15803d]",
    icon: "Home",
    stats: [
      {
        value: "54M",
        label: "US adults with a disability are potential renters/buyers",
      },
      { value: "82%", label: "Home search now starts online" },
      { value: "$95K", label: "Average Fair Housing + ADA settlement" },
      {
        value: "3.5x",
        label: "Wider addressable market with accessible listings",
      },
    ],
    regulations: [
      {
        name: "Fair Housing Act",
        desc: "Prohibits discrimination in housing services — increasingly applied to digital real estate platforms.",
      },
      {
        name: "ADA Title III",
        desc: "Real estate websites and portals must be accessible to people with disabilities.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The accepted technical standard for real estate digital accessibility compliance.",
      },
      {
        name: "HUD Guidance",
        desc: "HUD interprets Fair Housing Act obligations to include accessible digital advertising and portals.",
      },
    ],
    challenges: [
      {
        title: "Interactive maps",
        desc: "Neighbourhood maps and search filters built with Mapbox or Google Maps are notoriously difficult to make keyboard accessible.",
      },
      {
        title: "Photo-heavy listings",
        desc: "Gallery-heavy property listings with missing or inadequate alt text exclude screen-reader users.",
      },
      {
        title: "Application forms",
        desc: "Multi-step rental and mortgage application forms are major sources of labelling and error-handling violations.",
      },
      {
        title: "Virtual tours",
        desc: "3D and video virtual tours require audio descriptions and keyboard controls to meet accessibility standards.",
      },
    ],
    solutions: [
      {
        title: "Map accessibility remediation",
        desc: "Make property search maps keyboard-navigable with text-based alternatives and accessible filter controls.",
      },
      {
        title: "AI alt-text for listing photos",
        desc: "Automatically generate descriptive alt text for every property photo — at scale, across your entire listings database.",
      },
      {
        title: "Application form audit",
        desc: "Remove every keyboard trap and missing label from rental and mortgage application flows.",
      },
      {
        title: "Virtual tour captions",
        desc: "Add auto-generated captions and audio descriptions to video tours to meet WCAG 1.2 media requirements.",
      },
    ],
    testimonial: {
      quote:
        "A Fair Housing complaint about our rental portal was a wake-up call. Webenablix fixed our map search and application flow — and the complaint was dropped within 30 days.",
      name: "Claudia Reyes",
      role: "Chief Technology Officer",
      org: "OpenDoor Properties",
    },
    cta: {
      primary: "Get a Real Estate Demo",
      secondary: "Download Fair Housing Digital Guide",
    },
  },

  ngo: {
    id: "ngo",
    name: "NGO / NPO",
    tagline: "Serve every member of your community",
    description:
      "Nonprofits and NGOs advocate for the most vulnerable populations — yet their own websites often fail the very people they serve. Webenablix helps mission-driven organisations achieve full compliance affordably.",
    heroGradient: "from-[#4a044e] via-[#7e22ce] to-[#9333ea]",
    accentColor: "text-[#7e22ce]",
    accentBg: "bg-[#7e22ce]",
    icon: "Heart",
    stats: [
      { value: "15%", label: "Nonprofit websites meet basic accessibility" },
      { value: "1 in 4", label: "US adults has a disability" },
      { value: "$0", label: "Cost of ADA complaints regardless of org size" },
      {
        value: "+34%",
        label: "Donation uplift from accessible donation forms",
      },
    ],
    regulations: [
      {
        name: "ADA Title III",
        desc: "Applies to nonprofits operating places of public accommodation — including their websites.",
      },
      {
        name: "Section 504",
        desc: "Nonprofits receiving federal grants must have accessible digital programs and services.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The technical standard referenced in ADA consent decrees affecting the nonprofit sector.",
      },
      {
        name: "State Charity Laws",
        desc: "Several states impose additional accessibility requirements on charities soliciting online donations.",
      },
    ],
    challenges: [
      {
        title: "Limited budgets",
        desc: "Nonprofits cannot afford lengthy, expensive audits or full website redesigns — they need affordable, targeted solutions.",
      },
      {
        title: "Donation flows",
        desc: "Inaccessible donation forms, payment widgets, and CRM integrations cost nonprofits significant fundraising revenue.",
      },
      {
        title: "Volunteer-built sites",
        desc: "Many nonprofit sites were built by volunteers using templates — resulting in deep-rooted structural violations.",
      },
      {
        title: "Event & programme content",
        desc: "Constantly updated programme pages, newsletters, and event listings introduce recurring violations.",
      },
    ],
    solutions: [
      {
        title: "Nonprofit pricing program",
        desc: "Special pricing for qualifying 501(c)(3) organisations — full compliance without stretching your budget.",
      },
      {
        title: "Donation form remediation",
        desc: "Make your donation flow and peer-to-peer fundraising pages fully keyboard and screen-reader accessible to maximise giving.",
      },
      {
        title: "CMS training for volunteers",
        desc: "Train volunteer content teams to maintain accessible content in WordPress, Squarespace, and Wix.",
      },
      {
        title: "Grant compliance documentation",
        desc: "Audit reports and corrective action plans formatted for federal grant compliance reviews.",
      },
    ],
    testimonial: {
      quote:
        "As a disability advocacy org, our own website failing accessibility was embarrassing. Webenablix fixed everything quickly and their nonprofit pricing made it possible.",
      name: "Fatima Al-Hassan",
      role: "Executive Director",
      org: "InclusionFirst Foundation",
    },
    cta: {
      primary: "Apply for Nonprofit Pricing",
      secondary: "Download Grants Compliance Brief",
    },
  },

  media: {
    id: "media",
    name: "Media & Entertainment",
    tagline: "Great content should be for everyone",
    description:
      "Streaming platforms, publishers, broadcasters, and entertainment brands must ensure their content is accessible to audiences with visual, hearing, motor, and cognitive disabilities — both legally and as a matter of audience growth.",
    heroGradient: "from-[#450a0a] via-[#991b1b] to-[#dc2626]",
    accentColor: "text-[#991b1b]",
    accentBg: "bg-[#991b1b]",
    icon: "Tv",
    stats: [
      { value: "466M", label: "People globally with disabling hearing loss" },
      { value: "253M", label: "People globally with visual impairment" },
      { value: "80%", label: "Caption users are not deaf — captions help all" },
      { value: "+15%", label: "Audience growth from accessible content" },
    ],
    regulations: [
      {
        name: "CVAA",
        desc: "Communications and Video Accessibility Act — requires captions and audio descriptions on online video.",
      },
      {
        name: "ADA Title III",
        desc: "Streaming services and media websites must be accessible to people with disabilities.",
      },
      {
        name: "FCC Regulations",
        desc: "FCC rules for captioning quality, timing, and completeness apply to online video platforms.",
      },
      {
        name: "WCAG 1.2",
        desc: "WCAG time-based media criteria require captions, audio descriptions, and transcripts.",
      },
    ],
    challenges: [
      {
        title: "Video captioning at scale",
        desc: "Streaming libraries with thousands of hours of content require automated captioning that meets FCC accuracy standards.",
      },
      {
        title: "Player accessibility",
        desc: "Custom video players often lack keyboard controls, accessible volume/seek bars, and screen-reader-compatible controls.",
      },
      {
        title: "Dynamic content",
        desc: "Live tickers, autoplay carousels, and push notifications frequently violate WCAG motion and pause criteria.",
      },
      {
        title: "App & Smart TV interfaces",
        desc: "Native apps and Smart TV interfaces require accessible focus management and remote-control navigation.",
      },
    ],
    solutions: [
      {
        title: "AI captioning & transcription",
        desc: "FCC-grade automated captions and transcripts generated for your entire video library in hours, not months.",
      },
      {
        title: "Video player audit",
        desc: "Full WCAG 2.1 audit of your video player with developer-ready fixes for every keyboard and screen-reader issue.",
      },
      {
        title: "CMS content scanning",
        desc: "Continuously scan published articles, galleries, and live feeds for missing alt text, contrast failures, and motion violations.",
      },
      {
        title: "App accessibility testing",
        desc: "Specialised testing for iOS, Android, and Smart TV apps with WCAG and platform-specific standard coverage.",
      },
    ],
    testimonial: {
      quote:
        "We had 40,000 hours of content with no captions. Webenablix's AI captioning got us FCC-compliant in two months. We also discovered our player was completely keyboard-inaccessible — that's fixed too.",
      name: "Marcus Layne",
      role: "Chief Product Officer",
      org: "StreamNation",
    },
    cta: {
      primary: "Get a Media Compliance Demo",
      secondary: "Download CVAA Compliance Guide",
    },
  },

  "law-enforcement": {
    id: "law-enforcement",
    name: "Law Enforcement",
    tagline: "Public safety services must be accessible to all",
    description:
      "Police departments, emergency services, and criminal justice agencies have a fundamental obligation to ensure that every citizen — including those with disabilities — can access public safety information, report crimes, and interact with services online.",
    heroGradient: "from-[#1e1b4b] via-[#3730a3] to-[#4f46e5]",
    accentColor: "text-[#3730a3]",
    accentBg: "bg-[#3730a3]",
    icon: "Shield",
    stats: [
      { value: "100%", label: "Public agencies covered by ADA Title II" },
      {
        value: "43M",
        label: "US adults potentially affected by inaccessible police services",
      },
      { value: "$200K+", label: "Average DOJ resolution agreement cost" },
      { value: "24/7", label: "Emergency info must always be accessible" },
    ],
    regulations: [
      {
        name: "ADA Title II",
        desc: "State and local government agencies — including law enforcement — must provide accessible services.",
      },
      {
        name: "Section 508",
        desc: "Federal law enforcement agencies must comply with Section 508 for all ICT.",
      },
      {
        name: "DOJ Guidance",
        desc: "DOJ has issued specific guidance on web accessibility obligations for law enforcement agencies.",
      },
      {
        name: "WCAG 2.1 AA",
        desc: "The technical standard underpinning DOJ and ADA Title II compliance expectations.",
      },
    ],
    challenges: [
      {
        title: "Emergency & alert pages",
        desc: "Public safety alerts, missing person notices, and emergency instructions must be accessible at all times — especially under high traffic.",
      },
      {
        title: "Online crime reporting",
        desc: "Crime reporting portals and tip-line forms are frequently inaccessible to blind, deaf, or motor-impaired citizens.",
      },
      {
        title: "Video evidence & body-cam portals",
        desc: "Public-facing portals providing access to body-camera footage require captions and accessible video controls.",
      },
      {
        title: "Legacy CAD & records systems",
        desc: "Purpose-built public-facing portals for warrants, sex offender registries, and inmate locators often predate modern accessibility standards.",
      },
    ],
    solutions: [
      {
        title: "Emergency page prioritisation",
        desc: "Immediate audit and remediation of critical public safety pages — alerts, emergency contacts, and crisis information first.",
      },
      {
        title: "Online reporting form accessibility",
        desc: "Make crime reporting, tip-line, and victim services forms fully accessible to keyboard, screen-reader, and voice-input users.",
      },
      {
        title: "Video portal captioning",
        desc: "Automated captions and accessible player controls for body-cam and public meeting video portals.",
      },
      {
        title: "DOJ compliance documentation",
        desc: "Produce audit evidence, corrective action plans, and accessibility statements formatted for DOJ resolution processes.",
      },
    ],
    testimonial: {
      quote:
        "After a DOJ inquiry we needed to remediate our entire public web presence in 90 days. Webenablix prioritised our highest-risk pages and got us to compliance on time with full documentation.",
      name: "Chief William Torres",
      role: "Director of Communications",
      org: "Metro Police Department",
    },
    cta: {
      primary: "Request a Public Safety Demo",
      secondary: "Download DOJ Compliance Guide",
    },
  },
};

export const industryList = Object.values(industriesData);
