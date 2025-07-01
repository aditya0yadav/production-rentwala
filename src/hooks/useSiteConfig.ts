import { useState, useEffect } from 'react';
import siteConfig from '../config/siteConfig.json';

interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  contact: {
    phones: string[];
    emails: string[];
    legal: {
      email: string;
      phone: string;
    };
  };
  addresses: {
    headquarters: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      full: string;
    };
    offices: Array<{
      city: string;
      address: string;
      phone: string;
      email: string;
    }>;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  business: {
    workingHours: {
      weekdays: string;
      weekends: string;
    };
    established: string;
    experience: string;
    locations: string[];
  };
  stats: {
    propertiesSold: string;
    happyClients: string;
    yearsExperience: string;
    successRate: string;
  };
}

export const useSiteConfig = (): SiteConfig => {
  return siteConfig as SiteConfig;
};

export default useSiteConfig;