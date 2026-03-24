import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    <ul className="space-y-3">{links}</ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-white text-sm transition-colors">{children}</Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <FooterColumn title="Compliance" links={<>
            <FooterLink to="/products">Overview</FooterLink>
            <FooterLink to="/docs">What is WCAG?</FooterLink>
            <FooterLink to="/docs">What is ADA?</FooterLink>
            <FooterLink to="/docs">What is AODA?</FooterLink>
            <FooterLink to="/docs">What is 508?</FooterLink>
          </>} />
          <FooterColumn title="Company" links={<>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/about">Our Impact</FooterLink>
            <FooterLink to="/about">Contact Us</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
          </>} />
          <FooterColumn title="Industries" links={<>
            <FooterLink to="/industries/government">Government</FooterLink>
            <FooterLink to="/industries/banking">Banking & Finance</FooterLink>
            <FooterLink to="/industries/academic">Education</FooterLink>
            <FooterLink to="/industries/healthcare">Healthcare</FooterLink>
          </>} />
          <FooterColumn title="Resources" links={<>
            <FooterLink to="/docs">Accessibility FAQ</FooterLink>
            <FooterLink to="/docs">Documentation</FooterLink>
            <FooterLink to="/installation">Installation Guides</FooterLink>
            <FooterLink to="/blogs">Blog & Insights</FooterLink>
          </>} />
          <FooterColumn title="Legal" links={<>
            <FooterLink to="/docs">Privacy Policy</FooterLink>
            <FooterLink to="/docs">Terms of Service</FooterLink>
            <FooterLink to="/docs">Accessibility Statement</FooterLink>
          </>} />
          <FooterColumn title="Support & Help" links={<>
            <FooterLink to="/docs">Documentation</FooterLink>
            <FooterLink to="/about">Contact Support</FooterLink>
            <FooterLink to="/installation">Installation Guides</FooterLink>
          </>} />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold">Webenablix</span>
            </Link>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#2563EB] rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">© 2025 Webenablix. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
