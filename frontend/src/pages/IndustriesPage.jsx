import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Building, Landmark, GraduationCap, ShoppingCart, Code, HeartPulse, Car, Home, Heart, Tv, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const industries = [
  { to: '/industries/government', icon: Building, title: 'Government', desc: 'Make government websites accessible to all citizens' },
  { to: '/industries/banking', icon: Landmark, title: 'Banking', desc: 'Ensure financial services are available to everyone' },
  { to: '/industries/academic', icon: GraduationCap, title: 'Academic', desc: 'Create inclusive educational environments' },
  { to: '/industries/retail', icon: ShoppingCart, title: 'Retail', desc: 'Build accessible shopping experiences' },
  { to: '/industries/it', icon: Code, title: 'IT', desc: 'Implement accessibility across digital platforms' },
  { to: '/industries/healthcare', icon: HeartPulse, title: 'HealthCare', desc: 'Improve accessibility in healthcare services' },
  { to: '/industries/automotive', icon: Car, title: 'Automotive', desc: 'Ensure accessibility in automotive technology' },
  { to: '/industries/real-estate', icon: Home, title: 'Real Estate', desc: 'Make real estate listings accessible to everyone' },
  { to: '/industries/ngo', icon: Heart, title: 'NGO/NPO', desc: 'Support accessibility for nonprofit organizations' },
  { to: '/industries/media', icon: Tv, title: 'Media & Entertainment', desc: 'Provide inclusive media experience' },
  { to: '/industries/law-enforcement', icon: Shield, title: 'Law Enforcement', desc: 'Ensure accessibility in public safety services' },
];

const IndustriesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-[#2563EB] to-[#3B82F6] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Industries We Serve</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Tailored accessibility solutions for every industry, ensuring compliance and inclusivity across all sectors.
            </p>
          </div>
        </section>
        
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {industries.map(({ to, icon: Icon, title, desc }) => (
                <Link key={to} to={to} className="group">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors">
                      <Icon className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2563EB] transition-colors">{title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{desc}</p>
                    <div className="flex items-center text-[#2563EB] font-medium text-sm">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div><p className="text-4xl font-bold text-[#2563EB]">10,000+</p><p className="text-gray-600 mt-2">Websites Made Accessible</p></div>
              <div><p className="text-4xl font-bold text-[#2563EB]">50+</p><p className="text-gray-600 mt-2">Industries Served</p></div>
              <div><p className="text-4xl font-bold text-[#2563EB]">99.9%</p><p className="text-gray-600 mt-2">Compliance Rate</p></div>
              <div><p className="text-4xl font-bold text-[#2563EB]">24/7</p><p className="text-gray-600 mt-2">Expert Support</p></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Your Industry More Accessible?</h2>
            <p className="text-white/80 text-lg mb-8">Contact our team for industry-specific accessibility solutions</p>
            <Button onClick={() => navigate('/register')} className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full px-8 py-4 h-auto font-semibold">
              Get Industry Solution <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustriesPage;
