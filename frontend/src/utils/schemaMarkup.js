/**
 * Utility function to inject JSON-LD schema markup into document head
 * @param {Object} schema - JSON-LD schema object
 * @param {string} id - Unique identifier for the script tag
 */
export const injectSchema = (schema, id) => {
  // Remove existing script if it exists
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  // Create and inject new script
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    // Cleanup function
    const element = document.getElementById(id);
    if (element) element.remove();
  };
};

/**
 * Main Organization Schema - Site-wide organization info
 * Optimized for Google Knowledge Graph and local search ranking
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webenablix",
  url: "https://www.webenablix.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.webenablix.com/logo.svg",
    width: 280,
    height: 60,
  },
  image: "https://www.webenablix.com/og-image.png",
  description:
    "AI-powered web accessibility compliance platform helping businesses navigate ADA & WCAG compliance with automated scanning, monitoring, and fixes",
  foundingDate: "2023-01-01",
  knowsAbout: [
    "Web Accessibility",
    "WCAG 2.1 Compliance",
    "ADA Compliance",
    "Accessibility Audits",
    "Web Accessibility Tools",
    "Inclusive Design",
  ],
  sameAs: [
    "https://twitter.com/webenablix",
    "https://linkedin.com/company/webenablix",
    "https://github.com/webenablix",
    "https://www.facebook.com/webenablix",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@webenablix.com",
      availableLanguage: "en",
      contactOption: "TollFree",
      areaServed: "US",
    },
    {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "sales@webenablix.com",
      availableLanguage: "en",
      areaServed: "Worldwide",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tech Hub, Innovation District",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94102",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2850",
    bestRating: "5",
    worstRating: "1",
  },
};

/**
 * HomePage Schema - Comprehensive WebPage schema for homepage
 * Optimized for featured snippets and rich results
 */
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix - Web Accessibility Compliance Tool",
  url: "https://www.webenablix.com",
  description:
    "Navigate ADA & WCAG compliance with ease. Webenablix helps websites become accessible to everyone with automated scanning, monitoring, and AI-powered fixes.",
  image: {
    "@type": "ImageObject",
    url: "https://www.webenablix.com/hero-image.png",
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
  datePublished: "2023-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  isPartOf: {
    "@type": "WebSite",
    name: "Webenablix",
    url: "https://www.webenablix.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.webenablix.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Webenablix Accessibility Platform",
    description:
      "All-in-one web accessibility compliance and monitoring platform",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.webenablix.com/checker?url={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    {
      "@type": "Action",
      name: "Start Free Audit",
      target: "https://www.webenablix.com/products/audit",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2500",
  },
};

/**
 * Product Schema - For Products section
 * Multiple products with rich snippet data
 */
export const productSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Webenablix Scanner - Automated Accessibility Audits",
    description:
      "Automatically scan and identify web accessibility issues across your entire website with AI-powered analysis",
    image: "https://www.webenablix.com/products/scanner.png",
    brand: {
      "@type": "Brand",
      name: "Webenablix",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/audit",
      description: "Free accessibility scanner available now",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Happy Customer",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: "Saved us hundreds of hours finding accessibility issues",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Webenablix Widget - Visitor Accessibility Controls",
    description:
      "Embed powerful accessibility features directly into your website to empower users",
    image: "https://www.webenablix.com/products/widget.png",
    brand: {
      "@type": "Brand",
      name: "Webenablix",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "950",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/widget",
      description: "Free widget with custom enterprise options",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Webenablix Monitor - Continuous Accessibility Monitoring",
    description:
      "Monitor accessibility compliance over time and get alerted to new issues automatically",
    image: "https://www.webenablix.com/products/monitor.png",
    brand: {
      "@type": "Brand",
      name: "Webenablix",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "750",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/monitor",
      description: "Continuous monitoring starts at $99/month",
    },
  },
];

/**
 * SoftwareApplication Schema - For accessibility widget/tools
 * Optimized for app rich results
 */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Webenablix Accessibility Platform",
  applicationCategory: "Utility",
  description:
    "All-in-one platform for web accessibility compliance, monitoring, and fixes powered by AI",
  image: {
    "@type": "ImageObject",
    url: "https://www.webenablix.com/app-screenshot.png",
    width: 1200,
    height: 800,
  },
  operatingSystem: "Web",
  softwareRequirements: "Modern browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Free tier available with premium options",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2650",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Enterprise Client",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Best accessibility solution we have found. Exceptional support and continuous improvements.",
    },
  ],
  featureList: [
    "Automated accessibility scanning",
    "WCAG 2.1 & ADA compliance checking",
    "AI-powered fix recommendations",
    "Real-time monitoring & alerts",
    "Accessibility widget for users",
    "Detailed compliance reports",
  ],
  downloadUrl: "https://www.webenablix.com/install",
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
};

/**
 * FAQPage Schema - For FAQ section
 * Optimized for FAQ rich results in search
 */
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Webenablix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix is a comprehensive AI-powered accessibility platform that automatically scans websites for WCAG 2.1 and ADA compliance issues, monitors accessibility over time, and provides AI-powered recommendations and fixes to make your website accessible to everyone.",
      },
    },
    {
      "@type": "Question",
      name: "How does Webenablix work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix uses advanced artificial intelligence and machine learning algorithms to scan your website, identify accessibility issues, categorize them by severity, and provide AI-powered recommendations and fixes. Implementation is quick and easy - just add a single line of JavaScript code to start getting results.",
      },
    },
    {
      "@type": "Question",
      name: "What accessibility standards does Webenablix support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix fully supports WCAG 2.1 Level AA, WCAG 2.2, Section 508 of the Americans with Disabilities Act (ADA), and EN 301 549 European Accessibility Standard with continuous updates as compliance standards evolve.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to implement Webenablix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most websites can be set up with Webenablix in under 5 minutes by embedding a single line of JavaScript code. We also provide dedicated implementation support for complex websites and custom requirements at no extra charge.",
      },
    },
    {
      "@type": "Question",
      name: "Can Webenablix automatically fix accessibility issues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Webenablix uses AI to both identify accessibility issues and generate automated fixes. Our AI-powered recommendation engine analyzes issues and suggests fixes that developers can implement or apply automatically where appropriate.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free version of Webenablix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Webenablix offers a free tier including unlimited website scans, basic accessibility audits, and access to our accessibility widget. Premium features and continuous monitoring are available on paid plans starting at $99/month.",
      },
    },
  ],
};

/**
 * BreadcrumbList Schema - For navigation hierarchy
 */
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.webenablix.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: "https://www.webenablix.com/products",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Industries",
      item: "https://www.webenablix.com/industries",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Resources",
      item: "https://www.webenablix.com/docs",
    },
  ],
};

/**
 * Service Schema - For accessibility compliance services
 * Optimized for local/service search results
 */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Accessibility Compliance Services",
  image: "https://www.webenablix.com/service-hero.png",
  description:
    "Complete web accessibility compliance services including automated scanning, monitoring, remediation support, and ongoing compliance management",
  provider: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  serviceType: [
    "Web Accessibility Audit",
    "WCAG 2.1 Compliance",
    "ADA Compliance",
    "Accessibility Testing",
    "Accessibility Monitoring",
    "Accessibility Remediation",
    "Compliance Reporting",
  ],
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "Country",
      name: "Canada",
    },
    {
      "@type": "Country",
      name: "United Kingdom",
    },
    {
      "@type": "Country",
      name: "European Union",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "780",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Accessibility Solutions",
    itemListElement: [
      {
        "@type": "Product",
        name: "Accessibility Scanner",
        description: "Automated website accessibility scanning",
        url: "https://www.webenablix.com/products/audit",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "0",
        },
      },
      {
        "@type": "Product",
        name: "Accessibility Widget",
        description: "Visitor accessibility controls and tools",
        url: "https://www.webenablix.com/products/widget",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "0",
        },
      },
      {
        "@type": "Product",
        name: "Continuous Monitoring",
        description: "Ongoing accessibility monitoring and alerts",
        url: "https://www.webenablix.com/products/monitor",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "99",
        },
      },
      {
        "@type": "Product",
        name: "Managed Accessibility",
        description: "Full-service accessibility management",
        url: "https://www.webenablix.com/products/managed",
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "499",
        },
      },
    ],
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://www.webenablix.com",
    availableLanguage: "en",
  },
};

/**
 * LocalBusiness Schema - For local presence
 * Optimized for Google Local Business listing
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Webenablix",
  image: "https://www.webenablix.com/logo.svg",
  url: "https://www.webenablix.com",
  description: "Web accessibility compliance and monitoring platform",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tech Hub, Innovation District",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94102",
    addressCountry: "US",
  },
  telephone: "+1-800-WEB-ABLE",
  email: "support@webenablix.com",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2850",
    bestRating: "5",
  },
};

/**
 * Article Schema - For blog content
 * Use when rendering blog posts
 */
export const createArticleSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.description,
    image: post.image || "https://www.webenablix.com/blog-default.png",
    datePublished: post.publishedDate || new Date().toISOString(),
    dateModified: post.updatedDate || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Webenablix Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Webenablix",
      logo: {
        "@type": "ImageObject",
        url: "https://www.webenablix.com/logo.svg",
        width: 280,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      url: post.url || `https://www.webenablix.com/blog/${post.slug}`,
    },
  };
};

/**
 * Enhanced BreadcrumbList Schema - For navigation hierarchy
 * Optimized for breadcrumb rich results
 */
// export const breadcrumbSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'BreadcrumbList',
//   'itemListElement': [
//     {
//       '@type': 'ListItem',
//       'position': 1,
//       'name': 'Home',
//       'item': 'https://www.webenablix.com'
//     },
//     {
//       '@type': 'ListItem',
//       'position': 2,
//       'name': 'Products',
//       'item': 'https://www.webenablix.com/products',
//       'description': 'Accessibility tools and solutions'
//     },
//     {
//       '@type': 'ListItem',
//       'position': 3,
//       'name': 'Industries',
//       'item': 'https://www.webenablix.com/industries',
//       'description': 'Industry-specific accessibility solutions'
//     },
//     {
//       '@type': 'ListItem',
//       'position': 4,
//       'name': 'Resources',
//       'item': 'https://www.webenablix.com/docs',
//       'description': 'Documentation and support'
//     },
//     {
//       '@type': 'ListItem',
//       'position': 5,
//       'name': 'Pricing',
//       'item': 'https://www.webenablix.com/pricing',
//       'description': 'Transparent pricing plans'
//     }
//   ]
// };

/**
 * StructuredData Helper - Combine multiple schemas
 * For rich snippets and knowledge graph
 */
export const createCombinedSchema = (schemas) => {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE-SPECIFIC SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * PRICING PAGE SCHEMA
 * Optimized for pricing comparison and dynamic rich results
 */
export const pricingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix Pricing Plans",
  url: "https://www.webenablix.com/pricing",
  description:
    "Transparent pricing plans for web accessibility compliance. Choose from Basic, Professional, or Enterprise plans.",
  image: "https://www.webenablix.com/pricing-hero.png",
  mainEntity: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    offers: [
      {
        "@type": "Offer",
        name: "Basic Protection",
        price: "12",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description:
          "Automated accessibility scanning and monitoring for small websites",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "99",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description:
          "Advanced monitoring, team collaboration, and detailed reports",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "0",
        priceCurrency: "USD",
        description: "Custom solutions with dedicated support and SLA",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

/**
 * PRODUCTS PAGE SCHEMA
 * Optimized for product collection and discovery
 */
export const productsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Webenablix Products",
  url: "https://www.webenablix.com/products",
  description:
    "Comprehensive accessibility solutions including Free Checker, Widget, Scanner, Monitor, and Managed Services",
  image: "https://www.webenablix.com/products-hero.png",
  mainEntity: [
    {
      "@type": "Product",
      name: "Free Accessibility Checker",
      description: "Free WCAG and ADA compliance checker for any website",
      url: "https://www.webenablix.com/products/checker",
      image: "https://www.webenablix.com/products/checker.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "3500",
      },
    },
    {
      "@type": "Product",
      name: "Accessibility Widget",
      description:
        "Embed powerful accessibility controls directly into your website",
      url: "https://www.webenablix.com/products/widget",
      image: "https://www.webenablix.com/products/widget.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2100",
      },
    },
    {
      "@type": "Product",
      name: "Accessibility Scanner",
      description: "Automated scanning and detailed accessibility reports",
      url: "https://www.webenablix.com/products/audit",
      image: "https://www.webenablix.com/products/scanner.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1800",
      },
    },
    {
      "@type": "Product",
      name: "Accessibility Monitor",
      description: "Continuous monitoring with automated alerts and reporting",
      url: "https://www.webenablix.com/products/monitor",
      image: "https://www.webenablix.com/products/monitor.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "950",
      },
    },
  ],
};

/**
 * ABOUT PAGE SCHEMA
 * Optimized for company/organization knowledge
 */
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Webenablix",
  url: "https://www.webenablix.com/about",
  description:
    "Learn about Webenablix mission, team, values, and our commitment to web accessibility",
  image: "https://www.webenablix.com/about-hero.png",
  mainEntity: {
    "@type": "Organization",
    name: "Webenablix",
    description: "Leading AI-powered web accessibility compliance platform",
    foundingDate: "2023-01-01",
    foundingLocation: {
      "@type": "Place",
      name: "San Francisco, California, USA",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "150",
    },
    knowsAbout: [
      "Web Accessibility",
      "WCAG Compliance",
      "ADA Compliance",
      "Inclusive Design",
      "AI Technology",
    ],
    award: [
      "Most Innovative Accessibility Solution 2024",
      "Best Web Accessibility Tool 2023",
    ],
    sameAs: [
      "https://twitter.com/webenablix",
      "https://linkedin.com/company/webenablix",
      "https://github.com/webenablix",
    ],
  },
};

/**
 * INDUSTRIES PAGE SCHEMA
 * Optimized for industry categories and discovery
 */
export const industriesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Industries We Serve",
  url: "https://www.webenablix.com/industries",
  description:
    "Accessibility solutions tailored for every industry - Government, Finance, Healthcare, Education, Retail, and more",
  image: "https://www.webenablix.com/industries-hero.png",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Government & Public Sector",
        description: "Section 508 and ADA compliance for government websites",
        url: "https://www.webenablix.com/industries/government",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Financial Services",
        description: "WCAG 2.1 AA compliance for banking and finance",
        url: "https://www.webenablix.com/industries/finance",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Healthcare",
        description: "HIPAA and WCAG compliant healthcare websites",
        url: "https://www.webenablix.com/industries/healthcare",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Education",
        description: "Accessible platforms for students and educators",
        url: "https://www.webenablix.com/industries/education",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Retail & E-commerce",
        description: "Inclusive shopping experiences for all customers",
        url: "https://www.webenablix.com/industries/retail",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Hospitality",
        description: "Accessible booking and travel platforms",
        url: "https://www.webenablix.com/industries/hospitality",
      },
    ],
  },
};

/**
 * INSTALLATIONS PAGE SCHEMA
 * Optimized for platform integration discovery
 */
export const installationsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Installation Options",
  url: "https://www.webenablix.com/installation",
  description:
    "Seamless integration with all major platforms and frameworks - React, Next.js, Vue, Angular, WordPress, Shopify, and more",
  image: "https://www.webenablix.com/installation-hero.png",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "React Installation",
        description: "Install Webenablix in React applications",
        url: "https://www.webenablix.com/docs/react",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Next.js Installation",
        description: "Next.js framework integration guide",
        url: "https://www.webenablix.com/docs/nextjs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "WordPress Installation",
        description: "WordPress plugin for accessibility",
        url: "https://www.webenablix.com/docs/wordpress",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Shopify Installation",
        description: "Shopify app for e-commerce accessibility",
        url: "https://www.webenablix.com/docs/shopify",
      },
    ],
  },
};

/**
 * DOCS PAGE SCHEMA
 * Optimized for documentation and knowledge base
 */
export const docsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Documentation & Guides",
  url: "https://www.webenablix.com/docs",
  description:
    "Comprehensive documentation, API references, guides, and tutorials for Webenablix platform",
  image: "https://www.webenablix.com/docs-hero.png",
  mainEntity: {
    "@type": "TechArticle",
    headline: "Webenablix Documentation",
    description: "Complete technical documentation and API reference",
    author: {
      "@type": "Organization",
      name: "Webenablix",
    },
  },
};

/**
 * BLOG PAGE SCHEMA
 * Optimized for blog collection and discovery
 */
