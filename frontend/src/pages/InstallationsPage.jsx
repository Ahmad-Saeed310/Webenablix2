import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Settings,
  Tag,
  ShoppingBag,
  Rocket,
  Folder,
} from "lucide-react";
import { injectSchema, installationsPageSchema } from "../utils/schemaMarkup";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const platforms = [
  {
    to: "/installation/embed",
    icon: Code,
    title: "Embed",
    desc: "Embed Webenablix's code into any site",
  },
  {
    to: "/installation/wordpress",
    label: "W",
    title: "WordPress",
    desc: "Installing Webenablix on WordPress",
  },
  {
    to: "/installation/custom",
    icon: Settings,
    title: "Custom",
    desc: "Install Webenablix on custom sites with ease",
  },
  {
    to: "/installation/wix",
    label: "Wix",
    title: "Wix",
    desc: "Integrate Webenablix on Wix",
  },
  {
    to: "/installation/shopify",
    icon: ShoppingBag,
    title: "Shopify",
    desc: "Step-by-step instructions for Shopify integration",
  },
  {
    to: "/installation/squarespace",
    label: "SS",
    title: "Squarespace",
    desc: "Integrate Webenablix with Squarespace",
  },
  {
    to: "/installation/hubspot",
    label: "HS",
    title: "HubSpot",
    desc: "Install Webenablix on your HubSpot website",
  },
  {
    to: "/installation/gtm",
    icon: Tag,
    title: "GTM",
    desc: "Add Webenablix using Google Tag Manager",
  },
  {
    to: "/installation/webflow",
    label: "WF",
    title: "Webflow",
    desc: "Guide to embedding Webenablix in Webflow",
  },
  {
    to: "/installation/bigcommerce",
    label: "BC",
    title: "BigCommerce",
    desc: "Learn to integrate Webenablix on BigCommerce",
  },
  {
    to: "/installation/gohighlevel",
    icon: Rocket,
    title: "Go High Level",
    desc: "Learn to integrate Webenablix on GoHighLevel",
  },
  {
    to: "/installation/manage",
    icon: Folder,
    title: "Manage",
    desc: "Manage your Webenablix installations",
  },
];

const InstallationsPage = () => {
  useEffect(() => {
    const cleanup = injectSchema(
      installationsPageSchema,
      "installations-page-schema",
    );
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-[#2563EB] to-[#3B82F6] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Installation Guides
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Easy step-by-step instructions to integrate Webenablix with your
              platform.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Quick Start
                </h2>
                <p className="text-gray-600">
                  Add Webenablix to your website in under 5 minutes
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="rounded-full">
                  Watch Tutorial
                </Button>
                <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full">
                  Get Your Code
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Choose Your Platform
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {platforms.map(({ to, icon: Icon, label, title, desc }) => (
                <Link key={to} to={to} className="group">
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      {Icon ? (
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-[#2563EB] transition-colors" />
                      ) : (
                        <span className="text-lg font-bold text-gray-600 group-hover:text-[#2563EB] transition-colors">
                          {label}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2563EB] transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm flex-1">{desc}</p>
                    <div className="flex items-center text-[#2563EB] font-medium text-sm mt-4">
                      View Guide{" "}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Installing?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is available 24/7 to help you get Webenablix set
              up on your platform.
            </p>
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full px-8">
              Contact Support <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstallationsPage;
