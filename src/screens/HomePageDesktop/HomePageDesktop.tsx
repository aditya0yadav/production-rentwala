import React from "react";
import { SEOHead } from "../../components/SEO/SEOHead";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { FeaturedPropertiesSection } from "./sections/FeaturedPropertiesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { RealEstateJourneySection } from "./sections/RealEstateJourneySection";

export const HomePageDesktop = (): JSX.Element => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Rentwala - Find Your Dream Property in India",
    "description": "India's leading real estate platform with 25,000+ properties across Delhi-NCR. Expert agents, transparent pricing, 12+ years experience.",
    "url": "https://rentwala.com/",
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "Rentwala",
      "description": "Leading real estate platform in India",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "DLF Cyber City, Sector 25",
        "addressLocality": "Gurgaon",
        "addressRegion": "Haryana",
        "postalCode": "122002",
        "addressCountry": "IN"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://rentwala.com/"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Rentwala - Find Your Dream Property in India | Real Estate Platform"
        description="Discover your perfect property with Rentwala, India's leading real estate platform. Browse 25,000+ properties across Delhi-NCR, Gurgaon, Noida. Expert agents, transparent pricing, 12+ years experience."
        keywords="real estate India, property for sale, buy property Delhi, Gurgaon properties, Noida real estate, property investment, dream home India, real estate agent, property search, NCR properties"
        url="https://rentwala.com/"
        canonical="https://rentwala.com/"
        structuredData={homeStructuredData}
      />
      
      <div className="min-h-screen bg-white">
        <HeaderSection />
        <main>
          <HeroSection />
          <FeaturedPropertiesSection />
          <ClientTestimonialsSection />
          <RealEstateJourneySection />
          <FAQSection />
        </main>
      </div>
    </>
  );
};