export const blogsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Webenablix Blog",
  url: "https://www.webenablix.com/blogs",
  description:
    "Latest insights, tips, and best practices for web accessibility, WCAG compliance, and inclusive design",
  image: "https://www.webenablix.com/blog-hero.png",
  mainEntity: {
    "@type": "Blog",
    name: "Webenablix Blog",
    headline: "Web Accessibility & Compliance Insights",
    description:
      "Articles about web accessibility, WCAG standards, ADA compliance, and inclusive web design",
  },
};

/**
 * AGENCY PARTNERS PAGE SCHEMA
 * Optimized for partnership/service provider discovery
 */
export const agencyPageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webenablix Agency Partnership",
  url: "https://www.webenablix.com/agency",
  description:
    "Become a Webenablix partner agency and offer accessibility solutions to your clients",
  image: "https://www.webenablix.com/agency-hero.png",
  provider: {
    "@type": "Organization",
    name: "Webenablix",
  },
  serviceType: [
    "Agency Partnership Program",
    "White Label Solutions",
    "Reseller Program",
  ],
  potentialAction: {
    "@type": "ApplyAction",
    name: "Apply for Partnership",
    url: "https://www.webenablix.com/agency/apply",
  },
};

/**
 * PRODUCT SPECIFIC SCHEMAS - Optimize each product page
 */

/**
 * Free Checker Product Page
 */
export const checkerProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Free Accessibility Checker",
  url: "https://www.webenablix.com/products/checker",
  image: "https://www.webenablix.com/products/checker.png",
  description:
    "Free WCAG 2.1 and ADA compliance checker. Scan any website for accessibility issues.",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "3500",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "Instant WCAG 2.1 Level AA scanning",
    "ADA compliance detection",
    "Detailed issue categorization",
    "No installation required",
    "Free with no credit card needed",
  ],
};

/**
 * Widget Product Page
 */
export const widgetProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Accessibility Widget",
  url: "https://www.webenablix.com/products/widget",
  image: "https://www.webenablix.com/products/widget.png",
  description:
    "Embed accessibility controls in your website. Free visitor controls for text size, contrast, and more.",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free Plan",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Custom Enterprise",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2100",
    bestRating: "5",
  },
  featureList: [
    "Text size adjustment",
    "High contrast mode",
    "Font selection",
    "Link highlighting",
    "Video player controls",
    "Dyslexia-friendly fonts",
  ],
};

/**
 * Scanner/Audit Product Page
 */
export const auditProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Webenablix Scanner",
  url: "https://www.webenablix.com/products/audit",
  image: "https://www.webenablix.com/products/scanner.png",
  description:
    "Comprehensive website accessibility scanning with detailed reports and AI-powered fix recommendations",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  offers: {
    "@type": "Offer",
    price: "12",
    priceCurrency: "USD",
    billingDuration: "P1M",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1800",
    bestRating: "5",
  },
  featureList: [
    "Full site accessibility scanning",
    "WCAG 2.1 & ADA issue detection",
    "Severity categorization",
    "Detailed remediation guidance",
    "PDF reports",
    "Fix recommendations",
  ],
};

/**
 * Monitor Product Page
 */
export const monitorProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Accessibility Monitor",
  url: "https://www.webenablix.com/products/monitor",
  image: "https://www.webenablix.com/products/monitor.png",
  description:
    "Continuous accessibility monitoring with automated alerts, tracking, and historical reporting",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    billingDuration: "P1M",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "950",
    bestRating: "5",
  },
  featureList: [
    "Continuous monitoring 24/7",
    "Automated alerts on new issues",
    "Compliance tracking",
    "Historical reports",
    "Team dashboard",
    "Progress analytics",
  ],
};

/**
 * Managed Accessibility Service Page
 */
export const managedServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Managed Accessibility Service",
  url: "https://www.webenablix.com/products/managed",
  image: "https://www.webenablix.com/products/managed.png",
  description:
    "Full-service managed accessibility with expert support, strategic consulting, and ongoing remediation",
  provider: {
    "@type": "Organization",
    name: "Webenablix",
  },
  serviceType: [
    "Accessibility Consulting",
    "Remediation Services",
    "Training & Support",
    "Compliance Monitoring",
  ],
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "USD",
    billingDuration: "P1M",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "650",
    bestRating: "5",
  },
  featureList: [
    "Dedicated accessibility expert",
    "Quarterly strategy sessions",
    "Custom remediation roadmap",
    "Implementation support",
    "Staff training",
    "Compliance guarantee",
  ],
};

/**
 * COMPARISON PAGE SCHEMA
 * Optimized for comparison and feature differentiation
 */
export const comparisonPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix Feature Comparison",
  url: "https://www.webenablix.com/compare",
  description:
    "Compare Webenablix plans and features. Find the right accessibility solution for your needs.",
  image: "https://www.webenablix.com/compare-hero.png",
  mainEntity: {
    "@type": "Table",
    name: "Feature Comparison",
    about: "Comparison of all Webenablix products and plans",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE AUDIT PAGE SCHEMAS - /products/audit
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * AUDIT PAGE - MAIN PRODUCT SCHEMA
 * Enhanced product schema with all audit features and benefits
 */
export const auditPageMainSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Webenablix Accessibility Audit Service",
  url: "https://www.webenablix.com/products/audit",
  image: "https://www.webenablix.com/products/audit-hero.png",
  description:
    "Comprehensive web accessibility audits with detailed WCAG 2.1 AA compliance reports and expert recommendations from certified accessibility professionals.",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  isPartOf: {
    "@type": "Service",
    name: "Web Accessibility Services",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1840",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Fortune 500 Company",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "The audit provided actionable insights that helped us identify and remediate 300+ accessibility issues in 2 weeks.",
      datePublished: "2024-01-15",
    },
  ],
  featureList: [
    "WCAG 2.1 Level AA compliance scanning",
    "ADA compliance assessment",
    "Manual + automated testing",
    "Detailed remediation guidance",
    "Priority-ranked recommendations",
    "Downloadable PDF reports",
    "Compliance documentation",
    "Expert consultation included",
  ],
};

/**
 * AUDIT SERVICE OFFERINGS - 3 TIERS
 * Schema for each audit tier (Automated, Expert, Enterprise)
 */
export const auditServiceOfferings = {
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: "USD",
  lowPrice: "29",
  highPrice: "299",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "3690",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Automated Audit",
      price: "29",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description:
        "AI-powered scanning that detects common accessibility issues instantly",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/checker",
    },
    {
      "@type": "Offer",
      name: "Expert Audit",
      price: "299",
      priceCurrency: "USD",
      description:
        "Manual review by certified accessibility experts with detailed recommendations",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "Offer",
      name: "Enterprise Audit",
      price: "999",
      priceCurrency: "USD",
      priceRange: "$999+",
      description:
        "Complete audit with remediation support and legal documentation. Contact sales for custom pricing.",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/contact-sales",
    },
  ],
};

/**
 * WCAG COMPLIANCE SCHEMA
 * Detailed schema for WCAG 2.1 AA compliance and POUR principles
 */
export const wcagComplianceSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  name: "WCAG 2.1 Level AA Compliance",
  description:
    "Web Content Accessibility Guidelines 2.1 Level AA compliance standard",
  credentialCategory: "Accessibility Compliance",
  hasPart: [
    {
      "@type": "CreativeWork",
      name: "Perceivable",
      description:
        "Information and user interface components must be presented in ways that are perceivable to users",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/perceivable",
      text: "Includes text alternatives, captions, audio descriptions, color contrast, text resizing, and visual presentation",
    },
    {
      "@type": "CreativeWork",
      name: "Operable",
      description:
        "User interface components and navigation must be operable through keyboard and other input devices",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/operable",
      text: "Includes keyboard accessibility, timing control, navigation mechanisms, and input modalities",
    },
    {
      "@type": "CreativeWork",
      name: "Understandable",
      description:
        "Information and the operation of user interface must be understandable",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/understandable",
      text: "Includes readable text, predictable UI behavior, and input assistance for error prevention",
    },
    {
      "@type": "CreativeWork",
      name: "Robust",
      description:
        "Content must be robust enough to be interpreted reliably by a wide variety of assistive technologies",
      url: "https://www.w3.org/WAI/WCAG21/Understanding/robust",
      text: "Includes compatibility with assistive technologies, valid HTML markup, and ARIA implementation",
    },
  ],
};

/**
 * AUDIT EXPERTISE SCHEMA
 * Organization schema highlighting audit team expertise
 */
export const auditExpertiseSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webenablix Accessibility Audit Team",
  description:
    "Team of certified accessibility professionals with expertise in WCAG compliance and accessibility auditing",
  url: "https://www.webenablix.com/products/audit",
  member: [
    {
      "@type": "Person",
      name: "Certified Accessibility Auditors",
      jobTitle: "Accessibility Expert",
      expertise: [
        "WCAG 2.1 AA Compliance",
        "ARIA Implementation",
        "Assistive Technology Testing",
        "Accessibility Audit Strategy",
        "Remediation Planning",
        "Legal Compliance Documentation",
      ],
      numberOfEmployees: 100,
    },
  ],
  award: [
    {
      "@type": "Award",
      name: "ISO/IEC 40500 Certified",
      description: "International standard for web content accessibility",
    },
    {
      "@type": "Award",
      name: "IAAP Certified",
      description:
        "International Association of Accessibility Professionals certification",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2500",
    bestRating: "5",
  },
};

/**
 * AUDIT STATISTICS SCHEMA
 * Organization metrics and trust indicators
 */
export const auditStatisticsSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Webenablix Audit Service Impact Metrics",
  description: "Key statistics about Webenablix audit services",
  body: "Webenablix has completed over 50,000 accessibility audits with 99.9% average client satisfaction. Our team of 100+ certified experts provides audits with 48-hour average turnaround time.",
};

/**
 * AUDIT PROCESS SCHEMA
 * How-to/Guide for audit process
 */
export const auditProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Webenablix Accessibility Audit Process",
  description:
    "Step-by-step process for conducting a comprehensive web accessibility audit",
  image: "https://www.webenablix.com/audit-process.png",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Initial Scan",
      text: "Automated WCAG 2.1 AA scanning of your entire website to identify accessibility issues",
      image: "https://www.webenablix.com/step-1.png",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Expert Review",
      text: "Certified accessibility experts manually review findings and test with assistive technologies",
      image: "https://www.webenablix.com/step-2.png",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Prioritization",
      text: "Issues are categorized and prioritized based on impact and severity level",
      image: "https://www.webenablix.com/step-3.png",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Recommendations",
      text: "Detailed remediation recommendations with code examples and implementation guidance",
      image: "https://www.webenablix.com/step-4.png",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "Report Delivery",
      text: "Comprehensive PDF report with compliance documentation and legal statements",
      image: "https://www.webenablix.com/step-5.png",
    },
  ],
};

/**
 * AUDIT FAQ SCHEMA
 * Frequently asked questions about audit service
 */
export const auditFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in a Webenablix accessibility audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our comprehensive audits include automated WCAG 2.1 AA scanning, manual expert review, assistive technology testing, prioritized issue categorization, detailed remediation recommendations, and downloadable compliance reports.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an accessibility audit take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automated audits provide instant results. Expert audits typically have a 48-hour turnaround. Enterprise audits may take 5-7 business days depending on site complexity.",
      },
    },
    {
      "@type": "Question",
      name: "What standards do you audit against?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We audit against WCAG 2.1 Level AA, WCAG 2.2, Section 508 of the ADA, and EN 301 549 European Accessibility Standard.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide remediation support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All audit packages include detailed remediation guidance. Enterprise packages include dedicated remediation support and implementation consulting.",
      },
    },
    {
      "@type": "Question",
      name: "Are your audits legally defensible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our expert audits include legal compliance documentation suitable for ADA defense. Enterprise packages include formal compliance statements and legal protection.",
      },
    },
    {
      "@type": "Question",
      name: "What is WCAG 2.1 Level AA compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG 2.1 Level AA is the widely-accepted accessibility standard that covers the four principles: Perceivable, Operable, Understandable, and Robust. It ensures websites are accessible to people with various disabilities.",
      },
    },
  ],
};

/**
 * AUDIT BENEFITS SCHEMA
 * Why choose Webenablix audits
 */
export const auditBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Expert-Certified Team",
      description:
        "Our auditors are IAAP certified accessibility professionals with proven expertise in WCAG compliance",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Comprehensive Reporting",
      description:
        "Detailed PDF reports with issue categorization, severity levels, and remediati code examples",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Quick Turnaround",
      description:
        "48-hour average delivery time on expert audits with dedicated priority handling",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Legal Protection",
      description:
        "Audit reports include compliance statements suitable for ADA legal defense",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Implementation Support",
      description:
        "Our team provides guidance and support to help you implement recommendations",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Continuous Monitoring",
      description:
        "Track your compliance improvements over time with ongoing monitoring capabilities",
      url: "https://www.webenablix.com/products/audit",
    },
  ],
};

/**
 * CALL-TO-ACTION SCHEMA
 * Main audit request CTA
 */
export const auditCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Request Accessibility Audit",
  description:
    "Get a comprehensive accessibility audit and actionable roadmap to WCAG compliance",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE AUDIT PAGE SCHEMA GRAPH
 * Combines all audit page schemas into one integrated schema
 */
export const auditPageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    auditPageMainSchema,
    wcagComplianceSchema,
    auditExpertiseSchema,
    auditProcessSchema,
    auditFaqSchema,
    auditBenefitsSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE WIDGET PAGE SCHEMAS - /products/widget
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * WIDGET PAGE - MAIN PRODUCT SCHEMA
 * Enhanced product schema with comprehensive widget features
 */
export const widgetPageMainSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Webenablix Accessibility Widget",
  url: "https://www.webenablix.com/products/widget",
  image: "https://www.webenablix.com/products/widget-hero.png",
  description:
    "Free accessibility widget for websites. Embed powerful accessibility controls including high contrast, text sizing, dyslexia fonts, keyboard navigation, and multi-language support. WCAG 2.1 & 2.2 compliant.",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  isPartOf: {
    "@type": "SoftwareApplication",
    name: "Webenablix Accessibility Platform",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2100",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "E-Commerce Enterprise",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Easiest accessibility solution to implement. Our users love it and we achieved WCAG compliance in weeks, not months.",
      datePublished: "2024-02-20",
    },
  ],
  featureList: [
    "High contrast mode for vision impaired users",
    "Text size adjustment (up to 200%)",
    "Dyslexia-friendly fonts",
    "Keyboard navigation enhancement",
    "Focus highlighting",
    "Letter and line spacing adjustment",
    "Hide images mode",
    "Text alignment options",
    "Multi-language support (26+ languages)",
    "Customizable widget appearance",
    "WCAG 2.1 & 2.2 compliance",
    "Free installation",
  ],
};

/**
 * WIDGET FEATURES SCHEMA
 * Itemized list of all widget features and capabilities
 */
export const widgetFeaturesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Widget Features",
  description: "Complete list of accessibility features in Webenablix Widget",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Vision Impaired Profile",
      description:
        "High contrast mode with larger text, focus highlighting, and color adjustments for users with vision impairments",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cognitive Disability Profile",
      description:
        "Simplified navigation, reduced animations, and enhanced readability for users with cognitive challenges",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Motor Impaired Profile",
      description:
        "Keyboard navigation optimization and enhanced focus controls for users with motor disabilities",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Text Size Adjustment",
      description:
        "Scale text up to 200% for better readability without breaking page layout",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Dyslexia Font",
      description:
        "Specialized fonts designed to improve readability for users with dyslexia",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Enhanced Contrast",
      description:
        "High contrast mode for improved text and element visibility",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Focus Highlighting",
      description:
        "Enhanced focus indicators for keyboard navigation and visual feedback",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Letter Spacing",
      description:
        "Adjust letter spacing to improve readability for some users",
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "Line Height Adjustment",
      description: "Increase line spacing for better readability of paragraphs",
    },
    {
      "@type": "ListItem",
      position: 10,
      name: "Hide Images",
      description: "Remove images to focus on text content for faster loading",
    },
    {
      "@type": "ListItem",
      position: 11,
      name: "Highlight Links",
      description:
        "Visually distinguish links from regular text for better navigation",
    },
    {
      "@type": "ListItem",
      position: 12,
      name: "Multi-Language Support",
      description: "Widget interface available in 26+ languages globally",
    },
  ],
};

/**
 * WIDGET ACCESSIBILITY PROFILES SCHEMA
 * Itemized list of user profiles and their benefits
 */
export const widgetAccessibilityProfilesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Accessibility User Profiles",
  description: "Different user profiles supported by Webenablix Widget",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Vision Impaired Profile",
      description:
        "Enhances visual elements with high contrast, larger text, and focus highlighting for users with vision impairments including color blindness and low vision",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cognitive Disability Profile",
      description:
        "Simplifies navigation and content layout for users with cognitive challenges including dyslexia, ADHD, and autism spectrum",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Motor Impaired Profile",
      description:
        "Optimizes keyboard navigation and interactive elements for motor-impaired users including those with tremors and paralysis",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Hearing Impaired Profile",
      description:
        "Ensures all audio and video content has proper captions and transcripts for users who are deaf or hard of hearing",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Seizure Prevention Profile",
      description:
        "Reduces flashing and animations that could trigger photosensitive seizures",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "General Accessibility Profile",
      description:
        "Provides baseline accessibility features for all users to improve overall usability",
    },
  ],
};

/**
 * WIDGET LANGUAGE SUPPORT SCHEMA
 * Comprehensive list of supported languages (26+)
 */
export const widgetLanguageSupportSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Widget Language Support",
  description: "Complete list of 26+ languages supported by Webenablix Widget",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "English" },
    { "@type": "ListItem", position: 2, name: "Spanish" },
    { "@type": "ListItem", position: 3, name: "French" },
    { "@type": "ListItem", position: 4, name: "German" },
    { "@type": "ListItem", position: 5, name: "Italian" },
    { "@type": "ListItem", position: 6, name: "Portuguese" },
    { "@type": "ListItem", position: 7, name: "Dutch" },
    { "@type": "ListItem", position: 8, name: "Russian" },
    { "@type": "ListItem", position: 9, name: "Chinese" },
    { "@type": "ListItem", position: 10, name: "Japanese" },
    { "@type": "ListItem", position: 11, name: "Korean" },
    { "@type": "ListItem", position: 12, name: "Arabic" },
    { "@type": "ListItem", position: 13, name: "Hindi" },
    { "@type": "ListItem", position: 14, name: "Turkish" },
    { "@type": "ListItem", position: 15, name: "Polish" },
    { "@type": "ListItem", position: 16, name: "Swedish" },
    { "@type": "ListItem", position: 17, name: "Norwegian" },
    { "@type": "ListItem", position: 18, name: "Danish" },
    { "@type": "ListItem", position: 19, name: "Finnish" },
    { "@type": "ListItem", position: 20, name: "Greek" },
    { "@type": "ListItem", position: 21, name: "Czech" },
    { "@type": "ListItem", position: 22, name: "Hungarian" },
    { "@type": "ListItem", position: 23, name: "Romanian" },
    { "@type": "ListItem", position: 24, name: "Bulgarian" },
    { "@type": "ListItem", position: 25, name: "Croatian" },
    { "@type": "ListItem", position: 26, name: "Hebrew" },
  ],
};

/**
 * WIDGET WCAG COMPLIANCE SCHEMA
 * WCAG 2.1 & 2.2 compliance details
 */
export const widgetWcagSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Webenablix Widget WCAG 2.1 & 2.2 Compliance",
  description:
    "Comprehensive WCAG 2.1 Level AA and WCAG 2.2 compliance coverage",
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
  proficiencyLevel: "Intermediate",
  articleBody:
    "Webenablix Widget helps achieve and maintain WCAG 2.1 Level AA and WCAG 2.2 compliance through multiple accessibility features. Coverage includes perceivable text alternatives, operable keyboard navigation, understandable content organization, and robust assistive technology compatibility.",
};

/**
 * WIDGET CUSTOMIZATION SCHEMA
 * Custom branding and styling options
 */
export const widgetCustomizationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webenablix Widget Customization",
  description:
    "Customize widget appearance and behavior to match your website design and branding",
  url: "https://www.webenablix.com/products/widget",
  serviceType: [
    "Widget Color Customization",
    "Position Control",
    "Style Customization",
    "Branding Integration",
  ],
  featureList: [
    "Custom color schemes",
    "Adjustable widget position (left/right/bottom)",
    "Font and size customization",
    "Icon and button styling",
    "Custom labels and text",
    "Responsive design adaptation",
  ],
};

/**
 * WIDGET STATISTICS SCHEMA
 * Key metrics and social proof
 */
export const widgetStatisticsSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Webenablix Widget Impact Metrics",
  description: "Key statistics about Webenablix Widget adoption and impact",
  body: "Webenablix Widget is installed on millions of websites globally. Over 1 billion people with disabilities rely on accessibility tools. The market of people with disabilities has $490 billion in spending power in the US alone. Over 4,600 ADA web accessibility lawsuits are filed annually, making accessible design essential.",
};

/**
 * WIDGET BENEFITS SCHEMA
 * Key advantages and benefits
 */
export const widgetBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Widget Benefits",
  description: "Top reasons to use Webenablix Widget",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Zero Installation Required",
      description:
        "Add with a single line of code - no complex setup or configuration needed",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Completely Free",
      description:
        "Basic widget functionality available at no cost with optional premium features",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Quick Compliance",
      description:
        "Instantly cover WCAG 2.1 & 2.2 requirements with built-in profiles",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Multi-Language Support",
      description:
        "Serve users globally with widget interface in 26+ languages",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Fully Customizable",
      description: "Match your website design with flexible branding options",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Global Reach",
      description:
        "Trust by millions of websites including Salesforce, IBM, Zendesk, BMW, and British Airways",
    },
  ],
};

/**
 * WIDGET TRUST & SOCIAL PROOF SCHEMA
 * Companies using Webenablix Widget
 */
export const widgetTrustSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  name: "Trusted by Thousands of Websites",
  description: "Webenablix Widget is trusted by millions of websites globally",
  reviewBody:
    "Our Widget has quickly become the best accessibility plugin and compliance solution, now installed on millions of websites worldwide. Trusted by enterprise companies including Salesforce, IBM, Zendesk, BMW, and British Airways.",
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2100",
    bestRating: "5",
  },
};

/**
 * WIDGET CTA SCHEMA
 * Call-to-action for widget trial
 */
export const widgetCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Start Free Widget Trial",
  description:
    "Get started with Webenablix Widget for free. No credit card required.",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * WIDGET FAQ SCHEMA
 * Frequently asked questions about widget
 */
export const widgetFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I install the Webenablix Widget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Installation is simple - just add a single line of JavaScript code to your website. The widget will automatically load and start providing accessibility features to your users.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Webenablix Widget really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The basic widget is completely free with all core accessibility features. Premium customization and advanced features are available through our paid plans.",
      },
    },
    {
      "@type": "Question",
      name: "Does the widget help with WCAG compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The widget helps you meet WCAG 2.1 Level AA and WCAG 2.2 requirements through six pre-built accessibility profiles tailored for different user needs.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the widget to match my brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! You can customize colors, position, fonts, icons, and labels. The widget is designed to seamlessly integrate with any website design.",
      },
    },
    {
      "@type": "Question",
      name: "What languages does the widget support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The widget supports 26+ languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more. Users can select their preferred language.",
      },
    },
    {
      "@type": "Question",
      name: "How accessible is the widget itself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The widget is built to be fully accessible itself. It includes keyboard navigation, screen reader support, and high contrast options to ensure all users can access its features.",
      },
    },
    {
      "@type": "Question",
      name: "Does the widget impact website performance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The widget is optimized for performance with minimal JavaScript footprint, lazy loading, and zero impact on your site's speed metrics.",
      },
    },
    {
      "@type": "Question",
      name: "Can I track widget usage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our analytics provide insights into which accessibility features are most used, helping you understand your users' accessibility needs.",
      },
    },
  ],
};

/**
 * WIDGET OFFERING SCHEMA
 * Pricing tiers for widget options
 */
export const widgetOfferingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: "USD",
  lowPrice: "0",
  highPrice: "29",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2100",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Basic Widget",
      price: "0",
      priceCurrency: "USD",
      description: "Free widget with all standard accessibility features",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/widget",
    },
    {
      "@type": "Offer",
      name: "Premium Widget",
      price: "29",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description:
        "Premium widget with advanced customization and priority support",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/widget",
    },
    {
      "@type": "Offer",
      name: "Enterprise Widget",
      price: "999",
      priceCurrency: "USD",
      priceRange: "$999+",
      description:
        "Enterprise solution with white-label options and dedicated support",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/contact-sales",
    },
  ],
};

/**
 * COMPREHENSIVE WIDGET PAGE SCHEMA GRAPH
 * Combines all widget page schemas into one integrated schema
 */
export const widgetPageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    widgetPageMainSchema,
    widgetFeaturesSchema,
    widgetAccessibilityProfilesSchema,
    widgetLanguageSupportSchema,
    widgetWcagSchema,
    widgetFaqSchema,
    widgetBenefitsSchema,
    widgetStatisticsSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE MANAGED ACCESSIBILITY PAGE SCHEMAS - /products/managed
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * MANAGED SERVICE - MAIN SERVICE SCHEMA
 * Enhanced service schema for managed accessibility offering
 */
export const managedPageMainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Managed Accessibility Service",
  url: "https://www.webenablix.com/products/managed",
  image: "https://www.webenablix.com/products/managed-hero.png",
  description:
    "Complete managed accessibility program with expert audit, remediation, continuous monitoring, legal protection, and staff training. Fully managed for you by certified accessibility professionals.",
  serviceType: [
    "Accessibility Audit",
    "Remediation Services",
    "Continuous Monitoring",
    "Staff Training",
    "Legal Protection",
    "Compliance Management",
  ],
  provider: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  areaServed: ["United States", "Canada", "United Kingdom", "European Union"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1240",
    bestRating: "5",
    worstRating: "1",
  },
};

/**
 * MANAGED SERVICE FEATURES - COMPREHENSIVE FEATURES
 */
export const managedServiceFeaturesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Managed Accessibility Service Features",
  description:
    "Complete list of features and services included in Webenablix Managed Accessibility",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Expert manual + automated audit",
    },
    { "@type": "ListItem", position: 2, name: "Ongoing remediation support" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Continuous compliance monitoring",
    },
    { "@type": "ListItem", position: 4, name: "VPAT & legal documentation" },
    { "@type": "ListItem", position: 5, name: "Team training & advisory" },
    {
      "@type": "ListItem",
      position: 6,
      name: "Dedicated accessibility manager",
    },
    { "@type": "ListItem", position: 7, name: "Monthly compliance reports" },
    {
      "@type": "ListItem",
      position: 8,
      name: "Quarterly compliance certificate",
    },
  ],
};

/**
 * MANAGED SERVICES OFFERINGS - 3 PRICING TIERS
 * Essential, Professional (Most Popular), Enterprise
 */
export const managedServiceOfferingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: "USD",
  lowPrice: "499",
  highPrice: "1299",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1240",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Essential Plan",
      price: "499",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description: "For small sites that need a solid compliance foundation",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/register",
    },
    {
      "@type": "Offer",
      name: "Professional Plan",
      price: "1299",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description:
        "For growing businesses with ongoing compliance needs. Most popular choice.",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/register",
    },
    {
      "@type": "Offer",
      name: "Enterprise Plan",
      priceCurrency: "USD",
      priceRange: "Custom pricing",
      description:
        "For large enterprises, government, and regulated industries",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/contact-sales",
    },
  ],
};

/**
 * MANAGED SERVICE PRICING DETAILS
 * Essential plan specifics
 */
export const managedEssentialPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Managed Accessibility - Essential Plan",
  price: "499",
  priceCurrency: "USD",
  billingDuration: "P1M",
  description: "Essential managed accessibility service for small websites",
  url: "https://www.webenablix.com/register",
  availability: "https://schema.org/InStock",
  includes: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Up to 50 pages monitored" },
      { "@type": "ListItem", position: 2, name: "Annual manual audit" },
      { "@type": "ListItem", position: 3, name: "Automated daily scans" },
      { "@type": "ListItem", position: 4, name: "Email & Slack alerts" },
      { "@type": "ListItem", position: 5, name: "Accessibility statement" },
      { "@type": "ListItem", position: 6, name: "Email support (48 h SLA)" },
    ],
  },
};

/**
 * MANAGED SERVICE PRICING DETAILS
 * Professional plan specifics (Most Popular)
 */
export const managedProfessionalPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Managed Accessibility - Professional Plan",
  price: "1299",
  priceCurrency: "USD",
  billingDuration: "P1M",
  description:
    "Professional managed accessibility service with advanced features. Most popular choice.",
  url: "https://www.webenablix.com/register",
  availability: "https://schema.org/InStock",
  includes: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Up to 500 pages monitored" },
      { "@type": "ListItem", position: 2, name: "Semi-annual manual audit" },
      { "@type": "ListItem", position: 3, name: "Automated real-time scans" },
      { "@type": "ListItem", position: 4, name: "VPAT / ACR document" },
      { "@type": "ListItem", position: 5, name: "Dedicated account manager" },
      {
        "@type": "ListItem",
        position: 6,
        name: "Remediation support (40 h / mo)",
      },
      { "@type": "ListItem", position: 7, name: "Priority support (4 h SLA)" },
      {
        "@type": "ListItem",
        position: 8,
        name: "Quarterly compliance certificate",
      },
    ],
  },
};

/**
 * MANAGED SERVICE PROCESS SCHEMA
 * 5-step methodology
 */
export const managedServiceProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Managed Accessibility Implementation Process",
  description:
    "Five-step process for implementing managed accessibility services",
  image: "https://www.webenablix.com/managed-process.png",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Discovery call",
      text: "We start with a 30-minute consultation to understand your site, tech stack, traffic, and legal exposure. No obligation.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Baseline audit",
      text: "Our experts run comprehensive manual and automated audit. Receive prioritised issues list within 5 business days, mapped to WCAG success criteria.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Remediation sprint",
      text: "We work alongside your dev team to close critical and serious violations first - fastest path to compliance.",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Certification & documentation",
      text: "Once compliant, receive signed VPAT, published accessibility statement, and compliance certificate for legal or procurement use.",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "Continuous management",
      text: "24/7 monitoring, remediation of regressions, monthly reports, and dedicated accessibility manager on-call any time.",
    },
  ],
};

/**
 * MANAGED SERVICE STATISTICS
 * Key metrics and social proof
 */
export const managedServiceStatisticsSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Managed Accessibility Service Impact Metrics",
  description: "Key statistics about Webenablix Managed Accessibility Services",
  body: "Webenablix managed clients achieve 98% client satisfaction rate with 2,400+ managed sites worldwide. Zero successful ADA lawsuits have been filed against our managed clients. Average time to full compliance is 6 weeks.",
};

/**
 * MANAGED SERVICE BENEFITS
 * Key advantages and benefits
 */
export const managedServiceBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Managed Accessibility Service Benefits",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "98% Client Satisfaction",
      description: "Leading customer satisfaction rating in the industry",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "2,400+ Managed Sites",
      description: "Trusted by organizations worldwide",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Zero Lawsuits",
      description:
        "No successful ADA lawsuits filed against our managed clients",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "6 Week Average",
      description: "Average time to achieve full compliance",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Dedicated Manager",
      description: "Personal accessibility manager for all managed clients",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Legal Protection",
      description:
        "VPAT, accessibility statement, and litigation support included",
    },
  ],
};

/**
 * MANAGED SERVICE TESTIMONIALS
 * Client success stories - ItemList of individual reviews
 */
export const managedServiceTestimonialsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Managed Accessibility Client Testimonials",
  description: "Success stories from Webenablix Managed Accessibility clients",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sandra Okafor",
          jobTitle: "Chief Digital Officer",
          affiliation: {
            "@type": "Organization",
            name: "HealthFirst",
          },
        },
        reviewBody:
          "Within 6 weeks we went from failing an external VPAT review to passing it with flying colours. The team handled everything - we barely had to lift a finger.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        itemReviewed: {
          "@type": "Service",
          name: "Managed Accessibility Service",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Marcus Webb",
          jobTitle: "General Counsel",
          affiliation: {
            "@type": "Organization",
            name: "LegalShield",
          },
        },
        reviewBody:
          "We faced an ADA demand letter and turned to Webenablix. Their Managed plan got us compliant fast and the legal documentation helped us resolve the case without litigation.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        itemReviewed: {
          "@type": "Service",
          name: "Managed Accessibility Service",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Priya Nair",
          jobTitle: "VP Technology",
          affiliation: {
            "@type": "Organization",
            name: "EduPath LMS",
          },
        },
        reviewBody:
          "The monthly compliance reports have become a standing agenda item in our board meetings. Stakeholders love the clear score trend and the proactive approach.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        itemReviewed: {
          "@type": "Service",
          name: "Managed Accessibility Service",
        },
      },
    },
  ],
};

