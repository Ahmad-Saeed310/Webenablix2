import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Zap, Users, PenTool, Briefcase } from "lucide-react";

const otherLinks = [
  {
    name: "Documentation",
    href: "/docs",
    icon: BookOpen,
    color: "bg-blue-500/20",
    hoverColor: "group-hover:bg-blue-500/40",
    iconColor: "text-blue-300",
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: Zap,
    color: "bg-yellow-500/20",
    hoverColor: "group-hover:bg-yellow-500/40",
    iconColor: "text-yellow-300",
  },
  {
    name: "About Us",
    href: "/about",
    icon: Users,
    color: "bg-green-500/20",
    hoverColor: "group-hover:bg-green-500/40",
    iconColor: "text-green-300",
  },
  {
    name: "Blog",
    href: "/blogs",
    icon: PenTool,
    color: "bg-pink-500/20",
    hoverColor: "group-hover:bg-pink-500/40",
    iconColor: "text-pink-300",
  },
  {
    name: "Agency",
    href: "/agency",
    icon: Briefcase,
    color: "bg-purple-500/20",
    hoverColor: "group-hover:bg-purple-500/40",
    iconColor: "text-purple-300",
  },
];

const OtherLinksSection = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      {/* Top Row - Full Width Header */}
      <div className="flex-shrink-0 h-1/5 px-16 py-12 flex items-center border-b border-slate-700">
        <div>
          <h2 className="text-5xl font-black text-white mb-3">
            More Resources
          </h2>
          <p className="text-lg text-slate-300">
            Everything you need to know about Webenablix
          </p>
        </div>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Sticky */}
        <div className="w-1/2 px-16 py-8 flex flex-col justify-start sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {otherLinks.map((link, idx) => (
              <div key={`res-name-${idx}`} className="group cursor-pointer">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {link.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-12 bg-cyan-400 transition-all duration-500 mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="w-1/2 px-16 py-8 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {otherLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={`other-${idx}`}
                  to={link.href}
                  className="group flex items-center gap-6 p-6 bg-slate-700/40 backdrop-blur-sm border border-slate-600 hover:border-white/30 rounded-2xl transition-all duration-300 hover:bg-slate-700/60"
                >
                  <div
                    className={`flex-shrink-0 p-4 ${link.color} ${link.hoverColor} rounded-xl transition-all`}
                  >
                    <Icon className={`w-8 h-8 ${link.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">
                      Explore our comprehensive {link.name.toLowerCase()}{" "}
                      section
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

export default OtherLinksSection;
