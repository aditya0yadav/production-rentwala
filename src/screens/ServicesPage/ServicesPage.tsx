import React from "react";
import { 
  Home, 
  TrendingUp, 
  Users, 
  Calculator, 
  FileText, 
  Shield,
  Search,
  Handshake,
  Settings,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";
import useSiteConfig from "../../hooks/useSiteConfig";

export const ServicesPage = (): JSX.Element => {
  const config = useSiteConfig();

  const mainServices = [
    {
      icon: Search,
      title: "Property Search & Acquisition",
      description: "We help you find and acquire the perfect property that matches your needs and budget in India's prime locations.",
      features: ["Personalized property matching", "Market analysis", "Negotiation support", "Due diligence"],
    },
    {
      icon: TrendingUp,
      title: "Property Selling Services",
      description: "Maximize your property's value with our comprehensive selling and marketing strategies across Indian markets.",
      features: ["Professional photography", "Market pricing analysis", "Marketing campaigns", "Buyer screening"],
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Get accurate property valuations from our certified appraisers and Indian market experts.",
      features: ["Comparative market analysis", "Professional appraisal", "Investment analysis", "Market trends"],
    },
    {
      icon: Users,
      title: "Property Management",
      description: "Complete property management services to maximize your investment returns in the Indian market.",
      features: ["Tenant screening", "Rent collection", "Maintenance coordination", "Financial reporting"],
    },
    {
      icon: FileText,
      title: "Legal & Documentation",
      description: "Handle all legal aspects and documentation for smooth property transactions as per Indian laws.",
      features: ["Contract preparation", "Legal compliance", "Title verification", "Registration support"],
    },
    {
      icon: Handshake,
      title: "Investment Consulting",
      description: "Expert advice on real estate investments and portfolio optimization strategies in India.",
      features: ["Investment analysis", "Portfolio diversification", "Risk assessment", "ROI optimization"],
    },
  ];

  const additionalServices = [
    {
      icon: Home,
      title: "Home Staging",
      description: "Professional staging to showcase your property's best features for Indian buyers.",
    },
    {
      icon: Shield,
      title: "Insurance Services",
      description: "Comprehensive insurance solutions for property protection in India.",
    },
    {
      icon: Settings,
      title: "Maintenance Services",
      description: "Regular maintenance and repair services for your properties across NCR.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your needs, preferences, and budget to understand your requirements in the Indian market.",
    },
    {
      step: "02",
      title: "Property Research",
      description: "Our team conducts thorough market research to identify suitable properties across India.",
    },
    {
      step: "03",
      title: "Property Viewing",
      description: "We arrange and accompany you on property viewings that match your criteria.",
    },
    {
      step: "04",
      title: "Negotiation & Closing",
      description: "We handle negotiations and guide you through the registration process as per Indian laws.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white hero-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 animate-slide-up">
              Our <span className="text-primary-600 animate-pulse-slow">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Comprehensive real estate services designed to meet all your property needs in India. 
              From buying and selling to management and investment consulting, we've got you covered across major Indian cities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive range of services covers every aspect of real estate transactions and management in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 animate-pulse-slow" style={{ animationDelay: `${idx * 0.1}s` }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure smooth and successful property transactions in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < process.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-primary-300 animate-pulse-slow" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complementary services to enhance your real estate experience in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Choose Our Services?
              </h2>
              <div className="space-y-4">
                {[
                  `${config.business.experience} years of Indian real estate experience`,
                  "Certified and licensed professionals",
                  "Personalized service approach",
                  "Transparent pricing and processes",
                  "24/7 customer support",
                  "Proven track record across NCR"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 animate-pulse-slow" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-slide-in">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional team"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Contact us today to discuss your real estate needs and discover how our services can help you achieve your goals in India's property market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/properties">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>
    </div>
  );
};