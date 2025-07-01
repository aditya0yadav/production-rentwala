import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { apiService, FAQ } from "../../../../services/api";

export const RealEstateJourneySection = (): JSX.Element => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await apiService.getFAQs({ featured: true });
        if (response.success) {
          setFaqs(response.data.slice(0, 6)); // Show first 6 FAQs
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Loading FAQs...</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Rentwala's services, property listings, 
            and the real estate process in India. We're here to provide clarity and assist you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {faqs.map((faq, index) => (
            <Card key={faq.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors duration-300 mb-2">
                          {faq.question}
                        </h3>
                        {expandedFaq === index && (
                          <div className="mt-4 animate-slide-up">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-300" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {faqs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Available</h3>
            <p className="text-gray-600">Check back later for frequently asked questions.</p>
          </div>
        )}
      </div>
    </section>
  );
};