import React, { useState, useEffect } from "react";
import { Search, MapPin, Bed, Bath, Square, Filter, SlidersHorizontal, Grid, List, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "../../components/SEO/SEOHead";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { HeaderSection } from "../HomePageDesktop/sections/HeaderSection";
import { apiService, Property, PropertyFilters } from "../../services/api";

export const PropertiesPage = (): JSX.Element => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProperties: 0,
    hasNext: false,
    hasPrev: false,
    limit: 9
  });

  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    minPrice: "",
    maxPrice: "",
    city: "",
    type: "",
    bedrooms: "",
    sortBy: "created_at",
    sortOrder: "DESC",
    page: 1,
    limit: 9
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { label: "All Prices", min: "", max: "" },
    { label: "Under ₹50L", min: "", max: "5000000" },
    { label: "₹50L - ₹1Cr", min: "5000000", max: "10000000" },
    { label: "₹1Cr - ₹2Cr", min: "10000000", max: "20000000" },
    { label: "₹2Cr - ₹5Cr", min: "20000000", max: "50000000" },
    { label: "Over ₹5Cr", min: "50000000", max: "" }
  ];

  const locations = [
    "All Locations",
    "Gurgaon",
    "Delhi",
    "Noida",
    "Faridabad",
    "Ghaziabad"
  ];

  const propertyTypes = [
    "All Types",
    "House",
    "Apartment",
    "Villa",
    "Townhouse",
    "Loft",
    "Penthouse"
  ];

  const fetchProperties = async (newFilters: PropertyFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getProperties(newFilters);
      
      if (response.success) {
        setProperties(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError(response.message || 'Failed to fetch properties');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (key: keyof PropertyFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  const handlePriceRangeChange = (range: { min: string; max: string }) => {
    const newFilters = { 
      ...filters, 
      minPrice: range.min, 
      maxPrice: range.max,
      page: 1 
    };
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  const handleSearch = () => {
    fetchProperties(filters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: PropertyFilters = {
      search: "",
      minPrice: "",
      maxPrice: "",
      city: "",
      type: "",
      bedrooms: "",
      sortBy: "created_at",
      sortOrder: "DESC",
      page: 1,
      limit: 9
    };
    setFilters(clearedFilters);
    fetchProperties(clearedFilters);
  };

  // Generate dynamic SEO content based on filters
  const generateSEOContent = () => {
    let title = "Properties for Sale in India - Rentwala";
    let description = "Browse premium properties for sale across India. Find your perfect home with Rentwala's extensive property listings.";
    let keywords = "properties for sale India, real estate listings, buy property India";

    if (filters.city) {
      title = `Properties for Sale in ${filters.city} - Rentwala`;
      description = `Discover premium properties for sale in ${filters.city}. Browse verified listings with photos, prices, and detailed information.`;
      keywords += `, ${filters.city} properties, ${filters.city} real estate`;
    }

    if (filters.type) {
      title = `${filters.type} for Sale in ${filters.city || 'India'} - Rentwala`;
      description = `Find ${filters.type.toLowerCase()} for sale in ${filters.city || 'India'}. Premium ${filters.type.toLowerCase()} listings with verified details.`;
      keywords += `, ${filters.type} for sale, ${filters.type} ${filters.city || 'India'}`;
    }

    return { title, description, keywords };
  };

  const seoContent = generateSEOContent();

  const propertiesStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": seoContent.title,
    "description": seoContent.description,
    "url": "https://rentwala.com/properties",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": pagination.totalProperties,
      "itemListElement": properties.map((property, index) => ({
        "@type": "RealEstateListing",
        "position": index + 1,
        "name": property.title,
        "url": `https://rentwala.com/properties/${property.id}`,
        "image": property.images[0],
        "price": {
          "@type": "PriceSpecification",
          "price": property.price,
          "priceCurrency": "INR"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.city,
          "addressRegion": property.state,
          "addressCountry": "IN"
        }
      }))
    },
    "breadcrumb": {
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
        }
      ]
    }
  };

  if (loading && properties.length === 0) {
    return (
      <>
        <SEOHead {...seoContent} />
        <div className="min-h-screen bg-gray-50">
          <HeaderSection />
          <div className="flex items-center justify-center p-4 min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Loading Properties</h3>
              <p className="text-gray-600 text-sm sm:text-base">Please wait while we fetch the latest listings...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        url="https://rentwala.com/properties"
        canonical="https://rentwala.com/properties"
        structuredData={propertiesStructuredData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <HeaderSection />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-50 to-white hero-pattern py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 sm:space-y-6 animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 animate-slide-up">
                  Find Your <span className="text-primary-600 animate-pulse-slow">Perfect Property</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Discover exceptional properties that match your lifestyle and budget in India's prime locations. 
                  Use our advanced filters to find exactly what you're looking for.
                </p>
              </div>
            </div>
          </section>

          {/* Mobile Search Bar */}
          <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 py-3">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="px-3 py-2 border-primary-600 text-primary-600"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSearch}
                  className="px-3 py-2 bg-primary-600 hover:bg-primary-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Search and Filter Section */}
          <section className="hidden lg:block py-8 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="shadow-lg border-0 animate-scale-in">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Search Input */}
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search properties..."
                          value={filters.search}
                          onChange={(e) => handleFilterChange('search', e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          className="pl-10 transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <select
                        value={`${filters.minPrice}-${filters.maxPrice}`}
                        onChange={(e) => {
                          const [min, max] = e.target.value.split('-');
                          handlePriceRangeChange({ min, max });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                      >
                        {priceRanges.map((range, index) => (
                          <option key={index} value={`${range.min}-${range.max}`}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                      >
                        {locations.map((location) => (
                          <option key={location} value={location === 'All Locations' ? '' : location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type Filter */}
                    <div>
                      <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                      >
                        {propertyTypes.map((type) => (
                          <option key={type} value={type === 'All Types' ? '' : type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Button */}
                    <div>
                      <Button 
                        onClick={handleSearch}
                        className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                        disabled={loading}
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        {loading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Bedrooms:</span>
                        </div>
                        <select
                          value={filters.bedrooms}
                          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:shadow-md"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                          <option value="5">5+</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
              <div className="bg-white w-full rounded-t-2xl p-6 space-y-6 animate-slide-up max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={`${filters.minPrice}-${filters.maxPrice}`}
                      onChange={(e) => {
                        const [min, max] = e.target.value.split('-');
                        handlePriceRangeChange({ min, max });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={`${range.min}-${range.max}`}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location === 'All Locations' ? '' : location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type === 'All Types' ? '' : type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearFilters();
                      setShowFilters(false);
                    }}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => {
                      handleSearch();
                      setShowFilters(false);
                    }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Apply Filters'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Properties</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button 
                  onClick={() => fetchProperties()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header with View Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 animate-fade-in">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Available Properties</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {loading ? 'Loading...' : `${pagination.totalProperties} properties found`}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end space-x-4">
                  {/* View Mode Toggle - Hidden on mobile */}
                  <div className="hidden sm:flex items-center space-x-2 bg-white rounded-lg p-1 border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-primary-600 text-white' : ''}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-primary-600 text-white' : ''}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
                    <select 
                      value={`${filters.sortBy}-${filters.sortOrder}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        handleFilterChange('sortBy', sortBy);
                        handleFilterChange('sortOrder', sortOrder);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:shadow-md bg-white"
                    >
                      <option value="price-ASC">Price: Low to High</option>
                      <option value="price-DESC">Price: High to Low</option>
                      <option value="created_at-DESC">Newest First</option>
                      <option value="bedrooms-DESC">Most Bedrooms</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              {properties.length === 0 && !loading ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {properties.map((property, index) => (
                      <Card key={property.id} className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden hover:-translate-y-1 animate-scale-in ${
                        viewMode === 'list' ? 'sm:flex sm:flex-row' : ''
                      }`} style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={`relative overflow-hidden ${
                          viewMode === 'list' ? 'sm:w-80 sm:flex-shrink-0' : ''
                        }`}>
                          <img
                            src={property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'}
                            alt={property.title}
                            className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                              viewMode === 'list' ? 'h-48 sm:h-full' : 'h-48 sm:h-56 lg:h-64'
                            }`}
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            <Badge className="bg-primary-600 text-white text-xs animate-bounce-in">
                              {property.type}
                            </Badge>
                            {property.featured && (
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 text-xs animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <CardContent className={`p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 ${
                          viewMode === 'list' ? 'flex flex-col justify-between' : ''
                        }`}>
                          <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                              {property.title}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1 group-hover:text-primary-600 transition-colors duration-300 flex-shrink-0" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2 sm:line-clamp-3">
                              {property.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg group-hover:text-primary-600 transition-colors duration-300">
                              <Bed className="h-4 w-4 mr-1" />
                              <span className="font-medium">{property.bedrooms}</span>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg group-hover:text-primary-600 transition-colors duration-300">
                              <Bath className="h-4 w-4 mr-1" />
                              <span className="font-medium">{property.bathrooms}</span>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg group-hover:text-primary-600 transition-colors duration-300">
                              <Square className="h-4 w-4 mr-1" />
                              <span className="font-medium text-xs">{property.area}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-600">Price</p>
                              <p className="text-xl sm:text-2xl font-bold text-primary-600 animate-pulse-slow">{property.priceFormatted}</p>
                            </div>
                            <Link to={`/properties/${property.id}`}>
                              <Button className="bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg text-sm sm:text-base px-4 sm:px-6">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <nav className="flex items-center justify-center space-x-2 mt-8 sm:mt-12" aria-label="Pagination">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev || loading}
                        className="p-2"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          let pageNumber;
                          if (pagination.totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (pagination.currentPage >= pagination.totalPages - 2) {
                            pageNumber = pagination.totalPages - 4 + i;
                          } else {
                            pageNumber = pagination.currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNumber}
                              variant={pageNumber === pagination.currentPage ? "default" : "outline"}
                              onClick={() => handlePageChange(pageNumber)}
                              disabled={loading}
                              className={`w-10 h-10 p-0 ${
                                pageNumber === pagination.currentPage 
                                  ? 'bg-primary-600 text-white' 
                                  : 'hover:bg-primary-50'
                              }`}
                              aria-label={`Page ${pageNumber}`}
                              aria-current={pageNumber === pagination.currentPage ? 'page' : undefined}
                            >
                              {pageNumber}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext || loading}
                        className="p-2"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  )}
                </>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-primary-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg sm:text-xl text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Our expert agents are here to help you find the perfect property that meets all your requirements in India's prime locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto">
                    Contact an Agent
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto">
                  Schedule a Viewing
                </Button>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </section>
        </main>
      </div>
    </>
  );
};