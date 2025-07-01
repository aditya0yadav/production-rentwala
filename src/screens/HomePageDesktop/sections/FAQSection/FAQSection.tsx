import React from "react";
import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FAQSection = (): JSX.Element => {
  const footerNavigation = {
    home: {
      title: "Home",
      links: ["Hero Section", "Features", "Properties", "Testimonials", "FAQ's"],
    },
    aboutUs: {
      title: "About Us",
      links: ["Our Story", "Our Works", "How It Works", "Our Team", "Our Clients"],
    },
    properties: {
      title: "Properties",
      links: ["Portfolio", "Categories"],
    },
    services: {
      title: "Services",
      links: ["Property Search", "Strategic Marketing", "Negotiation Support", "Legal Assistance", "Property Management"],
    },
    contactUs: {
      title: "Contact Us",
      links: ["Contact Form", "Our Offices"],
    },
  };

  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Linkedin, href: "#" },
  ];

  return (
    <div className="bg-white">
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Start Your Real Estate Journey Today
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed">
                Your dream property is just a click away. Whether you're looking for a new home, 
                a strategic investment, or expert real estate advice, Rentwala is here to assist 
                you every step of the way across India's prime locations.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/properties">
                <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Explore Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Logo and Newsletter */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-xl font-bold">Rentwala</span>
              </div>
              
              <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter Your Email"
                      className="bg-transparent border-0 text-white placeholder:text-gray-400 focus-visible:ring-0"
                    />
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-8">
              {Object.entries(footerNavigation).map(([key, section], index) => (
                <div key={key} className="space-y-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="font-semibold text-gray-300">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm transform hover:translate-x-1 inline-block">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 animate-fade-in">
                <p className="text-gray-400 text-sm">
                  © 2024 Rentwala. All Rights Reserved.
                </p>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </div>
              
              <div className="flex items-center space-x-4 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                {socialIcons.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all duration-300 transform hover:scale-110"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};