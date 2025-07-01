import React, { useState, useEffect } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Luxury Villa in DLF Phase 4",
      location: "Gurgaon, Haryana"
    },
    {
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Modern Apartment in Connaught Place",
      location: "Delhi, NCR"
    },
    {
      url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Premium Townhouse in Sector 62",
      location: "Noida, UP"
    },
    {
      url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Contemporary Loft in Cyber City",
      location: "Gurgaon, Haryana"
    },
    {
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Spacious Family Home in Greater Kailash",
      location: "Delhi, NCR"
    }
  ];

  const statsData = [
    { value: "500+", label: "Happy Customers" },
    { value: "25k+", label: "Properties For Clients" },
    { value: "12+", label: "Years of Experience" },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white hero-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-up">
                Discover Your{" "}
                <span className="text-primary-600 animate-pulse-slow">Dream Property</span> with
                Rentwala
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Your journey to finding the perfect property begins here. Explore
                our listings to find the home that matches your dreams in India's prime locations.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/properties">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700 group transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="group transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {statsData.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-none bg-white/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <CardContent className="p-4">
                    <div className="text-2xl md:text-3xl font-bold text-primary-600 animate-pulse-slow">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div className="relative animate-slide-in">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Image Container */}
              <div className="relative h-[500px] lg:h-[600px]">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Image Info Overlay */}
                    <div className="absolute bottom-6 left-6 text-white animate-fade-in">
                      <h3 className="text-xl font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 group"
              >
                <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 group"
              >
                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
                <div 
                  className="h-full bg-primary-600 transition-all duration-4000 ease-linear"
                  style={{ 
                    width: `${((currentSlide + 1) / heroImages.length) * 100}%`,
                    animation: 'none'
                  }}
                />
              </div>
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl border-0 animate-float">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center animate-pulse-slow">
                    <span className="text-primary-600 font-bold">🏠</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Premium Location</div>
                    <div className="text-sm text-gray-600">Best neighborhoods</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -top-6 -right-6 bg-white shadow-xl border-0 animate-float" style={{ animationDelay: '1s' }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center animate-wiggle">
                    <span className="text-primary-600 font-bold">⭐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">5.0 Rating</div>
                    <div className="text-sm text-gray-600">Trusted by clients</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};