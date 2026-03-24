import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Zap,
  Shield,
  Settings,
  Monitor,
  BarChart3,
  Landmark,
  Wallet,
  GraduationCap,
  ShoppingBag,
  Cpu,
  HeartPulse,
  Car,
  Home,
  Users,
  Film,
  BadgeCheck,
  Code2,
  Globe,
  Wrench,
  Sparkles,
  Layers,
  Store,
  Briefcase,
  Tag,
  BookOpen,
  PenTool,
} from "lucide-react";
import {
  productsMenu,
  industriesMenu,
  installationsMenu,
} from "../data/navigation";

/**
 * UnifiedSectionNav Component
 * Props JSON Schema: {"type":"object","properties":{},"description":"Data sourced from navigation.js"}
 * Sections Array Schema: {"type":"array","minItems":4,"maxItems":4,"items":{"type":"object","properties":{"id":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"fullDescription":{"type":"string"},"ctaText":{"type":"string"},"ctaLink":{"type":"string"},"items":{"type":"array"}}}}
 * State Schema: {"type":"object","properties":{"activeSection":{"type":"number","minimum":0,"maximum":3},"sectionRefs":{"type":"array"},"wrapperRef":{"type":"object"}}}
 */
const sections = [
  {
    id: "products",
    title: "Products We Offer",
    description: "Comprehensive solutions for accessibility compliance",
    fullDescription:
      "Discover our suite of powerful accessibility products designed to help you meet WCAG and ADA compliance standards. From automated audits to AI-powered fixes, we have everything you need.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    items: productsMenu.slice(0, 5),
    getIcon: (icon) => {
      const map = {
        search: Search,
        zap: Zap,
        shield: Shield,
        settings: Settings,
        monitor: Monitor,
        barChart: BarChart3,
      };
      return map[icon] || Shield;
    },
  },
  {
    id: "industries",
    title: "Industries We Serve",
    description: "Tailored solutions for every sector and vertical",
    fullDescription:
      "Accessibility is critical across all industries. Whether you're in government, banking, healthcare, or retail, we provide specialized solutions tailored to your sector's unique needs.",
    ctaText: "View All Industries",
    ctaLink: "/industries",
    items: industriesMenu.slice(0, 5),
    getIcon: (icon) => {
      const map = {
        landmark: Landmark,
        wallet: Wallet,
        graduation: GraduationCap,
        shoppingBag: ShoppingBag,
        cpu: Cpu,
        heart: HeartPulse,
        car: Car,
        home: Home,
        users: Users,
        film: Film,
        badge: BadgeCheck,
      };
      return map[icon] || Shield;
    },
  },
  {
    id: "installation",
    title: "Installation Options",
    description: "Seamless integration with your favorite platforms",
    fullDescription:
      "Getting started is easy. We support all major platforms and frameworks. Choose your platform and follow our simple step-by-step integration guide.",
    ctaText: "See Installation Guide",
    ctaLink: "/installation",
    items: installationsMenu.slice(0, 5),
    getIcon: (icon) => {
      const map = {
        code: Code2,
        globe: Globe,
        wrench: Wrench,
        sparkles: Sparkles,
        layers: Layers,
        shoppingBag: ShoppingBag,
        briefcase: Briefcase,
        tag: Tag,
        store: Store,
      };
      return map[icon] || Shield;
    },
  },
  {
    id: "resources",
    title: "More Resources",
    description: "Everything you need to know about Webenablix",
    fullDescription:
      "Dive deeper into our documentation, explore our transparent pricing, learn our story, and discover partnership opportunities. We're here to support you every step of the way.",
    ctaText: "Browse Resources",
    ctaLink: "/docs",
    items: [
      {
        name: "Documentation",
        href: "/docs",
        icon: "book",
        description: "Comprehensive guides and API documentation",
      },
      {
        name: "Pricing",
        href: "/pricing",
        icon: "zap",
        description: "Transparent pricing for all your needs",
      },
      {
        name: "About Us",
        href: "/about",
        icon: "users",
        description: "Learn our mission and story",
      },
      {
        name: "Blog",
        href: "/blogs",
        icon: "pen",
        description: "Latest insights and accessibility tips",
      },
      {
        name: "Agency",
        href: "/agency",
        icon: "briefcase",
        description: "Become a Webenablix partner",
      },
    ],
    getIcon: (icon) => {
      const map = {
        book: BookOpen,
        zap: Zap,
        users: Users,
        pen: PenTool,
        briefcase: Briefcase,
      };
      return map[icon] || Shield;
    },
  },
];

const UnifiedSectionNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!wrapperRef.current) return;

      const wrapperTop =
        wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        const triggerPoint = windowHeight / 3;

        if (
          scrollTop + triggerPoint >= sectionTop &&
          scrollTop < sectionTop + sectionHeight
        ) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const activeData = sections[activeSection];

  return (
    <div ref={wrapperRef} className="relative">
      {sections.map((section, idx) => {
        const isAlternateLayout = idx % 2 === 1;

        return (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className={`flex flex-col lg:flex-row min-h-auto lg:min-h-screen ${isAlternateLayout ? "lg:flex-row-reverse" : "lg:flex-row"}`}
          >
            {/* Sticky Content Section - Always White with Blue Theme */}
            <div
              className={`w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center transition-all duration-1000 px-4 sm:px-8 lg:px-12 lg:pr-12 bg-white py-12 lg:py-0`}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight text-gray-900 transition-all duration-1000">
                  {section.title}
                </h2>
                <p className="text-base sm:text-lg mb-6 text-gray-600 transition-all duration-1000">
                  {section.description}
                </p>
                <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-md text-gray-600 transition-all duration-1000">
                  {section.fullDescription}
                </p>
                <Link
                  to={section.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {section.ctaText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Items Section - Light Blue Background */}
            <div className="w-full lg:w-1/2 py-12 lg:py-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-center bg-gradient-to-b from-blue-50 to-white">
              <div className="border-b border-gray-200 pb-8 mb-8 hidden lg:block">
                <h3 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-4">
                {section.items.map((item, itemIdx) => {
                  const Icon = section.getIcon(item.icon);

                  return (
                    <Link
                      key={`${section.id}-${itemIdx}`}
                      to={item.href}
                      className="group flex items-start sm:flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl border bg-white border-gray-100 hover:shadow-xl hover:border-[#2563EB] hover:bg-blue-50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 lg:p-5 rounded-xl bg-blue-100 group-hover:bg-[#2563EB] transition-all duration-300">
                        <Icon className="w-6 lg:w-8 h-6 lg:h-8 text-[#2563EB] group-hover:text-white transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1 text-gray-900 text-sm lg:text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {item.description}
                        </p>
                        {item.isNew && (
                          <span className="mt-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UnifiedSectionNav;
