import React from "react";
import { Shield, FileText, Users, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";
import useSiteConfig from "../../hooks/useSiteConfig";

export const TermsPage = (): JSX.Element => {
  const config = useSiteConfig();

  const sections = [
    {
      icon: FileText,
      title: "Terms of Service",
      content: [
        `By accessing and using ${config.company.name}'s services, you agree to be bound by these Terms and Conditions.`,
        "These terms apply to all users of our website, mobile application, and real estate services.",
        "We reserve the right to modify these terms at any time with prior notice to users.",
        "Continued use of our services after changes constitutes acceptance of new terms."
      ]
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Users must provide accurate and complete information when using our services.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "Users must not engage in any fraudulent, abusive, or illegal activities on our platform.",
        "Any misuse of our services may result in immediate termination of access."
      ]
    },
    {
      icon: Shield,
      title: "Property Listings",
      content: [
        "All property information is provided by property owners, agents, or verified sources.",
        "While we strive for accuracy, we cannot guarantee the completeness of all property details.",
        "Property prices and availability are subject to change without prior notice.",
        "Users should verify all property information independently before making decisions."
      ]
    },
    {
      icon: Lock,
      title: "Privacy & Data Protection",
      content: [
        "We collect and process personal data in accordance with Indian privacy laws.",
        "Your personal information is used solely for providing real estate services.",
        "We implement appropriate security measures to protect your data from unauthorized access.",
        "We do not sell or share your personal information with third parties without consent."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        `${config.company.name} acts as an intermediary between property buyers, sellers, and renters.`,
        "We are not liable for any disputes arising between parties in property transactions.",
        "Our liability is limited to the service fees paid for our real estate services.",
        "Users engage in property transactions at their own risk and discretion."
      ]
    },
    {
      icon: CheckCircle,
      title: "Service Standards",
      content: [
        "We commit to providing professional and ethical real estate services.",
        "Our agents are licensed and trained to handle property transactions in India.",
        "We maintain transparency in all our dealings and fee structures.",
        "Customer satisfaction and service quality are our top priorities."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white hero-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 animate-slide-up">
              Terms & <span className="text-primary-600 animate-pulse-slow">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Please read these terms and conditions carefully before using {config.company.name}'s real estate services. 
              These terms govern your use of our platform and services across India.
            </p>
            <div className="text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Last updated: January 2024
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors duration-300">
                      <section.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0 animate-pulse-slow" style={{ animationDelay: `${idx * 0.1}s` }} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Legal Information</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Governing Law</h3>
                    <p>These terms and conditions are governed by the laws of India. Any disputes arising from the use of our services shall be subject to the jurisdiction of courts in Gurgaon, Haryana.</p>
                  </div>
                  
                  <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Intellectual Property</h3>
                    <p>All content, trademarks, and intellectual property on our platform are owned by {config.company.name} or our licensors. Users may not reproduce, distribute, or create derivative works without written permission.</p>
                  </div>
                  
                  <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Termination</h3>
                    <p>We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-slide-in">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Legal Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Legal Address</p>
                        <p className="text-gray-600 text-sm">{config.addresses.headquarters.full}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Legal Email</p>
                        <p className="text-gray-600 text-sm">{config.contact.legal.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Legal Helpline</p>
                        <p className="text-gray-600 text-sm">{config.contact.legal.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      <strong>Note:</strong> For any legal queries or concerns regarding these terms, 
                      please contact our legal team. We aim to respond to all legal inquiries within 48 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Summary</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
                      Use our services responsibly and legally
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
                      Verify all property information independently
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
                      Respect other users and our platform
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
                      Contact us for any questions or concerns
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our legal and customer service teams are here to help clarify any questions you may have about our terms and conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <a href="/contact" className="inline-block">
              <button className="px-8 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Contact Legal Team
              </button>
            </a>
            <a href="/" className="inline-block">
              <button className="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Back to Home
              </button>
            </a>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>
    </div>
  );
};