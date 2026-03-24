import React from "react";
import { Link } from "react-router-dom";
import {
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
  Building2,
} from "lucide-react";
import { industriesMenu } from "../data/navigation";

const iconMap = {
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

const IndustriesSectionNav = () => {
  const displayIndustries = industriesMenu.slice(0, 5);

  return (
    <section className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      {/* Top Row - Full Width Header */}
      <div className="flex-shrink-0 h-1/5 px-16 py-12 flex items-center border-b border-slate-700">
        <div>
          <h2 className="text-5xl font-black text-white mb-3">
            Industries We Serve
          </h2>
          <p className="text-lg text-slate-300">
            Tailored solutions for every sector and vertical
          </p>
        </div>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Sticky */}
        <div className="w-1/2 px-16 py-8 flex flex-col justify-start sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {displayIndustries.map((industry, idx) => (
              <div key={`ind-name-${idx}`} className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {industry.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-12 bg-cyan-400 transition-all duration-500 mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="w-1/2 px-16 py-8 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {displayIndustries.map((industry, idx) => {
              const Icon = iconMap[industry.icon] || Building2;
              return (
                <Link
                  key={`ind-${idx}`}
                  to={industry.href}
                  className="group flex items-center gap-6 p-6 bg-slate-700/40 backdrop-blur-sm border border-slate-600 hover:border-cyan-400 rounded-2xl transition-all duration-300 hover:bg-slate-700/60"
                >
                  <div className="flex-shrink-0 p-4 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/40 transition-all">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 group-hover:text-cyan-300 transition-colors">
                      {industry.description}
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

export default IndustriesSectionNav;