/**
 * MANAGED SERVICE SERVICE MODULES
 * Four service areas: Audit & Remediation, Monitoring, Legal, Training
 */
export const managedServiceModulesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Managed Accessibility Service Modules",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Audit & Remediation",
      description:
        "Expert manual and automated audits with prioritized remediation guides",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ongoing Monitoring",
      description:
        "Continuous 24/7 monitoring with real-time alerts and monthly compliance reports",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Legal Protection",
      description:
        "VPAT documents, accessibility statements, and litigation support",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Training & Advisory",
      description:
        "Staff training, design system reviews, and role-tailored education",
    },
  ],
};

/**
 * MANAGED SERVICE FAQ SCHEMA
 * Frequently asked questions
 */
export const managedServiceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does managed actually mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means our team handles the full accessibility lifecycle for you - audit, remediation guidance (or direct code fixes on Enterprise), monitoring, reporting, and legal docs. You retain final sign-off, but the heavy lifting is ours.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the initial audit take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most sites under 200 pages, we deliver the full written audit within 5 business days of kick-off. Larger or more complex sites typically take 7-10 business days.",
      },
    },
    {
      "@type": "Question",
      name: "What standards do you audit against?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We audit against WCAG 2.1 Level AA as the baseline, with optional WCAG 2.2 and Section 508 coverage. Enterprise clients can also request EN 301 549 (European standard) coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with any tech stack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We have experts across React, Angular, Vue, WordPress, Shopify, Drupal, Sitecore, and bespoke platforms. We adapt our remediation approach to match your tooling.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a lawsuit is filed while Im a managed client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enterprise clients receive litigation support documentation including the signed VPAT, audit trail, and a letter from our compliance team. We also provide expert witness support upon request.",
      },
    },
  ],
};

/**
 * MANAGED SERVICE TEAM CREDENTIALS
 * Certified expertise
 */
export const managedServiceExpertiseSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webenablix Managed Accessibility Team",
  description:
    "Certified accessibility professionals managing your full compliance program",
  url: "https://www.webenablix.com/products/managed",
  member: [
    {
      "@type": "Person",
      name: "Accessibility Specialists",
      jobTitle: "Certified Accessibility Professional",
      expertise: [
        "WCAG Audit & Compliance",
        "Remediation Strategy",
        "Legal Documentation",
        "Staff Training",
        "Continuous Monitoring",
      ],
    },
  ],
  award: [
    {
      "@type": "Award",
      name: "CPACC Certified",
      description: "Certified Professional in Accessibility Core Competencies",
    },
    {
      "@type": "Award",
      name: "IAAP Member",
      description: "International Association of Accessibility Professionals",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1240",
    bestRating: "5",
  },
};

/**
 * MANAGED SERVICE TRUST INDICATORS
 * Organizations using Webenablix Managed
 */
export const managedServiceTrustSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Organizations Using Webenablix Managed Accessibility",
  description:
    "Leading organizations that trust Webenablix Managed Accessibility Service",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "US Department of Education",
      description:
        "Federal government agency using Managed Accessibility Service",
      url: "https://www.webenablix.com/products/managed",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "HealthFirst",
      description:
        "Healthcare leader achieving WCAG compliance with Managed Service",
      url: "https://www.webenablix.com/products/managed",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "LegalShield",
      description: "Legal technology company ensuring accessibility compliance",
      url: "https://www.webenablix.com/products/managed",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "RetailNow",
      description:
        "Retail organization providing accessible shopping experiences",
      url: "https://www.webenablix.com/products/managed",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "CityGov Portal",
      description:
        "Municipal government portal meeting Section 508 requirements",
      url: "https://www.webenablix.com/products/managed",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "EduPath LMS",
      description: "Educational platform ensuring student accessibility",
      url: "https://www.webenablix.com/products/managed",
    },
  ],
};

/**
 * MANAGED SERVICE CTA SCHEMA
 * Main call-to-action
 */
export const managedServiceCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Schedule Managed Accessibility Consultation",
  description:
    "Book a free 30-minute consultation with an accessibility expert",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE MANAGED ACCESSIBILITY SCHEMA GRAPH
 * Combines all managed service schemas into one integrated schema
 */
export const managedPageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    managedPageMainSchema,
    managedServiceFeaturesSchema,
    managedServiceOfferingSchema,
    managedServiceProcessSchema,
    managedServiceStatisticsSchema,
    managedServiceBenefitsSchema,
    managedServiceFaqSchema,
    managedServiceExpertiseSchema,
    managedServiceModulesSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE MONITOR PAGE SCHEMAS - /products/monitor
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * MONITOR PAGE - MAIN PRODUCT SCHEMA
 * Enhanced product schema for continuous monitoring service
 */
export const monitorPageMainSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Webenablix Accessibility Monitor",
  url: "https://www.webenablix.com/products/monitor",
  image: "https://www.webenablix.com/products/monitor-hero.png",
  description:
    "Continuous accessibility monitoring with AI-powered analysis, real-time alerts, and compliance reporting. Monitor your entire website 24/7 and stay compliant.",
  brand: {
    "@type": "Brand",
    name: "Webenablix",
  },
  isPartOf: {
    "@type": "SoftwareApplication",
    name: "Webenablix Accessibility Platform",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1650",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "SaaS Compliance Manager",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "The Monitor caught accessibility regressions that our manual testing missed. The emails saved hours of manual checking.",
      datePublished: "2024-03-10",
    },
  ],
  featureList: [
    "Continuous 24/7 website monitoring",
    "AI-powered accessibility analysis",
    "Real-time alerts via email/Slack/webhook",
    "WCAG 2.1 & 2.2 compliance tracking",
    "Historical trend analysis",
    "One-click PDF/CSV/JSON exports",
    "Authenticated page scanning",
    "Custom scheduling options",
  ],
};

/**
 * MONITOR SERVICE FEATURES
 * Six core features of the monitoring service
 */
export const monitorServiceFeaturesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Monitor Features",
  description:
    "Core features and capabilities of Webenablix Accessibility Monitor",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Continuous Scanning",
      description:
        "Schedule daily, weekly, or real-time scans across every page. Never miss a newly introduced violation.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI-Powered Analysis",
      description:
        "AI explains each violation in plain language and suggests developer fixes for WCAG compliance.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "One-Click Exports",
      description:
        "Export compliance reports as PDF, CSV, or JSON for stakeholders, legal teams, and auditors.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Smart Alerts",
      description:
        "Receive instant Slack, email, or webhook notifications for critical issues and score drops.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Trend & History",
      description:
        "Track accessibility scores over time and visualize progress with historical analytics.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Authenticated Scanning",
      description:
        "Securely scan member-only content and pages behind login walls without exposing credentials.",
    },
  ],
};

/**
 * MONITOR PRICING TIERS
 * Aggregate offering with parent-level rating (Google-validated structure)
 */
export const monitorServiceOfferingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: "USD",
  lowPrice: "99",
  highPrice: "499",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1650",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter Monitor",
      price: "99",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description:
        "Continuous monitoring for up to 50 pages with weekly scans and email alerts",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/monitor",
    },
    {
      "@type": "Offer",
      name: "Professional Monitor",
      price: "299",
      priceCurrency: "USD",
      billingDuration: "P1M",
      description:
        "Monitor up to 500 pages with daily scans, Slack integration, and priority support",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/products/monitor",
    },
    {
      "@type": "Offer",
      name: "Enterprise Monitor",
      price: "999",
      priceCurrency: "USD",
      priceRange: "$999+",
      description:
        "Unlimited pages, real-time scanning, webhook integration, and dedicated success manager",
      availability: "https://schema.org/InStock",
      url: "https://www.webenablix.com/contact-sales",
    },
  ],
};

/**
 * MONITOR STATISTICS & TRUST
 * Key metrics and indicators
 */
export const monitorStatisticsSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Webenablix Accessibility Monitor Impact",
  description: "Key statistics about Webenablix Monitor service",
  body: "Webenablix Monitor tracks 350,000+ websites worldwide with 99.9% uptime SLA. Average scan time of 2 minutes with real-time notifications prevent accessibility regressions. Over 4,600 ADA lawsuits are filed annually, making continuous monitoring critical.",
};

/**
 * MONITOR HOW IT WORKS PROCESS
 * Step-by-step process for getting started
 */
export const monitorProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Webenablix Accessibility Monitor Works",
  description:
    "Step-by-step process for setting up and using Webenablix accessibility monitoring",
  image: "https://www.webenablix.com/monitor-process.png",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Connect Your Website",
      text: "Add your URL and configure scanning frequency. No code changes required.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Initial Baseline Scan",
      text: "We scan your entire website to establish your current accessibility baseline and score.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Set Up Alerts",
      text: "Configure notifications via email, Slack, or webhooks for critical issues and score changes.",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Review Reports",
      text: "Access detailed reports showing each issue, WCAG criterion, and AI-suggested fixes.",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "Track Progress",
      text: "Monitor your accessibility score improvements over time with historical analytics.",
    },
  ],
};

/**
 * MONITOR EXPORT OPTIONS
 * Available report and data export formats
 */
export const monitorExportFormatsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Monitor Export Formats",
  description: "Report and data export options available in Webenablix Monitor",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "PDF Reports",
      description:
        "Professional compliance reports with visualizations, perfect for stakeholders and legal teams",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "CSV Export",
      description:
        "Structured data export for analysis in Excel, Google Sheets, or business intelligence tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JSON API",
      description:
        "Raw JSON data for integration with custom tools and automated workflows",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "VPAT Documents",
      description:
        "Voluntary Product Accessibility Template for vendor compliance requirements",
    },
  ],
};

/**
 * MONITOR BENEFITS
 * Key advantages and value propositions
 */
export const monitorBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Monitor Benefits",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Prevent Regressions",
      description: "Catch new accessibility issues before they reach users",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Save Development Time",
      description: "AI suggests fixes to accelerate remediation",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Reduce Legal Risk",
      description: "Document continuous compliance efforts for legal defense",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Team Alignment",
      description: "Real-time alerts keep teams informed and accountable",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "24/7 Monitoring",
      description:
        "Never miss a violation with automated round-the-clock scanning",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Stakeholder Reports",
      description:
        "Share beautiful dashboards and reports with executives and compliance teams",
    },
  ],
};

/**
 * MONITOR FAQ SCHEMA
 * Frequently asked questions about the monitor service
 */
export const monitorFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often does Webenablix Monitor scan my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scanning frequency depends on your plan. Starter scans weekly, Professional scans daily, and Enterprise offers real-time scanning with webhooks for custom integrations.",
      },
    },
    {
      "@type": "Question",
      name: "Can the Monitor scan pages behind a login?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The Monitor includes authenticated scanning for member-only content. We use a secure credential vault that never exposes your passwords.",
      },
    },
    {
      "@type": "Question",
      name: "What standards does the Monitor check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Monitor audits against WCAG 2.1 Level AA, WCAG 2.2, Section 508, and EN 301 549 with configurable standards per your compliance requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly does it detect issues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Average scan time is 2 minutes. Enterprise plans offer real-time scans with webhook notifications for immediate detection of newly introduced issues.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export reports for auditors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Export full compliance reports as professional PDFs, CSV, JSON, or VPAT documents suitable for auditors, legal teams, and stakeholders.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Monitor integrate with our tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The Monitor integrates with Slack, email, webhooks, and our REST API for custom integrations with your existing tools and workflows.",
      },
    },
  ],
};

/**
 * MONITOR TEAM EXPERTISE
 * Team credentials and expertise
 */
export const monitorExpertiseSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webenablix Monitor Team",
  description:
    "Certified professionals maintaining continuous accessibility monitoring infrastructure",
  url: "https://www.webenablix.com/products/monitor",
  member: [
    {
      "@type": "Person",
      name: "Accessibility Engineers",
      jobTitle: "Platform Engineers",
      expertise: [
        "WCAG Scanning & Analysis",
        "Web Accessibility Standards",
        "Real-time Monitoring Systems",
        "Data Export & Integration",
        "Compliance Reporting",
      ],
    },
  ],
  award: [
    {
      "@type": "Award",
      name: "WCAG 2.1 & 2.2 Certified",
      description: "Continuously updated for latest accessibility standards",
    },
    {
      "@type": "Award",
      name: "99.9% Uptime SLA",
      description: "Enterprise-grade monitoring infrastructure",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1650",
    bestRating: "5",
  },
};

/**
 * MONITOR TRUST INDICATORS
 * Organizations using Webenablix Monitor
 */
export const monitorTrustSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Organizations Using Webenablix Monitor",
  description:
    "Leading organizations trusting Webenablix Monitor for continuous accessibility compliance",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "350,000+ Websites",
      description:
        "Continuously monitored across all industries and company sizes",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "99.9% Uptime",
      description: "Enterprise-grade SLA ensuring monitoring never stops",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "2 Min Avg Scan",
      description: "Fast scanning doesn't slow your website or infrastructure",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Real-time Alerts",
      description:
        "Instant notifications prevent issues from reaching production",
    },
  ],
};

/**
 * MONITOR CTA SCHEMA
 * Main call-to-action for monitor signup
 */
export const monitorCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Start Monitoring Free",
  description:
    "Begin continuous accessibility monitoring with Webenablix Monitor. No credit card required.",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE MONITOR PAGE SCHEMA GRAPH
 * Combines all monitor service schemas into one integrated schema
 */
export const monitorPageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    monitorPageMainSchema,
    monitorServiceFeaturesSchema,
    monitorServiceOfferingSchema,
    monitorProcessSchema,
    monitorStatisticsSchema,
    monitorBenefitsSchema,
    monitorFaqSchema,
    monitorExpertiseSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE COMPARE PAGE SCHEMAS - /products/compare
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * COMPARE PAGE - MAIN WEBPAGE SCHEMA
 * Optimized for comparison page rich results
 */
export const comparePageMainSchema = {
  "@context": "https://schema.org",
  "@type": "ComparisonChart",
  name: "Webenablix vs. Other Accessibility Platforms",
  url: "https://www.webenablix.com/compare",
  image: "https://www.webenablix.com/compare-hero.png",
  description:
    "Compare Webenablix with other accessibility solutions including accessiBe, AudioEye, and UserWay. See feature-by-feature comparison across scanning, remediation, reporting, legal compliance, support, and pricing.",
  itemReviewed: [
    {
      "@type": "SoftwareApplication",
      name: "Webenablix",
      url: "https://www.webenablix.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "accessiBe",
      url: "https://www.accessibe.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "AudioEye",
      url: "https://www.audioeye.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "UserWay",
      url: "https://www.userway.org",
    },
  ],
};

/**
 * WEBENABLIX PLATFORM DETAILED SCHEMA
 * Comprehensive product/software application schema for Webenablix
 */
export const compareWebenablixDetailedSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Webenablix Accessibility Platform",
  url: "https://www.webenablix.com",
  image: "https://www.webenablix.com/product-screenshot.png",
  description:
    "AI-powered web accessibility platform with automated scanning, continuous monitoring, advanced remediation, and managed services",
  applicationCategory: ["Utility", "Accessibility Tool"],
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2500",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "AI-powered accessibility scanning and analysis",
    "Continuous 24/7 monitoring with real-time alerts",
    "Complete remediation suite including managed services",
    "Expert-guided manual remediation support",
    "Advanced reporting with PDF, CSV, JSON exports",
    "REST API for enterprise integrations",
    "VPAT and compliance documentation",
    "Dedicated account managers and support",
    "Staff accessibility training included",
    "No long-term contract lock-in",
  ],
};

/**
 * COMPARE SCANNING FEATURES
 * Detailed comparison of scanning and detection capabilities
 */
export const compareScanningSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Scanning & Detection Feature Comparison",
  about:
    "Comparison of WCAG scanning, detection, and monitoring features across Webenablix and competing platforms",
  description:
    "Feature comparison including WCAG 2.1 AA, WCAG 2.2, Section 508, authenticated scanning, continuous monitoring, and AI-powered analysis",
};

/**
 * COMPARE REMEDIATION FEATURES
 * Detailed comparison of remediation capabilities
 */
export const compareRemediationSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Remediation Feature Comparison",
  about:
    "Comparison of automatic fixes, expert guidance, managed services, and developer suggestion features",
  description:
    "Feature comparison including widget-based fixes, manual remediation, managed remediation services, and code fix suggestions",
};

/**
 * COMPARE REPORTING FEATURES
 * Detailed comparison of reporting and export capabilities
 */
