import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Globe,
  Wrench,
  Sparkles,
  Layers,
  ShoppingBag,
  Briefcase,
  Tag,
  Store,
} from "lucide-react";
import { installationsMenu } from "../data/navigation";

const iconMap = {
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

const InstallationSectionNav = () => {
  const displayInstallations = installationsMenu.slice(0, 5);

  return (
    <section className="h-screen bg-gradient-to-b from-white to-amber-50 flex flex-col">
      {/* Top Row - Full Width Header */}
      <div className="flex-shrink-0 h-1/5 px-16 py-12 flex items-center border-b border-gray-200">
        <div>
          <h2 className="text-5xl font-black text-gray-900 mb-3">
            Installation Options
          </h2>
          <p className="text-lg text-gray-600">
            Seamless integration with your favorite platforms
          </p>
        </div>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Sticky */}
        <div className="w-1/2 px-16 py-8 flex flex-col justify-start sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {displayInstallations.map((installation, idx) => (
              <div key={`inst-name-${idx}`} className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {installation.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-12 bg-orange-600 transition-all duration-500 mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="w-1/2 px-16 py-8 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {displayInstallations.map((installation, idx) => {
              const Icon = iconMap[installation.icon] || Wrench;
              return (
                <Link
                  key={`inst-${idx}`}
                  to={installation.href}
                  className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-400 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-5 bg-orange-100 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors">
                      {installation.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationSectionNav;
