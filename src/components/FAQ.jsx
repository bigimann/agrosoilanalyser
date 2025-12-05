import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How accurate are the AI recommendations?",
      answer:
        "Our AI has been trained on extensive agricultural data and achieves 95% accuracy. It considers multiple factors including soil type, climate, location, and local farming practices to provide reliable recommendations.",
    },
    {
      question: "Is this service really free?",
      answer:
        "Yes! AgroSoilAssistant is completely free for farmers. We believe every farmer deserves access to smart agricultural technology regardless of their financial situation.",
    },
    {
      question: "What if I don't know my soil pH level?",
      answer:
        "That's okay! The pH level is optional. Our AI can still provide excellent recommendations based on your soil type, location, and rainfall data. However, for more accurate results, we recommend getting a soil test.",
    },
    {
      question: "Can I use this for large-scale commercial farming?",
      answer:
        "Absolutely! AgroSoilAssistant works for farms of all sizes, from small family farms to large commercial operations. The recommendations are scalable and applicable to various farm sizes.",
    },
    {
      question: "How often should I submit new data?",
      answer:
        "We recommend submitting new data at the beginning of each planting season or whenever your farm conditions change significantly (like after irrigation installation or major soil amendments).",
    },
    {
      question: "What regions does AgroSoilAssistant support?",
      answer:
        "Currently, we focus on African agriculture, particularly Nigeria. However, our AI can provide recommendations for farms in similar climatic regions. We're continuously expanding our coverage.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600">Everything you need to know</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900 pr-8">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-green-600 shrink-0 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600">
                <div className="pt-2 border-t border-gray-200">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