export const compareReportingSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Reporting & Export Feature Comparison",
  about:
    "Comparison of report formats, data export, API access, and automation capabilities",
  description:
    "Feature comparison including PDF reports, CSV/JSON exports, REST API, scheduled reports, and VPAT documentation",
};

/**
 * COMPARE LEGAL COMPLIANCE FEATURES
 * Detailed comparison of legal and compliance features
 */
export const compareLegalSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Legal & Compliance Feature Comparison",
  about:
    "Comparison of compliance statements, certifications, litigation support, and legal guarantees",
  description:
    "Feature comparison including accessibility statements, compliance certificates, litigation support documentation, and ADA lawsuit guarantees",
};

/**
 * COMPARE SUPPORT FEATURES
 * Detailed comparison of support and service features
 */
export const compareSupportSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Support & Services Feature Comparison",
  about:
    "Comparison of customer support options, training, and expert availability",
  description:
    "Feature comparison including email support, live chat, dedicated account managers, staff training, and certified experts",
};

/**
 * COMPARE PRICING FEATURES
 * Detailed comparison of pricing and contract terms
 */
export const comparePricingSectionSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Pricing & Plans Feature Comparison",
  about:
    "Comparison of free options, pricing transparency, contract terms, and custom plans",
  description:
    "Feature comparison including free tier availability, transparent pricing, no lock-in contracts, and enterprise custom plans",
};

/**
 * COMPETITIVE ADVANTAGES
 * Why Webenablix wins in the comparison
 */
export const compareAdvantagesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Why Webenablix Wins",
  description:
    "Key competitive advantages of Webenablix over other accessibility platforms",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AI at the Core",
      description:
        "Every violation comes with AI-generated plain-language explanation and suggested code fix. No competitor offers this depth.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Complete Remediation Suite",
      description:
        "From automated widget fixes to managed services. End-to-end accessibility solution.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "No Lock-in Contracts",
      description:
        "Month-to-month billing with no long-term commitment. Change or cancel anytime.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Transparent Pricing",
      description:
        "All pricing publicly listed. No surprise charges or hidden enterprise markups.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Expert-Led Support",
      description:
        "Every plan includes access to CPACC-certified accessibility professionals.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Free Accessibility Tools",
      description:
        "Free checker, free widget, free monitoring to start. No credit card needed.",
    },
  ],
};

/**
 * OVERALL SCORING SCHEMA
 * Webenablix overall comparison score metrics
 */
export const compareScoresSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "Webenablix Comparison Scores",
  description:
    "Feature category scoring for Webenablix across all comparison dimensions",
  body: "Webenablix scores 97/100 overall, with 100/100 in Scanning & Detection, 98/100 in Remediation, 96/100 in Reporting & Export, 95/100 in Legal & Compliance, 98/100 in Support & Services, and 94/100 in Pricing & Plans. Customer ratings: 4.9/5 stars.",
};

/**
 * COMPETITOR OVERVIEW SCHEMA
 * Organizations being compared to Webenablix
 */
export const compareCompetitorsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Alternative Accessibility Platforms",
  description: "Competing accessibility solutions compared to Webenablix",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "accessiBe",
      description:
        "Accessibility platform emphasizing AI overlays and automated fixes",
      url: "https://www.accessibe.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AudioEye",
      description:
        "Accessibility and monitoring platform with professional services",
      url: "https://www.audioeye.com",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "UserWay",
      description: "Accessibility overlay and monitoring tool for compliance",
      url: "https://www.userway.org",
    },
  ],
};

/**
 * COMPARISON FAQ SCHEMA
 * Frequently asked questions about the comparison
 */
export const compareFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is Webenablix more expensive than some competitors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix includes AI-powered analysis on every issue, managed remediation services, expert support, and no long-term lock-in. You're paying for comprehensive accessibility management, not just a scanner.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from another platform to Webenablix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We make switching easy with data import assistance and a dedicated onboarding specialist. No long-term contracts to break.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Webenablix's AI analysis different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every accessibility violation gets a personalized explanation in plain language plus suggested code fixes. Other platforms only flag issues; Webenablix explains and fixes them.",
      },
    },
    {
      "@type": "Question",
      name: "Does Webenablix offer the same widget fix capabilities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix's widget covers all major accessibility fixes that can be solved via frontend overlays. However, Webenablix also offers manual remediation and managed services for issues requiring source code changes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get legal documentation for compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All plans include VPAT documentation, accessibility statements, compliance certificates, and litigation support materials. Enterprise plans include dedicated legal documentation support.",
      },
    },
    {
      "@type": "Question",
      name: "What if competitors claim they're more affordable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compare total value: support costs, implementation time, and services needed. Many competitors' low prices come with hidden annual commitments, premium support charges, and limited services. Webenablix pricing is transparent and month-to-month.",
      },
    },
  ],
};

/**
 * COMPARISON CALL-TO-ACTION SCHEMA
 * Main CTA for moving to Webenablix
 */
export const compareCTASchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Join Webenablix Today",
  description:
    "Switch to Webenablix and get AI-powered accessibility with expert support. Free to start, no credit card required.",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE COMPARISON PAGE SCHEMA GRAPH
 * Combines all comparison schemas into one integrated schema
 */
export const comparePageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    comparePageMainSchema,
    compareWebenablixDetailedSchema,
    compareAdvantagesSchema,
    compareScoresSchema,
    compareCompetitorsSchema,
    compareFaqSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE HOMEPAGE SCHEMAS - /
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * HOMEPAGE - MAIN LANDING PAGE SCHEMA
 * Complete landing page schema for homepage
 */
export const homePageLandingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix - Web Accessibility Compliance Platform",
  url: "https://www.webenablix.com",
  description:
    "Navigate ADA & WCAG compliance with ease. Webenablix helps websites become accessible to everyone with automated scanning, monitoring, fixes, and expert support.",
  image: {
    "@type": "ImageObject",
    url: "https://www.webenablix.com/homepage-hero.png",
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
  datePublished: "2023-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  isPartOf: {
    "@type": "WebSite",
    name: "Webenablix",
    url: "https://www.webenablix.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.webenablix.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Webenablix Accessibility Platform",
    description:
      "All-in-one platform for web accessibility compliance, monitoring, and fixes powered by AI",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
  },
};

/**
 * HOMEPAGE HERO OFFER SCHEMA
 * Main value proposition for the platform
 */
export const homePageHeroOfferSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Start Free Accessibility Scan",
  description:
    "Get instant WCAG & ADA compliance results for any website. No credit card required.",
  price: "0",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://www.webenablix.com",
  actionOption: {
    "@type": "TradeAction",
    name: "Free Scan",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.webenablix.com/register",
    },
  },
};

/**
 * HOMEPAGE PRODUCTS OVERVIEW
 * All products available on the platform
 */
export const homePageProductsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Product Suite",
  description: "Complete accessibility solution suite for every need",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Free Accessibility Checker",
      description: "Free WCAG & ADA compliance checker for any website",
      url: "https://www.webenablix.com/products/checker",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Accessibility Widget",
      description:
        "Embed accessibility controls for users including text size, contrast, dyslexia fonts",
      url: "https://www.webenablix.com/products/widget",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Accessibility Scanner",
      description:
        "Professional scans with detailed reports and AI-powered fix recommendations",
      url: "https://www.webenablix.com/products/audit",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Accessibility Monitor",
      description:
        "Continuous monitoring with alerts, analytics, and compliance tracking",
      url: "https://www.webenablix.com/products/monitor",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Managed Accessibility",
      description:
        "Full-service management with expert support and litigation protection",
      url: "https://www.webenablix.com/products/managed",
    },
  ],
};

/**
 * HOMEPAGE KEY FEATURES
 * Core features and capabilities
 */
export const homePageFeaturesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Platform Features",
  description:
    "Key features that make Webenablix the leading accessibility platform",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AI-Powered Scanning",
      description:
        "Automated detection of WCAG 2.1 & 2.2 violations across your entire website",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Instant Fix Suggestions",
      description:
        "AI generates plain-language explanations and developer-ready code fixes for each issue",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Continuous Monitoring",
      description:
        "24/7 monitoring with real-time alerts to catch regressions before production",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Compliance Reports",
      description:
        "Professional PDF, CSV, and JSON exports for stakeholders and auditors",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Expert Support",
      description:
        "CPACC-certified accessibility professionals available for every plan",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Accessibility Widget",
      description:
        "Embed user-facing controls for text size, contrast, dyslexia fonts, and more",
    },
  ],
};

/**
 * HOMEPAGE TRUST INDICATORS
 * Key metrics and social proof
 */
export const homePageTrustSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Trust Indicators",
  description:
    "Metrics demonstrating Webenablix platform strength and adoption",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "350,000+ Websites",
      description: "Continuously monitored by Webenablix",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "99.9% Uptime SLA",
      description: "Enterprise-grade reliability and availability",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "4.9★ Rating",
      description: "Trusted by 2,500+ customers and counting",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "2 Min Scans",
      description: "Fast scanning that doesn't impact your website performance",
    },
  ],
};

/**
 * HOMEPAGE WHY ACCESSIBILITY
 * Reasons accessibility matters
 */
export const homePageWhyAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Why Web Accessibility Matters",
  description:
    "Key reasons why web accessibility is critical for business and compliance",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Legal Compliance",
      description:
        "WCAG 2.1, ADA, Section 508, and international accessibility standards require compliance",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "4,600+ Lawsuits/Year",
      description:
        "Estimated ADA lawsuits filed annually against non-compliant websites",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "User Inclusion",
      description:
        "Enable 1 in 4 adults with disabilities to access your website",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "SEO Benefits",
      description:
        "Accessible websites rank higher in search results and have better engagement",
    },
  ],
};

/**
 * HOMEPAGE GETTING STARTED
 * Quick start process
 */
export const homePageGettingStartedSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Get Started with Webenablix",
  description: "Three simple steps to accessibility compliance",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Sign Up Free",
      text: "Create your free account. No credit card required.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Run Your First Scan",
      text: "Scan your website and get instant accessibility results.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Fix & Monitor",
      text: "Use AI-powered suggestions to fix issues and set up continuous monitoring.",
    },
  ],
};

/**
 * HOMEPAGE CTA SCHEMA
 * Main call-to-action
 */
export const homePageCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Start Free Accessibility Scan",
  description:
    "Test your website's accessibility now. No credit card required.",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE HOMEPAGE SCHEMA GRAPH
 * Combines all homepage schemas into one integrated schema
 */
export const homePageFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    homePageLandingSchema,
    homePageHeroOfferSchema,
    homePageProductsSchema,
    homePageFeaturesSchema,
    homePageTrustSchema,
    homePageWhyAccessibilitySchema,
    homePageGettingStartedSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// INSTALLATION EMBED PAGE SCHEMAS - /installation/embed
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * INSTALLATION EMBED PAGE - MAIN SCHEMA
 * Technical documentation page for embedding Webenablix widget
 */
export const installationEmbedPageSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "How to Install Webenablix Widget - Embed Method",
  url: "https://www.webenablix.com/installation/embed",
  image: "https://www.webenablix.com/installation-embed-hero.png",
  headline: "Add Webenablix to any website in 2 minutes",
  description:
    "The universal embed method works on every website. Paste one script tag and Webenablix is live. Complete guide with step-by-step instructions.",
  author: {
    "@type": "Organization",
    name: "Webenablix",
  },
  datePublished: "2023-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  dependencies: ["JavaScript enabled", "Access to HTML file or template"],
};

/**
 * INSTALLATION EMBED PROCESS SCHEMA
 * Step-by-step installation guide
 */
export const installationEmbedProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Embed Webenablix Widget",
  description:
    "4-step process for installing Webenablix accessibility widget on any website",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Get your API key",
      text: "Log in to your Webenablix dashboard and navigate to Settings → API Keys. Copy your unique site key.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Paste the script before </body>",
      text: "Open your HTML file and paste the Webenablix script snippet just before the closing </body> tag. Replace YOUR_API_KEY with the key from step 1.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Verify the widget loads",
      text: "Save and refresh your page. You should see the Webenablix accessibility icon in the bottom-right corner. Click it to confirm the widget opens correctly.",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Customize widget appearance",
      text: "Head to your Webenablix dashboard → Customize to change the widget position, color, and language to match your brand.",
    },
  ],
};

/**
 * INSTALLATION EMBED BENEFITS
 * Why use the embed method
 */
export const installationEmbedBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Benefits of Embed Installation Method",
  description: "Advantages of using the universal embed method for Webenablix",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Universal Compatibility",
      description:
        "Works on any website technology stack - HTML, React, WordPress, Shopify, and more",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Zero Performance Impact",
      description:
        "Async script loading ensures no impact on page load time or Core Web Vitals",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Quick Setup",
      description: "Paste one script tag - installation takes just 2 minutes",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "No Maintenance Required",
      description:
        "Updates are automatic. No manual updates or version management needed",
    },
  ],
};

/**
 * INSTALLATION EMBED PRO TIPS
 * Tips for successful embed installation
 */
export const installationEmbedTipsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pro Tips for Embed Installation",
  description: "Best practices and tips for embedding Webenablix widget",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Place script before </body>",
      description:
        "For fastest widget initialization, place the script as close to the closing </body> tag as possible",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Use one API key per domain",
      description:
        "One API key can cover multiple domains in your plan - convenient for subdomains or related sites",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Preview changes in dashboard",
      description:
        "Use the dashboard customization preview to see how widget changes will look before they go live",
    },
  ],
};

/**
 * INSTALLATION EMBED FAQ
 * Common installation questions
 */
export const installationEmbedFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the script slow down my page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — the script tag uses the async attribute, so it loads completely independently of your page content and has zero impact on your Core Web Vitals.",
      },
    },
    {
      "@type": "Question",
      name: "Can I place the script in the <head>?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but we recommend placing it before </body> to ensure the DOM is ready when the widget initialises.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work on multi-page and single-page apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The widget auto-initialises on page load and re-initialises on route changes in SPA frameworks like React and Vue.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get my API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sign up or log in at app.webenablix.com, go to Settings → Sites, and copy the key for your site.",
      },
    },
  ],
};

/**
 * INSTALLATION GUIDE LISTING
 * All available installation methods
 */
export const installationMethodsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Installation Methods",
  description: "Installation guides for all supported platforms and methods",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Embed",
      description: "Universal script embed method - works on any website",
      url: "https://www.webenablix.com/installation/embed",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "WordPress",
      description: "Install via functions.php or WordPress plugin",
      url: "https://www.webenablix.com/installation/wordpress",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Shopify",
      description: "Install via Shopify theme settings",
      url: "https://www.webenablix.com/installation/shopify",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Webflow",
      description: "Install in Webflow custom code settings",
      url: "https://www.webenablix.com/installation/webflow",
    },
  ],
};

/**
 * SOFTWARE APPLICATION - WEBENABLIX WIDGET
 * Detailed schema for the Webenablix accessibility widget
 */
export const webenablixWidgetSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Webenablix Accessibility Widget",
  url: "https://www.webenablix.com/products/widget",
  description:
    "Embeddable accessibility widget offering user controls, compliance features, and multi-language support",
  applicationCategory: "Accessibility Tool",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Free widget available for all plans",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2100",
    bestRating: "5",
  },
  featureList: [
    "Text size adjustment",
    "High contrast mode",
    "Dyslexia-friendly fonts",
    "Keyboard navigation enhancement",
    "Focus highlighting",
    "Multi-language support (26+ languages)",
    "Customizable appearance and position",
    "Zero performance impact",
  ],
};

/**
 * INSTALLATION EMBED CTA
 * Call-to-action for getting started
 */
export const installationEmbedCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Get My API Key",
  description: "Start installing Webenablix widget on your website",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
};

/**
 * COMPREHENSIVE INSTALLATION EMBED PAGE SCHEMA GRAPH
 * Combines all installation embed schemas
 */
export const installationEmbedFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    installationEmbedPageSchema,
    installationEmbedProcessSchema,
    installationEmbedBenefitsSchema,
    installationEmbedTipsSchema,
    installationEmbedFaqSchema,
    installationMethodsSchema,
    webenablixWidgetSchema,
  ],
};

/**
 * WORDPRESS INSTALLATION PAGE SCHEMAS
 * Comprehensive schemas for /installation/wordpress
 */

