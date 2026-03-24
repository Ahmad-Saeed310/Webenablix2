import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Zap,
  Shield,
  Settings,
  Monitor,
  BarChart3,
} from "lucide-react";
import { productsMenu } from "../data/navigation";

const iconMap = {
  search: Search,
  zap: Zap,
  shield: Shield,
  settings: Settings,
  monitor: Monitor,
  barChart: BarChart3,
};

const ProductsSectionNav = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      {/* Top Row - Full Width Header */}
      <div className="flex-shrink-0 h-1/5 px-16 py-12 flex items-center border-b border-gray-200">
        <div>
          <h2 className="text-5xl font-black text-gray-900 mb-3">
            Products We Offer
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive solutions for accessibility compliance
          </p>
        </div>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Sticky */}
        <div className="w-1/2 px-16 py-8 flex flex-col justify-start sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {productsMenu.slice(0, 5).map((product, idx) => (
              <div key={`prod-name-${idx}`} className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                  {product.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-12 bg-[#2563EB] transition-all duration-500 mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="w-1/2 px-16 py-8 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {productsMenu.slice(0, 5).map((product, idx) => {
              const Icon = iconMap[product.icon] || Shield;
              return (
                <Link
                  key={`prod-${idx}`}
                  to={product.href}
                  className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#2563EB] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-5 bg-blue-100 rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                    <Icon className="w-8 h-8 text-[#2563EB] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 group-hover:text-[#2563EB] transition-colors">
                      {product.description}
                    </p>
                    {product.isNew && (
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
    </section>
  );
};

export default ProductsSectionNav;
