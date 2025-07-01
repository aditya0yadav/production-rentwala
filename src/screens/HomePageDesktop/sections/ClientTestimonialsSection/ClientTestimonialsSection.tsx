import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { apiService, Testimonial } from "../../../../services/api";

export const ClientTestimonialsSection = (): JSX.Element => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiService.getTestimonials(true);
        if (response.success) {
          setTestimonials(response.data.slice(0, 3)); // Show only first 3
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Loading testimonials...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 space-y-4 lg:space-y-0">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Read the success stories and heartfelt testimonials from our valued clients. 
              Discover why they chose Rentwala for their real estate needs.
            </p>
          </div>
          <Button variant="outline" className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            View All Testimonials
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse-slow" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary-200 group-hover:text-primary-400 transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {testimonial.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.profileImage}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};