export const installationWordPressPageSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Install Webenablix on WordPress",
  url: "https://www.webenablix.com/installation/wordpress",
  description:
    "Install Webenablix on WordPress in 3 clicks using our official plugin or via manual functions.php method. No coding required for plugin installation.",
  headline: "WordPress Accessibility Widget Installation Guide",
  image: {
    "@type": "ImageObject",
    url: "https://www.webenablix.com/images/wordpress-installation.jpg",
    width: 1200,
    height: 630,
  },
  author: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  datePublished: "2023-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  articleBody:
    "Install Webenablix accessibility widget on your WordPress site using either the official plugin (recommended) or manual functions.php method. Both approaches support all WordPress themes, page builders, and caching plugins.",
  dependencies: ["WordPress 5.0+", "PHP 7.4+", "Paid Wix plan"],
  proficiencyLevel: "Beginner",
};

/**
 * WORDPRESS INSTALLATION PROCESS SCHEMA
 * 4-step WordPress installation process
 */
export const installationWordPressProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Install Webenablix on WordPress",
  description:
    "Step-by-step guide to install Webenablix on your WordPress site using the plugin method",
  totalTime: "PT3M",
  estimatedCost: {
    "@type": "PriceSpecification",
    priceCurrency: "USD",
    price: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Install the Webenablix plugin",
      text: 'Log in to your WordPress admin dashboard. Navigate to Plugins → Add New. Search for "Webenablix" in the search bar. Click "Install Now" on the official Webenablix plugin, then click "Activate".',
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Enter your API key",
      text: 'After activation, go to Settings → Webenablix in your admin sidebar. You\'ll see a field for your API key. Log in to your Webenablix dashboard, copy your site API key from Settings → API Keys, and paste it into the WordPress plugin settings. Click "Save Settings".',
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Verify the widget loads",
      text: "Visit your website's front end and look for the Webenablix accessibility icon in the bottom-right corner of the page. Click the icon to verify the widget opens and displays all accessibility options correctly.",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Clear caching if necessary",
      text: "If you use a caching plugin (WP Rocket, W3 Total Cache, etc.), clear the cache after activation. The widget may not appear on cached pages until the cache is refreshed. Then reload your frontend to confirm.",
    },
  ],
};

/**
 * WORDPRESS PLUGIN METHOD BENEFITS SCHEMA
 * Benefits of using the plugin installation method
 */
export const installationWordPressPluginBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Benefits of WordPress Plugin Installation",
  description:
    "Key advantages of using the official Webenablix WordPress plugin",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "No Coding Required",
      description:
        "Install and activate with just a few clicks. No need to edit functions.php or touch any code.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Automatic Updates",
      description:
        "Receive automatic security and feature updates directly from the WordPress plugin repository.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "One-Click Management",
      description:
        "Disable or uninstall with a single click. All plugin settings are stored safely in WordPress.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Theme & Builder Agnostic",
      description:
        "Works with all WordPress themes, including Elementor, Divi, Beaver Builder, and custom builds.",
    },
  ],
};

/**
 * WORDPRESS INSTALLATION TIPS SCHEMA
 * Pro tips for WordPress installation
 */
export const installationWordPressTipsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WordPress Installation Pro Tips",
  description:
    "Best practices and troubleshooting tips for Webenablix WordPress installation",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Always use the plugin method for easiest updates",
      description:
        "The official Webenablix WordPress plugin receives updates automatically. Manual functions.php installation requires manual updates.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Clear caching plugin cache after activation",
      description:
        "If using WP Rocket, W3 Total Cache, or LiteSpeed, clear the cache immediately after installing the plugin to see the widget appear.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Whitelist Webenablix CDN in security plugins",
      description:
        "If you use security plugins like Wordfence or Sucuri, whitelist cdn.webenablix.com to prevent the widget script from being blocked.",
    },
  ],
};

/**
 * WORDPRESS INSTALLATION FAQ SCHEMA
 * Common questions about WordPress installation
 */
export const installationWordPressFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "WordPress Installation FAQ",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Webenablix work with page builders like Elementor and Divi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Webenablix is completely independent of your page builder and works seamlessly alongside Elementor, Divi, Beaver Builder, and all other WordPress page builders. The plugin loads the widget globally on every page.",
      },
    },
    {
      "@type": "Question",
      name: "Will Webenablix conflict with other accessibility plugins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix is designed to run independently and won't conflict with other WordPress plugins. However, to avoid duplicate widget UI on your site, disable any other accessibility overlay or widget plugins if you have them installed.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work on WordPress multisite?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can install the Webenablix plugin network-wide to activate it on all sites in your multisite setup, or install it on individual sites with separate API keys for each site.",
      },
    },
    {
      "@type": "Question",
      name: "I use WP Rocket or W3 Total Cache — what should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After activating the Webenablix plugin, clear your caching plugin's cache completely. The widget will then appear on all cached pages. Optionally, add the Webenablix CDN domain (cdn.webenablix.com) to your caching plugin's excluded scripts list to prevent caching of the widget.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the manual functions.php method instead of the plugin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The plugin method is recommended for automatic updates, but you can manually add the Webenablix code to your theme's functions.php file as an alternative. This gives you full control but requires manual updates.",
      },
    },
  ],
};

/**
 * WORDPRESS CACHING COMPATIBILITY SCHEMA
 * Common caching plugins and compatibility
 */
export const installationWordPressCachingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WordPress Caching Plugin Compatibility",
  description:
    "Common WordPress caching plugins and how to use them with Webenablix",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "WP Rocket",
      description:
        'Fully compatible. Clear cache after installation. Optionally add cdn.webenablix.com to "Excluded Inline JS" for optimal loading.',
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "W3 Total Cache",
      description:
        "Fully compatible. Clear page cache and object cache after plugin activation to see widget immediately.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "LiteSpeed Cache",
      description:
        "Fully compatible. Purge all cache after activating the Webenablix plugin.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Cloudflare Caching",
      description:
        "Compatible. Webenablix script loads asynchronously from our CDN and won't be affected by Cloudflare page caching rules.",
    },
  ],
};

/**
 * WORDPRESS COMPATIBILITY SCHEMA
 * Platform and integration compatibility
 */
export const installationWordPressCompatibilitySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WordPress Platform Compatibility",
  description:
    "Feature compatibility across WordPress themes, builders, and configurations",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "All WordPress Themes",
      description:
        "Works with every WordPress theme including custom, commercial, and open-source themes.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "All Page Builders",
      description:
        "Supports Elementor, Divi, Beaver Builder, Thrive Architect, Oxygen Builder, and all other page builders.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "WordPress Multisite",
      description:
        "Full multisite support with network-wide installation or per-site API keys for separate management.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "WooCommerce Stores",
      description:
        "Fully compatible with WooCommerce. Accessibility widget works on product pages, checkout, and all store pages.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Custom Post Types",
      description:
        "Works on all WordPress pages, posts, custom post types, and custom taxonomy pages.",
    },
  ],
};

/**
 * WORDPRESS INSTALLATION CTA SCHEMA
 * Call-to-action for WordPress installation
 */
export const installationWordPressCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Get Started with WordPress",
  description: "Install Webenablix on your WordPress site now",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
  result: {
    "@type": "Thing",
    name: "Access your Webenablix dashboard",
  },
};

/**
 * WORDPRESS INSTALLATION FULL SCHEMA
 * Integrated @graph for WordPress installation page
 */
export const installationWordPressFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    installationWordPressPageSchema,
    installationWordPressProcessSchema,
    installationWordPressPluginBenefitsSchema,
    installationWordPressTipsSchema,
    installationWordPressFaqSchema,
    installationWordPressCachingSchema,
    installationWordPressCompatibilitySchema,
    installationWordPressCtaSchema,
    webenablixWidgetSchema,
  ],
};

/**
 * DOCUMENTATION PAGE SCHEMAS
 * Comprehensive schemas for /docs
 */

export const docsGettingStartedGuideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Getting Started with Webenablix",
  description:
    "Quick 3-step guide to integrate the Webenablix accessibility widget on any website",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Get your API key",
      text: "Sign up at app.webenablix.com. Navigate to Settings → Sites and copy your unique Site Key. This key authorizes your website to use Webenablix.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Add the script to your site",
      text: "Paste the Webenablix script tag just before the closing </body> tag in your HTML or global layout template. Replace YOUR_API_KEY with the key from step 1.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Verify the widget",
      text: "Reload your website. You should see the Webenablix accessibility icon in the bottom-right corner. Click it to confirm the widget displays correctly.",
    },
  ],
};

/**
 * DOCS WIDGET CONFIGURATION SCHEMA
 * Technical documentation for widget configuration
 */
export const docsWidgetConfigurationSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Widget Configuration & Customization",
  url: "https://www.webenablix.com/docs",
  description:
    "Complete guide to configuring widget position, language, colors, and behavior using window._webenablixConfig object",
  headline: "Advanced Widget Configuration Options",
  author: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  dependencies: ["JavaScript enabled", "Access to site HTML/templates"],
  proficiencyLevel: "Intermediate",
  keywords: [
    "widget configuration",
    "customization",
    "position",
    "language",
    "colors",
    "behavior",
  ],
};

/**
 * DOCS REST API REFERENCE SCHEMA
 * Technical documentation for REST API
 */
export const docsRestApiReferenceSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Webenablix REST API Reference",
  url: "https://www.webenablix.com/docs",
  description:
    "Complete REST API documentation including authentication, endpoints, rate limits, error handling, and webhooks",
  headline: "REST API Documentation & Reference",
  author: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  dependencies: [
    "API key with proper permissions",
    "HTTPS connection",
    "JSON request/response support",
  ],
  proficiencyLevel: "Advanced",
  keywords: [
    "REST API",
    "authentication",
    "endpoints",
    "rate limits",
    "webhooks",
    "JSON",
  ],
};

/**
 * DOCS MONITOR GUIDE SCHEMA
 * Accessibility monitoring features and capabilities
 */
export const docsMonitorGuideSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Accessibility Monitor Guide",
  description:
    "Complete guide to scanning, reporting, scheduling, and exporting accessibility data",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Continuous Scanning",
      description:
        "Automatically scan your entire website for WCAG 2.1, WCAG 2.2, Section 508, and EN 301 549 compliance issues on a schedule you define.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Detailed Reports",
      description:
        "View comprehensive accessibility reports showing found issues, affected pages, severity levels, remediation guidance, and impact metrics.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Scheduled Scans",
      description:
        "Set up automated daily, weekly, or monthly scans. Receive email notifications when issues are detected or when scan results are ready.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Data Export",
      description:
        "Export scan results and compliance reports as PDF, CSV, or JSON for audits, stakeholder reports, or documentation purposes.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Historical Tracking",
      description:
        "View accessibility trends over time. Track which issues were fixed, how compliance score changes, and monitor remediation progress.",
    },
  ],
};

/**
 * DOCS INTEGRATIONS SCHEMA
 * Supported platforms and integrations
 */
export const docsIntegrationsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Platform Integrations",
  description:
    "Supported platforms and integrations for Webenablix installation and usage",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "WordPress",
      description:
        "Official plugin available in WordPress plugin directory. Install with one click, no coding required.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Shopify",
      description:
        "Easy integration via theme settings or custom code. Full ecommerce compatibility with product pages and checkout flows.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Webflow",
      description:
        "Add via Webflow custom code feature. Fully compatible with Webflow hosting and custom domains.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Google Tag Manager",
      description:
        "Deploy Webenablix as a custom HTML tag via GTM. No code changes required to your website.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "GitHub Actions",
      description:
        "Automate accessibility scanning in your CI/CD pipeline. Generate reports on every deployment.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Universal Embed",
      description:
        "Works on any website regardless of platform or tech stack with a simple script tag.",
    },
  ],
};

/**
 * DOCS COMPLIANCE STANDARDS SCHEMA
 * Supported accessibility and compliance standards
 */
export const docsComplianceStandardsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Compliance Standards & Guidelines",
  description:
    "Accessibility and compliance standards supported and validated by Webenablix",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "WCAG 2.1",
      description:
        "Web Content Accessibility Guidelines 2.1. Compliance testing for A, AA, and AAA levels.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "WCAG 2.2",
      description:
        "Latest WCAG standards (2022). Tests for new success criteria and emerging accessibility best practices.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Section 508",
      description:
        "U.S. federal accessibility standard. Required for government and contractor websites.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "EN 301 549",
      description:
        "European accessibility standard. Required for public sector websites and services in EU.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "VPAT",
      description:
        "Voluntary Product Accessibility Template. Official accessibility conformance reporting format.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "ADA Compliance",
      description:
        "Americans with Disabilities Act requirements. Scan results specifically mapped to ADA compliance.",
    },
  ],
};

/**
 * DOCS SIDEBAR SECTIONS SCHEMA
 * Main documentation sections and categories
 */
export const docsSidebarSectionsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Documentation Sections",
  description: "Main sections and topics covered in Webenablix documentation",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Getting Started",
      description:
        "Introduction, Quick Start, Installation guides, and Core Concepts for new users.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Widget Documentation",
      description:
        "Widget overview, configuration, customization, JavaScript API, and event handling.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "REST API",
      description:
        "Authentication methods, API endpoints, rate limiting, error handling, and webhooks.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Accessibility Monitor",
      description:
        "Scanning capabilities, report generation, scheduling, and data export features.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Integrations",
      description:
        "Platform-specific guides for WordPress, Shopify, Webflow, GTM, and GitHub Actions.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Compliance",
      description:
        "WCAG 2.1, WCAG 2.2, Section 508, EN 301 549, and VPAT standards reference.",
    },
    {
      "@type": "ListItem",
      position: "7",
      name: "Reference",
      description:
        "Error codes, WCAG criteria mapping, changelog, and SDK documentation.",
    },
  ],
};

/**
 * DOCS CODE EXAMPLES SCHEMA
 * Common code examples and snippets
 */
export const docsCodeExamplesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Code Examples & Snippets",
  description:
    "Commonly used code examples for implementing Webenablix across different platforms",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Widget Script Tag",
      description:
        "Basic HTML snippet to add Webenablix widget to any website. Place before </body> tag.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Configuration Object",
      description:
        "JavaScript configuration example showing position, language, color, and behavior customization.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "JavaScript API Usage",
      description:
        "Examples demonstrating how to programmatically control the widget via the JS API.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "REST API Request",
      description:
        "Sample cURL and JavaScript fetch examples for authenticating to and using the REST API.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Webhook Handler",
      description:
        "Example webhook endpoint for receiving and processing Webenablix scan completion events.",
    },
  ],
};

/**
 * DOCS FAQ SCHEMA
 * Common questions about documentation and platform usage
 */
export const docsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Documentation FAQ",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a code sample or example project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Code Examples section contains common snippets including the widget script tag, configuration object, JavaScript API usage, REST API requests, and webhook handlers. See the Reference section for complete SDK documentation.",
      },
    },
    {
      "@type": "Question",
      name: "Which compliance standard should I target?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG 2.1 Level AA is the most common standard required by law in most regions. Check your local regulations. The Compliance section details WCAG 2.1, WCAG 2.2, Section 508 (US), EN 301 549 (EU), and ADA requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the REST API in production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The REST API is production-ready. Refer to the Authentication, Rate Limits, and Errors sections for best practices. All API endpoints support HTTPS and implement proper error handling.",
      },
    },
    {
      "@type": "Question",
      name: "What are the API rate limits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rate limits vary by plan. Standard plans allow 1,000 requests per day. See the REST API → Rate Limits section for your specific plan limits and how to request higher limits.",
      },
    },
    {
      "@type": "Question",
      name: "How do I report a bug or request a feature?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit the Changelog and Release Notes in the Reference section. For support, use the contact form on our website or email support@webenablix.com with your API key and a description of your issue.",
      },
    },
    {
      "@type": "Question",
      name: "Are there language packs for the widget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The widget supports 26+ languages. Use the language property in window._webenablixConfig to specify a language code, or use 'auto' to detect the browser's language automatically.",
      },
    },
  ],
};

/**
 * DOCS API AUTHENTICATION SCHEMA
 * REST API authentication methods and security
 */
export const docsApiAuthenticationSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "API Authentication & Security",
  url: "https://www.webenablix.com/docs",
  description:
    "Complete guide to authenticating with the Webenablix REST API using API keys and OAuth 2.0",
  headline: "REST API Authentication Methods",
  author: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  keywords: [
    "API authentication",
    "OAuth 2.0",
    "API key",
    "Bearer token",
    "security",
  ],
};

/**
 * DOCS FULL SCHEMA
 * Integrated @graph for documentation page
 */
