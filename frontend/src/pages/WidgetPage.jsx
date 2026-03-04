import React, { useState } from 'react';
import { 
  ArrowRight, Check, Eye, Keyboard, Palette, Brain, Zap, EyeOff, Focus,
  Globe, BarChart3, Settings, Type, MousePointer,
  Volume2, Languages, ChevronLeft, ChevronRight, Accessibility, Users, DollarSign, Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch',
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Turkish',
  'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Greek', 'Czech',
  'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Hebrew'
];

const WidgetToggle = ({ label, icon, active, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-3">
      <span className={active ? 'text-[#2563EB]' : 'text-gray-400'}>{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#2563EB]' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${active ? 'right-0.5' : 'left-0.5'}`} />
    </div>
  </button>
);

const WidgetDemo = () => {
  const [activeFeatures, setActiveFeatures] = useState({
    highlightTitle: false,
    highlightLink: true,
    dyslexiaFont: false,
    letterSpacing: false,
    lineHeight: false,
    fontWeight: false,
    hideImage: false,
    textAlignment: false
  });

  const toggleFeature = (f) => setActiveFeatures(prev => ({ ...prev, [f]: !prev[f] }));

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center">
            <Accessibility className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-800">Accessibility</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      <div className="space-y-3">
        <WidgetToggle label="Highlight Title" icon={<Type className="w-4 h-4" />} active={activeFeatures.highlightTitle} onClick={() => toggleFeature('highlightTitle')} />
        <WidgetToggle label="Highlight Link" icon={<MousePointer className="w-4 h-4" />} active={activeFeatures.highlightLink} onClick={() => toggleFeature('highlightLink')} />
        <WidgetToggle label="Dyslexia Font" icon={<Type className="w-4 h-4" />} active={activeFeatures.dyslexiaFont} onClick={() => toggleFeature('dyslexiaFont')} />
        <WidgetToggle label="Letter Spacing" icon={<Type className="w-4 h-4" />} active={activeFeatures.letterSpacing} onClick={() => toggleFeature('letterSpacing')} />
        <WidgetToggle label="Line Height" icon={<Type className="w-4 h-4" />} active={activeFeatures.lineHeight} onClick={() => toggleFeature('lineHeight')} />
        <WidgetToggle label="Hide Image" icon={<EyeOff className="w-4 h-4" />} active={activeFeatures.hideImage} onClick={() => toggleFeature('hideImage')} />
      </div>
    </div>
  );
};

const ProfileCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB] hover:shadow-xl transition-all">
    <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const WidgetPage = () => {
  const [currentLang, setCurrentLang] = useState(0);
  const nextLang = () => setCurrentLang((prev) => (prev + 1) % languages.length);
  const prevLang = () => setCurrentLang((prev) => (prev - 1 + languages.length) % languages.length);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <section className="bg-gradient-to-b from-[#2563EB] to-[#3B82F6] py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Website, meet<br />Accessibility Widget
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  Start your ADA compliance journey with the Accessibility Widget. Conform to WCAG 2.1 &amp; 2.2 and boost performance along the way.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full px-8 py-4 h-auto font-semibold">
                    Request a demo
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold">
                    Start free trial
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <WidgetDemo />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by thousands of websites globally</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Our Widget has quickly become the best accessibility plugin and compliance solution, now installed on millions of websites worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Salesforce', 'IBM', 'Zendesk', 'BMW', 'British Airways'].map(b => (
                <div key={b} className="px-6 py-3 bg-white rounded-full shadow-sm">
                  <span className="font-semibold text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wide">OUR ACCESSIBILITY SERVICES</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                Your <span className="text-[#2563EB]">Widget</span> for instant compliance.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Eye, color: 'bg-blue-500', title: 'Vision Impaired Profile', desc: 'Enhances visual elements with high contrast, larger text, and focus highlighting for users with vision impairments.' },
                { icon: Brain, color: 'bg-purple-500', title: 'Cognitive Disability Profile', desc: 'Simplifies navigation and content layout for users with cognitive challenges.' },
                { icon: Keyboard, color: 'bg-green-500', title: 'Motor Impaired Profile', desc: 'Optimizes keyboard navigation and interactive elements for motor-impaired users.' },
                { icon: Globe, color: 'bg-orange-500', title: 'Multi-Language Support', desc: `Support for ${languages.length}+ languages to make your content accessible globally.` },
                { icon: Settings, color: 'bg-pink-500', title: 'Custom Branding', desc: 'Match your website\'s design with customizable widget colors, position, and styles.' },
                { icon: Shield, color: 'bg-indigo-500', title: 'WCAG 2.1 & 2.2 Compliance', desc: 'Automated coverage of WCAG success criteria to help achieve and maintain compliance.' },
              ].map(p => (
                <ProfileCard key={p.title} icon={p.icon} title={p.title} description={p.desc} color={p.color} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Language Support</h2>
              <p className="text-gray-600">Access Webenablix's accessibility menu in your native language</p>
            </div>
            <div className="flex items-center justify-center gap-6">
              <button onClick={prevLang} className="p-3 rounded-full bg-white shadow hover:bg-gray-50">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2563EB] mb-2">{languages[currentLang]}</div>
                <p className="text-gray-500 text-sm">{currentLang + 1} of {languages.length}</p>
              </div>
              <button onClick={nextLang} className="p-3 rounded-full bg-white shadow hover:bg-gray-50">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8"><Users className="w-12 h-12 text-[#2563EB] mx-auto mb-4" /><h3 className="text-2xl font-bold text-gray-900 mb-2">1B+ Users</h3><p className="text-gray-600">people with disabilities rely on accessibility tools</p></div>
              <div className="p-8"><DollarSign className="w-12 h-12 text-[#2563EB] mx-auto mb-4" /><h3 className="text-2xl font-bold text-gray-900 mb-2">$490B</h3><p className="text-gray-600">spending power of people with disabilities in the US alone</p></div>
              <div className="p-8"><Shield className="w-12 h-12 text-[#2563EB] mx-auto mb-4" /><h3 className="text-2xl font-bold text-gray-900 mb-2">4,600+</h3><p className="text-gray-600">ADA web accessibility lawsuits filed annually</p></div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Your Website Accessible?</h2>
            <p className="text-white/80 text-lg mb-8">Join thousands of websites using Webenablix to comply with ADA and WCAG standards</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full px-8 py-4 h-auto font-semibold">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-4 h-auto font-semibold">
                View Pricing
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WidgetPage;
