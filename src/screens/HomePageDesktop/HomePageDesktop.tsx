import React from "react";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { FeaturedPropertiesSection } from "./sections/FeaturedPropertiesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { RealEstateJourneySection } from "./sections/RealEstateJourneySection";

export const HomePageDesktop = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      <HeroSection />
      <FeaturedPropertiesSection />
      <ClientTestimonialsSection />
      <RealEstateJourneySection />
      <FAQSection />
    </div>
  );
};