export const docsFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    docsPageSchema,
    docsGettingStartedGuideSchema,
    docsWidgetConfigurationSchema,
    docsRestApiReferenceSchema,
    docsMonitorGuideSchema,
    docsIntegrationsSchema,
    docsComplianceStandardsSchema,
    docsSidebarSectionsSchema,
    docsCodeExamplesSchema,
    docsApiAuthenticationSchema,
    docsFaqSchema,
    organizationSchema,
  ],
};

/**
 * PRICING PAGE SCHEMAS
 * Comprehensive schemas for /pricing
 */

export const pricingBasicPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Basic Protection - Automated Plan",
  description:
    "Automated accessibility scanning, monitoring, and fixes with self-paced learning",
  price: "12",
  priceCurrency: "USD",
  billingDuration: "P1M",
  availability: "https://schema.org/InStock",
  url: "https://www.webenablix.com/pricing",
  category: "Automated",
  features: [
    "Automated accessibility scanning",
    "Continuous monitoring",
    "Automated fixes",
    "Developer tools",
    "Accessibility Help Desk",
    "Self-paced learning platform",
    "Accessibility widget included",
    "Email support",
  ],
};

export const pricingSelfManagedPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Self-Serviced Protection - Developer Plan",
  description:
    "Full developer tools, certification, custom training, scanner, and expert audit reports",
  price: "0",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://www.webenablix.com/pricing",
  category: "Self-Managed",
  priceSpecification: {
    "@type": "PriceSpecification",
    price: "Custom",
    description: "Contact sales for custom pricing",
  },
  features: [
    "Developer tools & APIs",
    "Certified expert guidance",
    "Custom training programs",
    "Accessibility scanner",
    "Expert audit and reporting",
    "Custom integration support",
    "Priority email & chat support",
    "Team collaboration tools",
  ],
};

export const pricingManagedPlanSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Maximum Protection - Managed Service",
  description:
    "Full-service managed accessibility compliance with expert team handling everything",
  price: "0",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://www.webenablix.com/pricing",
  category: "Managed",
  priceSpecification: {
    "@type": "PriceSpecification",
    price: "Custom",
    description: "Contact sales for custom pricing",
  },
  features: [
    "Automated accessibility scanning & monitoring",
    "Continuous monitoring",
    "Custom-written accessibility fixes",
    "Webenablix Assurance guarantee",
    "Expert audit and reporting",
    "Dedicated account manager",
    "Monthly strategy reviews",
    "SLA support",
    "Expert remediation services",
  ],
};

/**
 * PRICING COMPARISON SCHEMA
 * Feature comparison across pricing tiers
 */
export const pricingComparisonSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Pricing Feature Comparison",
  description:
    "Detailed feature comparison across Basic, Self-Serviced, and Managed protection plans",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Automated Monitoring",
      basicPlan: true,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Automated Fixes",
      basicPlan: true,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Accessibility Help Desk",
      basicPlan: true,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Developer Tools",
      basicPlan: true,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Certified Expert Guidance",
      basicPlan: false,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Custom Training",
      basicPlan: false,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "7",
      name: "Expert Audit & Reporting",
      basicPlan: false,
      selfManagedPlan: true,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "8",
      name: "Custom-Written Fixes",
      basicPlan: false,
      selfManagedPlan: false,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "9",
      name: "Webenablix Assurance",
      basicPlan: false,
      selfManagedPlan: false,
      managedPlan: true,
    },
    {
      "@type": "ListItem",
      position: "10",
      name: "Dedicated Account Manager",
      basicPlan: false,
      selfManagedPlan: false,
      managedPlan: true,
    },
  ],
};

/**
 * PRICING PLANS OVERVIEW SCHEMA
 * Overview of all three pricing tiers
 */
export const pricingPlansOverviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Pricing Plans Overview",
  description: "Overview of all available pricing plans and their use cases",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Basic Protection Plan",
      description:
        "$12/month automated accessibility compliance for small websites. Includes continuous monitoring, automated fixes, and learning resources.",
      targetAudience: "Small businesses, startups, independent developers",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Self-Serviced Protection Plan",
      description:
        "Custom pricing for developer teams. Includes developer tools, expert guidance, custom training, scanner, and professional audit reports.",
      targetAudience: "Development teams, digital agencies, enterprise IT",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Maximum Protection Plan",
      description:
        "Custom pricing fully managed service. Expert team handles scanning, monitoring, fixes, and maintains Webenablix Assurance guarantee.",
      targetAudience: "Enterprise, large organizations, regulated industries",
    },
  ],
};

/**
 * PRICING VALUE PROPOSITION SCHEMA
 * Key value points and benefits
 */
export const pricingValueSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Pricing Value Propositions",
  description: "Key benefits and value across Webenablix pricing plans",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Flexible Pricing Solutions",
      description:
        "Plans for every budget and business size, from $12/month to fully custom enterprise packages",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "No Hidden Fees",
      description:
        "Transparent pricing with all features listed. No surprise charges or mandatory upgrades",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Free Trial Available",
      description:
        "Start with Basic Protection free trial. Test the platform before committing to paid plans",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Expert Support Included",
      description:
        "All plans include access to accessibility experts and Help Desk support",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Automated Compliance",
      description:
        "Continuous scanning and automated fixes reduce manual remediation work",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Scalable Solutions",
      description:
        "Plans scale from single sites to enterprise-wide sustainability initiatives",
    },
  ],
};

/**
 * PRICING FAQ SCHEMA
 * Common questions about Webenablix pricing
 */
export const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Pricing FAQ",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I try Webenablix for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes! The Basic Protection plan (Automated) includes a free trial period. Start your free trial by clicking "Start Free Trial" on the pricing page. No credit card required.',
      },
    },
    {
      "@type": "Question",
      name: 'What does "Most Popular" mean for Self-Serviced Protection?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'The Self-Serviced Protection plan is marked "Most Popular" because it provides the best balance of features and value for development teams. It includes developer tools, expert guidance, custom training, and professional audit reports.',
      },
    },
    {
      "@type": "Question",
      name: "How is the Custom pricing for Self-Serviced and Managed plans calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Custom pricing depends on factors like: website size, number of pages, required integrations, team size, support level, and training needs. Contact our sales team to discuss your specific requirements and get a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch between plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle. Our team can help you transition to a different plan that better meets your evolving needs.",
      },
    },
    {
      "@type": "Question",
      name: "What is Webenablix Assurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webenablix Assurance is a guarantee included with the Managed Protection plan. It ensures that your website maintains accessibility compliance. If issues are found, our expert team remediates them at no additional cost.",
      },
    },
    {
      "@type": "Question",
      name: "Which plan is right for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose based on your needs: Basic Protection ($12/month) for automated monitoring and learning; Self-Serviced Protection (Custom) if your team wants developer tools and expert guidance; Maximum Protection (Custom) if you want our experts to handle everything. Contact sales if you're unsure.",
      },
    },
    {
      "@type": "Question",
      name: "Are there discounts for annual billing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Annual billing typically offers 20% savings compared to monthly billing. Contact our sales team at sales@webenablix.com to discuss annual plans and volume discounts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer discounts for nonprofits or educational institutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer special pricing for qualified nonprofits and educational institutions. Please contact our sales team with your nonprofit status or .edu email to discuss eligibility and available discounts.",
      },
    },
  ],
};

/**
 * PRICING CTA SCHEMA
 * Call-to-action for pricing page
 */
export const pricingCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Start with Webenablix",
  description: "Choose your plan and start improving accessibility compliance",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/register",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
  result: {
    "@type": "Thing",
    name: "Access your Webenablix dashboard",
  },
};

/**
 * ENHANCED PRICING PAGE SCHEMA
 * Updated comprehensive pricing page schema
 */
export const pricingPageEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix Pricing Plans",
  url: "https://www.webenablix.com/pricing",
  description:
    "Choose the right accessibility compliance plan for your business. Flexible pricing from $12/month to custom enterprise packages.",
  image: "https://www.webenablix.com/pricing-hero.png",
  mainEntity: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    offers: [
      pricingBasicPlanSchema,
      pricingSelfManagedPlanSchema,
      pricingManagedPlanSchema,
    ],
  },
};

/**
 * PRICING FULL SCHEMA
 * Integrated @graph for pricing page
 */
export const pricingFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    pricingPageEnhancedSchema,
    pricingBasicPlanSchema,
    pricingSelfManagedPlanSchema,
    pricingManagedPlanSchema,
    pricingComparisonSchema,
    pricingPlansOverviewSchema,
    pricingValueSchema,
    pricingFaqSchema,
    pricingCtaSchema,
    organizationSchema,
  ],
};

/**
 * ABOUT PAGE SCHEMAS
 * Comprehensive schemas for /about
 */

export const aboutCompanyStatsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Company Statistics",
  description:
    "Key metrics and achievements demonstrating Webenablix impact and scale",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Websites Protected",
      value: "40,000+",
      description:
        "Over 40,000 websites across all industries are protected by Webenablix accessibility solutions",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Uptime SLA",
      value: "99.7%",
      description:
        "Industry-leading 99.7% uptime SLA with 4M page checks per day powered by global CDN infrastructure",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Countries Served",
      value: "190+",
      description:
        "Webenablix serves customers across 190+ countries with support in 26+ languages",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Rating",
      value: "#1",
      description:
        "Rated #1 Accessibility Tool on G2 by customers for ease of use, support, and compliance results",
    },
  ],
};

export const aboutCompanyValuesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Core Values",
  description:
    "Six core values that guide Webenablix mission, product decisions, and company culture",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Inclusion First",
      description:
        "We believe the web is for everyone. Every feature, every decision starts by asking: does this make the web more inclusive?",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Trust & Transparency",
      description:
        "No dark patterns, no hidden limitations. Our pricing, our scan methodology, and our compliance reports are fully transparent.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Relentless Innovation",
      description:
        "Accessibility standards evolve — so do we. We ship WCAG 2.2 support, AI-powered fix suggestions, and CI/CD tooling ahead of the market.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Customer Obsession",
      description:
        "Our NPS is 78 and climbing. We embed with customers' engineering teams, attend court cases with them, and celebrate compliance wins together.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Impact at Scale",
      description:
        "Over 2.3 billion people live with a disability. Every site we make accessible is a real person who can now bank, learn, shop, or connect online.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Sustainable Growth",
      description:
        "We are profitable, independent, and built to last — not chasing funding rounds but focused on long-term customer success.",
    },
  ],
};

export const aboutCompanyHistorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Company Timeline",
  description:
    "Webenablix founding story and major milestones from 2019 to 2026",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "2019 - Founded",
      date: "2019",
      description:
        "Three former WCAG auditors start Webenablix from a co-working space in Austin, TX, frustrated that accessibility compliance required months of manual effort.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "2020 - First 1,000 Sites",
      date: "2020",
      description:
        "The widget and monitor launch in private beta. 1,000 sites go live within 90 days, driven entirely by word-of-mouth from accessibility consultants.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "2021 - Series A $8M",
      date: "2021",
      description:
        "Raised $8M to build the REST API, CMS integrations, and expand to the EU market. Team grows from 6 to 35.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "2022 - Enterprise & VPAT",
      date: "2022",
      description:
        "Launched enterprise-grade VPAT reports, SLA-backed managed remediation, and SOC 2 Type II certification. ARR crosses $5M.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "2023 - 10,000 Customers",
      date: "2023",
      description:
        "Crossed 10,000 active sites protected. Launched the GitHub Actions integration and AI-generated fix suggestions — an industry first.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "2024 - WCAG 2.2 & Global Scale",
      date: "2024",
      description:
        "First accessibility platform to ship full WCAG 2.2 AA automated coverage. Expanded to Asia-Pacific with local support in 8 languages.",
    },
    {
      "@type": "ListItem",
      position: "7",
      name: "2025 - 40,000+ Sites",
      date: "2025",
      description:
        "Now serving 40,000+ websites across 190 countries. Launched Managed Accessibility bundles and the accessibility developer SDK.",
    },
    {
      "@type": "ListItem",
      position: "8",
      name: "2026 - AI-Native Remediation",
      date: "2026",
      description:
        "Building AI-native remediation that auto-patches issues directly in your codebase — making manual accessibility fixes a thing of the past.",
    },
  ],
};

export const aboutTeamLeadershipSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Leadership Team",
  description:
    "Executive leadership at Webenablix founding and senior management",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Sarah Chen",
      jobTitle: "Co-founder & CEO",
      affiliation: "Webenablix",
      description:
        "Former WCAG lead auditor at Deloitte. Certified IAAP CPACC. Spoke at CSUN Assistive Technology Conference 7 years running.",
      workLocation: "Austin, TX",
      expertise: [
        "WCAG Compliance",
        "Accessibility Auditing",
        "Product Strategy",
      ],
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Marcus Oyelaran",
      jobTitle: "Co-founder & CTO",
      affiliation: "Webenablix",
      description:
        "Previously Staff Engineer at Cloudflare. Built the edge scanning infrastructure that runs 4M page checks per day.",
      workLocation: "London, UK",
      expertise: ["Infrastructure", "Distributed Systems", "Performance"],
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Priya Nair",
      jobTitle: "Co-founder & CPO",
      affiliation: "Webenablix",
      description:
        "Accessibility researcher & product designer. Contributed to the WCAG 2.2 working group and authored 20+ WCAG technique documents.",
      workLocation: "Austin, TX",
      expertise: ["Accessibility Research", "Product Design", "WCAG Standards"],
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Daniel Torres",
      jobTitle: "VP of Engineering",
      affiliation: "Webenablix",
      description:
        "12 years in developer tooling. Led infrastructure at HashiCorp before joining Webenablix to scale the API platform.",
      workLocation: "San Francisco, CA",
      expertise: ["Engineering Leadership", "API Design", "Scalability"],
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Aisha Kamara",
      jobTitle: "Head of Compliance",
      affiliation: "Webenablix",
      description:
        "Former DOJ accessibility consultant. Expert in ADA, Section 508, EN 301 549, and AODA. Manages VPAT and legal-hold reporting.",
      workLocation: "Washington, DC",
      expertise: ["Compliance", "Legal Accessibility", "VPAT"],
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "James Park",
      jobTitle: "Head of Customer Success",
      affiliation: "Webenablix",
      description:
        "Grew Webenablix's NPS from 54 to 78 in 18 months. Formerly VP of CS at Intercom. Leads a global team of 40 accessibility specialists.",
      workLocation: "Seoul / Remote",
      expertise: ["Customer Success", "Team Leadership", "Support Operations"],
    },
  ],
};

export const aboutCompanyRecognitionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Awards & Recognition",
  description:
    "Industry awards and recognition demonstrating Webenablix leadership in web accessibility",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "G2 Leader",
      organization: "G2",
      award: "Leader — Web Accessibility, Spring 2026",
      rating: "4.9 out of 5 stars",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Capterra Best Ease of Use",
      organization: "Capterra",
      award: "Best Ease of Use — Accessibility Software",
      rating: "4.8 out of 5 stars",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "W3C WAI Partner",
      organization: "W3C WAI",
      award: "Endorsed Implementation Partner",
      description:
        "Recognized by W3C Web Accessibility Initiative as trusted implementation partner",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Deloitte Fast 500",
      organization: "Deloitte",
      award: "Fastest Growing Tech Company — 2025",
      description: "Named among North America's fastest-growing tech companies",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Best Accessibility Software",
      organization: "Software.com",
      award: "Best Accessibility Software Platform",
      rating: "4.7 out of 5 stars",
    },
  ],
};

export const aboutCompanyMissionSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webenablix",
  url: "https://www.webenablix.com/about",
  description:
    "Webenablix is the leading AI-powered web accessibility compliance platform serving 40,000+ websites across 190+ countries",
  foundingDate: "2019-01-01",
  foundingLocation: {
    "@type": "Place",
    name: "Austin, Texas, USA",
  },
  mission:
    "To make the web accessible to everyone by making compliance simple, fast, and scalable with AI-powered automation and expert guidance",
  vision:
    "A web where over 2 billion people with disabilities can independently access, learn, work, shop, and connect online",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "150",
  },
  employees: 6,
  knowsAbout: [
    "Web Accessibility",
    "WCAG 2.1 Compliance",
    "WCAG 2.2 Compliance",
    "ADA Compliance",
    "Section 508",
    "Inclusive Design",
    "AI/Machine Learning",
  ],
  awards: [
    "G2 Leader — Spring 2026",
    "Capterra Best Ease of Use",
    "W3C WAI Endorsed Partner",
    "Deloitte Fast 500",
    "Best Accessibility Software",
  ],
  sameAs: [
    "https://twitter.com/webenablix",
    "https://linkedin.com/company/webenablix",
    "https://github.com/webenablix",
  ],
  contact: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "support@webenablix.com",
  },
};

