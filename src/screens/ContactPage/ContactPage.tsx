import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Building
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";
import useSiteConfig from "../../hooks/useSiteConfig";

export const ContactPage = (): JSX.Element => {
  const config = useSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: config.contact.phones,
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: config.contact.emails,
      description: "Send us your queries anytime"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: [config.addresses.headquarters.street, `${config.addresses.headquarters.city}, ${config.addresses.headquarters.state} ${config.addresses.headquarters.pincode}`],
      description: "Visit our main office"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [config.business.workingHours.weekdays, config.business.workingHours.weekends],
      description: "We're here to help you"
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
              Contact <span className="text-primary-600 animate-pulse-slow">{config.company.name}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Ready to find your dream property or need expert real estate advice? 
              Get in touch with our experienced team across Delhi-NCR. We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <info.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300 animate-pulse-slow" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="pl-10 transition-all duration-300 focus:scale-105"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="pl-10 transition-all duration-300 focus:scale-105"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="pl-10 transition-all duration-300 focus:scale-105"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="buying">Property Buying</option>
                          <option value="selling">Property Selling</option>
                          <option value="renting">Property Renting</option>
                          <option value="investment">Investment Consultation</option>
                          <option value="valuation">Property Valuation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message *</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your requirements..."
                          rows={5}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-none"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group"
                    >
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div className="space-y-8 animate-slide-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
                <p className="text-gray-600 mb-8">
                  Visit us at any of our convenient locations across Delhi-NCR region.
                </p>
              </div>

              <div className="space-y-6">
                {config.addresses.offices.map((office, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 flex-shrink-0">
                          <Building className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                            {office.city} Office
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{office.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-primary-600" />
                              <span>{office.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Don't wait any longer. Contact our expert team today and let us help you find your perfect property in India's prime locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Browse Properties
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