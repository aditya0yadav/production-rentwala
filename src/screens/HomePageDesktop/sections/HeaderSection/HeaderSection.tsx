import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import useSiteConfig from "../../../../hooks/useSiteConfig";

export const HeaderSection = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const config = useSiteConfig();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Services", path: "/services" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      {/* Notification Banner */}
      {showBanner && (
        <div className="bg-primary-600 text-white py-3 px-4 animate-slide-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm md:text-base">
              <span className="animate-pulse-slow">🏠 Discover Your Dream Property with {config.company.name}</span>
              <Link to="/properties" className="underline hover:no-underline transition-all duration-300 hover:text-primary-200">
                Learn More
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1 transition-all duration-300 hover:rotate-90"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{config.company.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.path)
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/contact">
              <Button className="hidden md:inline-flex bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Contact Us
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                    isActive(item.path)
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="mt-4 bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};