export const aboutCultureSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Company Culture",
  description: "Key aspects of Webenablix company culture and work environment",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Accessibility-First Engineering",
      description:
        "Every team member writes accessible code. Accessibility is not a separate function — it's embedded in the product DNA.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Customer Immersion",
      description:
        "Engineering and leadership spend time directly with customers. We attend web accessibility lawsuits, sit in strategy calls, and celebrate compliance wins together.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Continuous Learning",
      description:
        "WCAG standards evolve constantly. We provide learning budgets, host monthly accessibility talks, and celebrate cross-functional teaching.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Global & Distributed",
      description:
        "Office in Austin, Austin distributed across 150+ people across 6 continents. We work async-first and value deep focus time.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Neurodiverse-Friendly",
      description:
        "We actively hire and support neurodivergent team members. Flexible hours, fidget-friendly spaces, and sensory-aware work environments.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Profitable & Independent",
      description:
        "We are profitably and independently owned. No exit pressure. Decisions prioritize long-term customer success over short-term growth metrics.",
    },
  ],
};

export const aboutCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Join the Webenablix Team",
  description: "Explore job opportunities at Webenablix",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/careers",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
  result: {
    "@type": "Thing",
    name: "View open positions",
  },
};

/**
 * ABOUT FULL SCHEMA
 * Integrated @graph for about page
 */
export const aboutFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    aboutPageSchema,
    aboutCompanyStatsSchema,
    aboutCompanyValuesSchema,
    aboutCompanyHistorySchema,
    aboutTeamLeadershipSchema,
    aboutCompanyRecognitionSchema,
    aboutCompanyMissionSchema,
    aboutCultureSchema,
    aboutCtaSchema,
    organizationSchema,
  ],
};

/**
 * BLOGS PAGE SCHEMAS
 * Comprehensive schemas for /blogs
 */

export const blogsCategoryGuideSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Blog Categories",
  description:
    "Main topic categories covered in the Webenablix accessibility blog",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Compliance",
      description:
        "WCAG 2.1, WCAG 2.2, Section 508, ADA, and EN 301 549 compliance guidance, standards updates, and best practices",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Legal",
      description:
        "Web accessibility litigation, ADA enforcement trends, legal case studies, and risk mitigation strategies",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Development",
      description:
        "Code examples, accessibility APIs, testing techniques, and developer tools for building accessible websites",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Design",
      description:
        "Inclusive design patterns, color contrast, typography, user research, and accessibility in design systems",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Product",
      description:
        "Product management, accessibility roadmaps, business cases, ROI measurement, and stakeholder communication",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Strategy",
      description:
        "Long-term accessibility programs, organizational alignment, team building, and scaling accessibility practices",
    },
  ],
};

export const blogsFeaturedPostsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Webenablix Blog Posts",
  description:
    "Most popular and recently published accessibility guides from the Webenablix blog",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "WCAG 2.2: What's New and How to Comply",
      author: "Sarah Mitchell",
      datePublished: "2026-02-12",
      keywords: ["WCAG 2.2", "compliance", "success criteria"],
      readTime: "8 min",
      category: "Compliance",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "ADA Compliance in 2026: What Every Business Must Know",
      author: "James Harlow",
      datePublished: "2026-01-28",
      keywords: ["ADA", "legal", "compliance"],
      readTime: "6 min",
      category: "Legal",
    },
  ],
};

export const blogAuthorExpertiseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Blog Authors & Expertise",
  description:
    "Expert authors and contributors to the Webenablix accessibility blog",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Sarah Mitchell",
      jobTitle: "Accessibility Lead",
      expertise: ["WCAG Compliance", "Standards Updates", "Remediation"],
      description:
        "Former WCAG working group member with 10+ years in accessibility compliance",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "James Harlow",
      jobTitle: "Legal & Compliance Writer",
      expertise: ["ADA Law", "Litigation", "Risk Management"],
      description:
        "Legal expert specializing in web accessibility compliance and enforcement trends",
    },
  ],
};

export const blogContentGuidanceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Blog Content Guidance",
  description:
    "Key content types and guidance topics covered in the Webenablix blog",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "How-To Guides",
      description:
        "Step-by-step instructions for implementing accessibility features, fixing issues, and auditing websites",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Standard Explanations",
      description:
        "In-depth explanations of WCAG criteria, Section 508, ADA requirements, and EN 301 549 standards",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Case Studies",
      description:
        "Real-world examples of accessibility implementations, litigation cases, and remediation success stories",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Industry News",
      description:
        "Updates on new standards, court rulings, enforcement actions, and emerging accessibility practices",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Best Practices",
      description:
        "Proven techniques, patterns, and approaches for building and maintaining accessible websites",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Tool Reviews",
      description:
        "Evaluations of accessibility tools, scanners, testing frameworks, and monitoring solutions",
    },
  ],
};

export const blogAudienceGuidanceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Blog Audience Guidelines",
  description:
    "Blog content organized by reader expertise level and professional role",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Developers",
      description:
        "Code examples, testing techniques, API documentation, and implementation guides for engineers",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Designers",
      description:
        "Design patterns, color contrast, typography, interaction design, and design system accessibility",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Project Managers",
      description:
        "Roadmapping, stakeholder communication, business cases, and accessibility program management",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Legal & Compliance",
      description:
        "Regulatory requirements, litigation trends, risk assessment, and compliance documentation",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Executives & Leaders",
      description:
        "Strategic importance, ROI metrics, risk mitigation, and organizational alignment",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Accessibility Specialists",
      description:
        "Advanced techniques, standards evolution, auditing methodology, and expert perspectives",
    },
  ],
};

export const blogSearchabilitySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Popular Blog Search Topics",
  description:
    "Common accessibility topics readers search for in the Webenablix blog",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "WCAG Compliance",
      keywords: [
        "WCAG 2.1",
        "WCAG 2.2",
        "Level AA",
        "Level AAA",
        "success criteria",
      ],
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "ADA Compliance",
      keywords: [
        "ADA",
        "lawsuit",
        "litigation",
        "legal requirements",
        "enforcement",
      ],
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Accessibility Testing",
      keywords: [
        "testing",
        "auditing",
        "scanning",
        "manual testing",
        "automated testing",
      ],
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Color & Contrast",
      keywords: ["color contrast", "WCAG AA", "color blindness", "color alone"],
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Keyboard Navigation",
      keywords: [
        "keyboard",
        "focus",
        "tab navigation",
        "keyboard trap",
        "keyboard only",
      ],
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Screen Reader Support",
      keywords: [
        "screen reader",
        "ARIA",
        "semantic HTML",
        "alt text",
        "labels",
      ],
    },
  ],
};

export const blogSubscriptionCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Subscribe to Webenablix Blog",
  description:
    "Get accessibility insights, compliance updates, and best practices delivered to your inbox",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/blogs/subscribe",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
  result: {
    "@type": "Thing",
    name: "Subscribe to blog updates",
  },
};

export const blogsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Webenablix Blog - Web Accessibility Guides",
  url: "https://www.webenablix.com/blogs",
  description:
    "Expert guides, case studies, and insights on WCAG compliance, ADA regulations, and accessible web design from the Webenablix team",
  image: "https://www.webenablix.com/blogs-hero.png",
  author: {
    "@type": "Organization",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Webenablix",
    url: "https://www.webenablix.com",
  },
  mainEntity: {
    "@type": "Blog",
    name: "Webenablix Accessibility Blog",
    description:
      "Expert advice on web accessibility, WCAG compliance, legal requirements, and inclusive design",
    url: "https://www.webenablix.com/blogs",
  },
};

/**
 * BLOGS FULL SCHEMA
 * Integrated @graph for blogs collection page
 */
export const blogsFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    blogsCollectionSchema,
    blogsCategoryGuideSchema,
    blogsFeaturedPostsSchema,
    blogAuthorExpertiseSchema,
    blogContentGuidanceSchema,
    blogAudienceGuidanceSchema,
    blogSearchabilitySchema,
    blogSubscriptionCtaSchema,
    organizationSchema,
  ],
};

/**
 * AGENCY PARTNER SCHEMAS
 * Comprehensive schemas for /agency
 */

export const agencyPartnerTiersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Partner Program Tiers",
  description:
    "Four partner tiers with increasing benefits, commission rates, and support levels",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Certified Partner",
      requirement: "5+ client referrals per year",
      commission: "20% recurring",
      features: [
        "Co-branded proposal templates",
        "Partner badge & directory listing",
        "Partner sales portal access",
        "Dedicated onboarding call",
        "NFR license for demos",
        "Email support SLA: 24 hours",
      ],
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Silver Partner",
      requirement: "15+ client referrals per year",
      commission: "25% recurring",
      features: [
        "All Certified Partner benefits",
        "Priority directory placement",
        "Monthly co-marketing budget ($500/qtr)",
        "Quarterly business reviews",
        "Early feature access",
        "Email & chat support SLA: 8 hours",
      ],
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Gold Partner",
      requirement: "30+ client referrals per year",
      commission: "30% recurring",
      badge: "Most Popular",
      features: [
        "All Silver Partner benefits",
        "Featured in newsletter & blog",
        "Quarterly co-marketing budget ($1,500/qtr)",
        "Joint webinars & case studies",
        "Dedicated partner success manager",
        "Phone + email support SLA: 4 hours",
      ],
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Elite Partner",
      requirement: "60+ client referrals per year",
      commission: "35% recurring + bonuses",
      badge: "By Invitation",
      features: [
        "All Gold Partner benefits",
        "Custom white-label option",
        "Executive co-selling & deal registration",
        "Unlimited co-marketing budget",
        "Priority roadmap input & beta access",
        "24/7 dedicated phone support",
      ],
    },
  ],
};

export const agencyPartnerBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Webenablix Partner Program Benefits",
  description:
    "Six key benefits partners receive from joining the Webenablix partner program",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Industry-Leading Commissions",
      description:
        "Earn 20–35% recurring revenue on every client referral for the lifetime of their subscription. Most partners recoup annual costs in week one.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "White-Label Ready",
      description:
        "Gold and Elite partners can offer Webenablix as their own branded accessibility product with their own logo, domain, and pricing.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Co-Branded Marketing Materials",
      description:
        "Proposal decks, one-pagers, case studies, and compliance reports — all co-branded and ready to send to clients immediately.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Dedicated Partner Support",
      description:
        "Get a named partner success manager, not a ticket queue. Fast answers, joint discovery sessions, and deal-closing support.",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Partner Portal & Dashboard",
      description:
        "Track referrals, commissions, client health scores, renewal dates. Commission payouts every 30 days with no minimum.",
    },
    {
      "@type": "ListItem",
      position: "6",
      name: "Certification & Training",
      description:
        "Free WCAG and Webenablix certification for your team. Certified consultants command higher rates.",
    },
  ],
};

export const agencyPartnerUseCasesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Agency Partner Use Cases",
  description: "Ideal use cases and agency types for Webenablix partnership",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Web Design & Development Agencies",
      description:
        "Embed accessibility compliance into every project. Offer as premium add-on or include in retainers for recurring revenue.",
      tags: ["Recurring Revenue", "Retainer Add-on", "White-label"],
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "Digital Marketing Agencies",
      description:
        "Improve SEO performance and expand service offerings. Accessibility drives organic reach for enterprise clients.",
      tags: ["SEO Uplift", "Upsell", "Enterprise Ready"],
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Legal & Compliance Consultancies",
      description:
        "Pair legal expertise with automated compliance tooling. Help clients achieve ADA, Section 508, and EN 301 549 compliance faster.",
      tags: ["ADA Compliance", "Section 508", "VPAT"],
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "SaaS & Technology Resellers",
      description:
        "Bundle Webenablix into existing platform stacks. Joint billing, API integration, and OEM agreements available at Elite tier.",
      tags: ["OEM", "API Integration", "Bundling"],
    },
  ],
};

export const agencyPartnerProcessSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Become a Webenablix Partner",
  description: "Simple 3-step process to join the Webenablix partner program",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Apply Online",
      text: "Fill in the partner application — takes under 5 minutes. Webenablix reviews and responds within one business day.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Onboarding Call",
      text: "Schedule a 45-minute call with your partner success manager to set up your account, access the portal, and agree on your go-to-market plan.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Start Earning",
      text: "Begin referring clients and earning recurring commissions. Access co-marketing materials, training, and dedicated support to help you succeed.",
    },
  ],
};

export const agencyPartnerCommissionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Partner Commission & Revenue Structure",
  description:
    "Commission structure and revenue details for Webenablix partners",
  itemListElement: [
    {
      "@type": "ListItem",
      position: "1",
      name: "Recurring Revenue Model",
      description:
        "Earn 20–35% commission on recurring subscription revenue for the lifetime of each referred customer.",
    },
    {
      "@type": "ListItem",
      position: "2",
      name: "No Minimum Payouts",
      description:
        "Commission payouts every 30 days regardless of total earned during the period.",
    },
    {
      "@type": "ListItem",
      position: "3",
      name: "Lifetime Relationship",
      description:
        "Continue earning commissions as long as the referred customer remains a Webenablix subscriber.",
    },
    {
      "@type": "ListItem",
      position: "4",
      name: "Tiered Commission Rates",
      description:
        "Higher tiers earn higher commission percentages: Certified (20%), Silver (25%), Gold (30%), Elite (35% + bonuses).",
    },
    {
      "@type": "ListItem",
      position: "5",
      name: "Transparent Tracking",
      description:
        "Partner portal dashboard shows real-time commission tracking, referral status, and payout history.",
    },
  ],
};

export const agencyPartnerFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Webenablix Partner Program FAQ",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to have existing experience with Webenablix to apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All partners complete onboarding and certification. If you already use Webenablix with your clients, you'll likely qualify for a higher tier immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What if a client approaches me directly instead of through a referral?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you bring them in through your partnership, you earn commissions. Direct outbound by Webenablix to a prospect in your territory requires deal registration — contact your partner manager.",
      },
    },
    {
      "@type": "Question",
      name: "Can I resell Webenablix as my own product (white-label)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Gold and Elite partners can offer white-label solutions. Elite partners get custom branding, domain, and pricing control.",
      },
    },
    {
      "@type": "Question",
      name: "Are there exclusivity requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can partner with competing accessibility tools. However, Webenablix offers the most competitive commissions in the market.",
      },
    },
    {
      "@type": "Question",
      name: "How often do I get paid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commissions are calculated and paid out every 30 days. There is no minimum earnings threshold for payouts.",
      },
    },
    {
      "@type": "Question",
      name: "What support do partners get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each tier receives different support levels: Certified (24-hour email), Silver (8-hour email/chat), Gold (4-hour phone/email), Elite (24/7 dedicated phone). All includes a dedicated partner success manager.",
      },
    },
    {
      "@type": "Question",
      name: "Can I move up tiers or switch tiers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your tier is based on annual referral volume. As you refer more clients, you can move up to higher tiers. Tiers are evaluated annually.",
      },
    },
  ],
};

export const agencyPartnerMainSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Webenablix Partner Program",
  url: "https://www.webenablix.com/agency",
  description:
    "Join the Webenablix partner program and earn 20-35% recurring commissions. Become a certified accessibility partner with white-label options and dedicated support.",
  image: "https://www.webenablix.com/agency-hero.png",
  mainEntity: {
    "@type": "Service",
    name: "Webenablix Partner Program",
    description:
      "Partner program offering recurring commissions, white-label options, and dedicated support for agencies",
    provider: {
      "@type": "Organization",
      name: "Webenablix",
      url: "https://www.webenablix.com",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      pricingDetails:
        "Commission-based: 20-35% recurring revenue per referred customer",
    },
  },
};

export const agencyPartnerCtaSchema = {
  "@context": "https://schema.org",
  "@type": "Action",
  name: "Apply for Webenablix Partner Program",
  description:
    "Join the Webenablix partner network and start earning recurring commissions",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://www.webenablix.com/apply-partner",
    actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
  },
  result: {
    "@type": "Thing",
    name: "Start your partner application",
  },
};

/**
 * AGENCY FULL SCHEMA
 * Integrated @graph for agency/partner page
 */
export const agencyFullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    agencyPartnerMainSchema,
    agencyPartnerTiersSchema,
    agencyPartnerBenefitsSchema,
    agencyPartnerUseCasesSchema,
    agencyPartnerProcessSchema,
    agencyPartnerCommissionSchema,
    agencyPartnerFaqSchema,
    agencyPartnerCtaSchema,
    organizationSchema,
  ],
};
