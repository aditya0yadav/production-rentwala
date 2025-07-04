import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Property } from '../../services/api';

interface PropertyStructuredDataProps {
  property: Property;
}

export const PropertyStructuredData: React.FC<PropertyStructuredDataProps> = ({ property }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://rentwala.com/properties/${property.id}`,
    "image": property.images,
    "price": {
      "@type": "PriceSpecification",
      "price": property.price,
      "priceCurrency": "INR"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.city,
      "addressRegion": property.state,
      "postalCode": property.pincode,
      "addressCountry": "IN",
      "streetAddress": property.location
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.city === "Gurgaon" ? "28.4595" : property.city === "Delhi" ? "28.7041" : "28.5355",
      "longitude": property.city === "Gurgaon" ? "77.0266" : property.city === "Delhi" ? "77.1025" : "77.3910"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitText": "square feet"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "propertyType": property.type,
    "availableFrom": property.createdAt,
    "amenityFeature": property.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Rentwala",
        "telephone": "+91-98765-43210",
        "email": "info@rentwala.com"
      }
    },
    "datePosted": property.createdAt,
    "dateModified": property.updatedAt
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};