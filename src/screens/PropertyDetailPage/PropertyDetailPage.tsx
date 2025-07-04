import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Car,
  Wifi,
  Dumbbell,
  Trees,
  Eye,
  Download,
  Home,
  Menu,
  X
} from "lucide-react";
import { SEOHead } from "../../components/SEO/SEOHead";
import { PropertyStructuredData } from "../../components/SEO/PropertyStructuredData";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";
import { apiService, Property } from "../../services/api";

export const PropertyDetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getProperty(parseInt(id));
        
        if (response.success) {
          setProperty(response.data);
        } else {
          setError(response.message || 'Property not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const amenityIcons: { [key: string]: any } = {
    "Swimming Pool": "🏊‍♂️",
    "Gym & Fitness Center": Dumbbell,
    "Gym": Dumbbell,
    "Landscaped Garden": Trees,
    "Garden": Trees,
    "Covered Parking": Car,
    "Parking": Car,
    "24/7 Security": Shield,
    "Security": Shield,
    "Power Backup": "⚡",
    "Water Supply": "💧",
    "Club House": "🏛️",
    "Children's Play Area": "🎪",
    "Jogging Track": "🏃‍♂️",
    "24/7 Maintenance": "🔧",
    "High-Speed Elevator": "🛗",
    "Elevator": "🛗",
    "Wi-Fi Ready": Wifi,
    "Intercom Facility": "📞",
    "CCTV Surveillance": "📹",
    "Fire Safety": "🚨"
  };

  // Generate SEO content for property
  const generatePropertySEO = (property: Property) => {
    const title = `${property.title} - ${property.priceFormatted} | Rentwala`;
    const description = `${property.bedrooms} BHK ${property.type} for sale in ${property.city}. ${property.area} area. ${property.description.substring(0, 120)}...`;
    const keywords = `${property.type} for sale ${property.city}, ${property.bedrooms} BHK ${property.city}, property ${property.location}, real estate ${property.state}`;
    const url = `https://rentwala.com/properties/${property.id}`;
    
    return { title, description, keywords, url };
  };

  if (loading) {
    return (
      <>
        <SEOHead title="Loading Property Details - Rentwala" />
        <div className="min-h-screen bg-gray-50">
          <HeaderSection />
          <div className="flex items-center justify-center p-4 min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Loading Property Details</h3>
              <p className="text-gray-600 text-sm sm:text-base">Please wait while we fetch the information...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <SEOHead title="Property Not Found - Rentwala" />
        <div className="min-h-screen bg-gray-50">
          <HeaderSection />
          <div className="flex items-center justify-center p-4 min-h-[60vh]">
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Home className="h-10 sm:h-12 w-10 sm:w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {error || 'Property Not Found'}
              </h1>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                {error ? 'There was an error loading the property details.' : 'The property you\'re looking for doesn\'t exist or has been removed.'}
              </p>
              <Link to="/properties">
                <Button className="bg-primary-600 hover:bg-primary-700 w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const seoContent = generatePropertySEO(property);

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rentwala.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": "https://rentwala.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.title,
        "item": seoContent.url
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        url={seoContent.url}
        canonical={seoContent.url}
        image={property.images[0]}
        type="article"
        structuredData={breadcrumbStructuredData}
      />
      <PropertyStructuredData property={property} />
      
      <div className="min-h-screen bg-gray-50">
        <HeaderSection />
        
        <main>
          {/* Sticky Header */}
          <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                <Link to="/properties">
                  <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-50 text-sm sm:text-base">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back to Properties</span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                </Link>
                
                {/* Desktop Actions */}
                <div className="hidden sm:flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`${isFavorite ? 'text-red-600 border-red-600 bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="hover:bg-gray-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* Mobile Actions Menu */}
                <div className="sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileActions(true)}
                    className="p-2"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Actions Modal */}
          {showMobileActions && (
            <div className="sm:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
              <div className="bg-white w-full rounded-t-2xl p-6 space-y-4 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowMobileActions(false)}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      setShowMobileActions(false);
                    }}
                    className={`w-full justify-start ${isFavorite ? 'text-red-600 border-red-600 bg-red-50' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-3 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-3" />
                    Share Property
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-3" />
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Breadcrumb */}
            <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link to="/" className="hover:text-primary-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/properties" className="hover:text-primary-600 transition-colors duration-300">
                    Properties
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 font-medium truncate">{property.title}</li>
              </ol>
            </nav>

            {/* Image Gallery - Top Priority on Mobile */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="relative h-64 sm:h-80 lg:h-[600px]">
                    <img
                      src={property.images[currentImageIndex] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                      alt={`${property.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setShowImageModal(true)}
                      loading="eager"
                    />
                    
                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter & View All */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm">
                        {currentImageIndex + 1} / {property.images.length}
                      </div>
                      <button
                        onClick={() => setShowImageModal(true)}
                        className="bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm hover:bg-black/70 transition-colors duration-300 flex items-center justify-center space-x-1"
                      >
                        <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span className="hidden sm:inline">View All</span>
                      </button>
                    </div>

                    {/* Property Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-2">
                      <Badge className="bg-primary-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                        {property.type}
                      </Badge>
                      {property.featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                          ⭐ Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-green-600 text-green-600 bg-white/90 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                        {property.status}
                      </Badge>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {property.images.length > 1 && (
                    <div className="p-3 sm:p-4 bg-gray-50">
                      <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                        {property.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'border-primary-600 shadow-lg scale-105' 
                                : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          >
                            <img
                              src={image}
                              alt={`${property.title} thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Property Header */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col space-y-4 sm:space-y-6">
                    <div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                        {property.title}
                      </h1>
                      
                      <div className="flex items-center text-gray-600 mb-4 sm:mb-6">
                        <MapPin className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-primary-600 flex-shrink-0" />
                        <span className="text-base sm:text-lg">{property.location} - {property.pincode}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between space-y-4 sm:space-y-0">
                      <div className="text-center sm:text-right">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                          {property.priceFormatted}
                        </div>
                        <div className="text-gray-600 text-sm sm:text-base">
                          <span>Price per sq ft: </span>
                          <span className="font-semibold">₹{Math.round(property.price / parseInt(property.area.replace(/[^\d]/g, '')))}</span>
                        </div>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl">
                      <div className="text-center">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                          <Bed className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{property.bedrooms}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Bedrooms</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                          <Bath className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{property.bathrooms}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Bathrooms</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                          <Square className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{property.area}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Area</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Property Description</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {property.description}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Amenities & Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {property.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity];
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-300 group">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 flex-shrink-0">
                            {typeof IconComponent === 'string' ? (
                              <span className="text-base sm:text-lg">{IconComponent}</span>
                            ) : (
                              <IconComponent className="h-4 sm:h-5 w-4 sm:w-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
                            )}
                          </div>
                          <span className="text-gray-700 font-medium group-hover:text-primary-700 transition-colors duration-300 text-sm sm:text-base">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Property Information */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Property Details</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { label: "Property ID", value: `#RW${property.id.toString().padStart(4, '0')}` },
                        { label: "Property Type", value: property.type },
                        { label: "Status", value: property.status },
                        { label: "City", value: property.city },
                        { label: "State", value: property.state },
                        { label: "Pincode", value: property.pincode },
                        { label: "Listed On", value: new Date(property.createdAt).toLocaleDateString('en-IN') },
                        { label: "Last Updated", value: new Date(property.updatedAt).toLocaleDateString('en-IN') }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-600 text-xs sm:text-sm">{item.label}:</span>
                          <span className="font-semibold text-gray-900 text-xs sm:text-sm text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Interested in this property?</h3>
                    <p className="text-primary-100 mb-4 sm:mb-6 text-xs sm:text-sm">
                      Get instant updates and exclusive offers on similar properties.
                    </p>
                    <div className="space-y-3">
                      <Button variant="secondary" className="w-full bg-white text-primary-600 hover:bg-gray-100 text-sm sm:text-base">
                        <Heart className="mr-2 h-4 w-4" />
                        Add to Wishlist
                      </Button>
                      <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary-600 text-sm sm:text-base">
                        <Download className="mr-2 h-4 w-4" />
                        Download Brochure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Image Modal */}
          {showImageModal && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-6xl w-full">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
                  aria-label="Close image gallery"
                >
                  <X className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>
                
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Full size image ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
                      </button>
                    </>
                  )}
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};