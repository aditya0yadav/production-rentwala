import React from "react";
import { Award, Users, Home, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";

export const AboutPage = (): JSX.Element => {
  const stats = [
    { icon: Home, value: "25,000+", label: "Properties Sold" },
    { icon: Users, value: "15,000+", label: "Happy Clients" },
    { icon: Award, value: "12+", label: "Years Experience" },
    { icon: TrendingUp, value: "99%", label: "Success Rate" },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We believe in transparent and honest dealings with all our clients across India.",
      icon: CheckCircle,
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service delivery in the Indian market.",
      icon: Star,
    },
    {
      title: "Innovation",
      description: "We embrace technology and innovation to enhance client experience in real estate.",
      icon: TrendingUp,
    },
    {
      title: "Community",
      description: "We are committed to building stronger communities through real estate in India.",
      icon: Users,
    },
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "12+ years in Indian real estate with a passion for helping families find their perfect home.",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Sales",
      image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Expert negotiator with over 2000 successful property transactions across NCR.",
    },
    {
      name: "Anita Singh",
      role: "Property Manager",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Specializes in luxury properties and investment opportunities in Delhi-NCR region.",
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
              About <span className="text-primary-600 animate-pulse-slow">Rentwala</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We are India's leading real estate platform dedicated to helping you find your dream property. 
              With years of experience and a commitment to excellence, we make property transactions seamless and stress-free across major Indian cities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2 animate-bounce-in" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Founded in 2012, Rentwala began as a small family business with a simple mission: 
                  to help people find not just houses, but homes where memories are made and dreams come true in India's rapidly growing cities.
                </p>
                <p className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  Over the years, we've grown from a local agency to a trusted name in Indian real estate, 
                  but our core values remain unchanged. We believe that every client deserves personalized 
                  attention, honest advice, and exceptional service tailored to the Indian market.
                </p>
                <p className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  Today, we're proud to have helped thousands of families find their perfect homes across 
                  Delhi-NCR, and we continue to innovate and adapt to meet the evolving needs of our clients 
                  in India's dynamic real estate market.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our office"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to excellence in the Indian real estate market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are here to guide you through every step of your real estate journey in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Let our experienced team help you navigate the Indian real estate market and find the perfect property for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Contact Us Today
            </Button>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>
    </div>
  );
};