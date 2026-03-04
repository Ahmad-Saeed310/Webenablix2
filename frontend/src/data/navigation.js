// Navigation data with dropdowns

export const productsMenu = [
  {
    name: 'Free Accessibility Checker',
    description: 'Free WCAG & ADA Compliance Checker',
    href: '/products/checker',
    isNew: true
  },
  {
    name: 'Widget',
    description: 'AI-Enhanced Accessibility for Your Website',
    href: '/products/widget'
  },
  {
    name: 'Audit',
    description: 'Audit for ADA & WCAG accessibility compliance',
    href: '/products/audit'
  },
  {
    name: 'Managed Accessibility',
    description: 'Redefining Accessibility Excellence',
    href: '/products/managed'
  },
  {
    name: 'Accessibility Monitor',
    description: 'Analyze, and Export accessibility issues with AI',
    href: '/products/monitor'
  },
  {
    name: 'Compare',
    description: 'Discover how Webenablix offers a better solution',
    href: '/products/compare'
  }
];

export const industriesMenu = [
  { name: 'Government', description: 'Make government websites accessible to all citizens', href: '/industries/government' },
  { name: 'Banking', description: 'Ensure financial services are available to everyone', href: '/industries/banking' },
  { name: 'Academic', description: 'Create inclusive educational environments', href: '/industries/academic' },
  { name: 'Retail', description: 'Build accessible shopping experiences', href: '/industries/retail' },
  { name: 'IT', description: 'Implement accessibility across digital platforms', href: '/industries/it' },
  { name: 'HealthCare', description: 'Improve accessibility in healthcare services', href: '/industries/healthcare' },
  { name: 'Automotive', description: 'Ensure accessibility in automotive technology', href: '/industries/automotive' },
  { name: 'Real Estate', description: 'Make real estate listings accessible to everyone', href: '/industries/real-estate' },
  { name: 'NGO/NPO', description: 'Support accessibility for nonprofit organizations', href: '/industries/ngo' },
  { name: 'Media & Entertainment', description: 'Provide inclusive media experience', href: '/industries/media' },
  { name: 'Law Enforcement', description: 'Ensure accessibility in public safety services', href: '/industries/law-enforcement' }
];

export const installationsMenu = [
  { name: 'Embed', description: "Embed Webenablix's code into any site", href: '/installation/embed' },
  { name: 'WordPress', description: 'Installing Webenablix on WordPress', href: '/installation/wordpress' },
  { name: 'Custom', description: 'Install Webenablix on custom sites with ease', href: '/installation/custom' },
  { name: 'Wix', description: 'Integrate Webenablix on Wix', href: '/installation/wix' },
  { name: 'Webflow', description: 'Guide to embedding Webenablix in Webflow', href: '/installation/webflow' },
  { name: 'Shopify', description: 'Step-by-step instructions for Shopify integration', href: '/installation/shopify' },
  { name: 'HubSpot', description: 'Install Webenablix on your HubSpot website', href: '/installation/hubspot' },
  { name: 'GTM', description: 'Add Webenablix using Google Tag Manager', href: '/installation/gtm' },
  { name: 'BigCommerce', description: 'Learn to integrate Webenablix on BigCommerce', href: '/installation/bigcommerce' },
];

export const pricingPlans = [
  {
    name: 'Basic Protection',
    tier: 'Automated',
    price: '$12',
    period: '/month',
    description: 'Our basic plan for automation-only monitoring, fixes, and online support',
    cta: 'Start Free Trial',
    ctaType: 'primary',
    features: [
      'Automated tools',
      'Developer tools',
      'Continuous monitoring',
      'Accessibility Help Desk',
      'Self-paced, online learning platform'
    ],
    highlighted: false
  },
  {
    name: 'Self-Serviced Protection',
    tier: 'Self-Managed',
    price: 'Custom',
    period: '',
    description: 'Empower your developers to understand and build for accessibility at the source',
    cta: 'Schedule Demo',
    ctaType: 'secondary',
    features: [
      'Developer tools',
      'Certified expert guidance',
      'Custom training',
      'Accessibility scanner'
    ],
    highlighted: true
  }
];
