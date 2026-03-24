import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * FaqSection Component
 * Props JSON Schema: {"type":"object","properties":{},"description":"No required props"}
 * State Schema: {"type":"object","properties":{"openIndex":{"type":"number","minimum":0,"maximum":5}}}
 * FAQ Items Schema: {"type":"array","minItems":6,"items":{"type":"object","properties":{"question":{"type":"string"},"answer":{"type":"string"}},"required":["question","answer"]}}
 */
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#2563EB] transition-colors">
    <button
      onClick={onClick}
      className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-lg font-semibold text-gray-900 text-left">
        {question}
      </h3>
      <ChevronDown
        className={`w-5 h-5 text-[#2563EB] flex-shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Webenablix?",
      answer:
        "Webenablix is an AI-powered accessibility platform that automatically scans, monitors, and fixes web accessibility issues. It helps websites comply with WCAG 2.1, WCAG 2.2, and ADA standards, making digital content accessible to everyone, including people with disabilities.",
    },
    {
      question: "How does Webenablix work?",
      answer:
        "Webenablix uses advanced AI and machine learning algorithms to scan your website and identify accessibility issues. Our widget can be embedded with a single line of code, providing users with accessibility features like text resizing, contrast adjustment, focus enhancement, and more.",
    },
    {
      question: "What accessibility standards does Webenablix support?",
      answer:
        "We support WCAG 2.1 Level AA, WCAG 2.2, Section 508 of the Americans with Disabilities Act (ADA), and EN 301 549. Our continuous updates ensure you remain compliant with the latest accessibility standards.",
    },
    {
      question: "How long does it take to implement Webenablix?",
      answer:
        "Implementation is quick and easy. For most websites, you can add Webenablix in under 5 minutes by embedding a single line of JavaScript code. We also provide dedicated support for more complex implementations.",
    },
    {
      question: "Does Webenablix require coding knowledge to install?",
      answer:
        "No, Webenablix is designed to be non-technical. You can install it without any coding knowledge. We provide step-by-step guides for popular platforms like WordPress, Shopify, Wix, and more. For custom implementations, our team is always available to help.",
    },
    {
      question: "Can I customize the accessibility widget?",
      answer:
        "Yes, you can fully customize the widget to match your brand. Customize colors, size, position, language, and which accessibility features are available. The widget supports 27+ languages out of the box.",
    },
    // {
    //   question: 'What is the cost of Webenablix?',
    //   answer:
    //     'Webenablix offers flexible pricing plans starting from free. Our paid plans include automated scanning, continuous monitoring, expert audits, and managed services. Choose the plan that fits your needs and scale as you grow.',
    // },
    // {
    //   question: 'Does Webenablix replace manual accessibility testing?',
    //   answer:
    //     'While Webenablix catches many automated issues, we recommend combining it with manual testing for comprehensive coverage. Our Expert Audit service provides human-reviewed assessments and actionable recommendations.',
    // },
    // {
    //   question: 'Is Webenablix GDPR compliant?',
    //   answer:
    //     'Yes, Webenablix is fully GDPR compliant. We take data privacy seriously and do not store any personal data from your website visitors. All processing is done securely and in accordance with international privacy regulations.',
    // },
    // {
    //   question: 'What kind of support do you offer?',
    //   answer:
    //     'We offer 24/7 customer support through email, chat, and phone depending on your plan. Premium plans include a dedicated support manager and priority assistance. We also have comprehensive documentation and video tutorials available.',
    // },
    // {
    //   question: 'Can Webenablix monitor multiple websites?',
    //   answer:
    //     'Yes, on our Professional and Enterprise plans, you can monitor multiple websites from a single dashboard. Track all your sites, compliance scores, and issues in one place with detailed reporting.',
    // },
    // {
    //   question: 'What about websites behind login pages?',
    //   answer:
    //     'Our scanning service can handle authenticated content. You can provide credentials for pages behind login walls, and we\'ll scan the full depth of your website including member-only areas.',
    // },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Webenablix
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-xl border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Didn't find your answer?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Get in touch with us anytime.
            </p>
            <a
              href="mailto:support@webenablix.com"
              className="inline-block px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-[#1d4ed8] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
