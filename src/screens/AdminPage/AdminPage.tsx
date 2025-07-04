import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Home,
  MessageSquare,
  HelpCircle,
  BarChart3,
  LogOut,
  Star,
  MapPin,
  Bed,
  Bath,
  Square
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { apiService, Property, Testimonial, FAQ } from "../../services/api";

interface AdminStats {
  totalProperties: number;
  featuredProperties: number;
  totalTestimonials: number;
  totalFAQs: number;
  propertiesByType: { [key: string]: number };
  propertiesByCity: { [key: string]: number };
  averagePrice: number;
  totalValue: number;
}

export const AdminPage = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'testimonials' | 'faqs'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login state
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  // Modal states
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    city: '',
    state: '',
    pincode: '',
    price: 0,
    type: 'Apartment',
    status: 'For Sale',
    featured: false,
    amenities: '',
    images: [] as File[]
  });

  const [testimonialForm, setTestimonialForm] = useState({
    title: '',
    content: '',
    author: '',
    location: '',
    rating: 5,
    featured: false,
    profileImage: null as File | null
  });

  const [faqForm, setFAQForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    featured: false,
    order: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const showMessage = (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      setSuccess(message);
      setError(null);
    } else {
      setError(message);
      setSuccess(null);
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.adminLogin(loginData);
      console.log(response)
      if (response.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsLoggedIn(true);
        showMessage('Login successful!', 'success');
        fetchData();
      }
    } catch (error) {
      showMessage('Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propertiesRes, testimonialsRes, faqsRes, statsRes] = await Promise.all([
        apiService.getAdminProperties(),
        apiService.getAdminTestimonials(),
        apiService.getAdminFAQs(),
        apiService.getAdminStats()
      ]);

      if (propertiesRes.success) setProperties(propertiesRes.data);
      if (testimonialsRes.success) setTestimonials(testimonialsRes.data);
      if (faqsRes.success) setFaqs(faqsRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (error) {
      showMessage('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Property handlers
  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(propertyForm).forEach(([key, value]) => {
        if (key === 'images') {
          (value as File[]).forEach(file => {
            formData.append('images', file);
          });
        } else if (key === 'amenities') {
          formData.append(key, JSON.stringify(value.split(',').map(a => a.trim()).filter(a => a)));
        } else {
          formData.append(key, value.toString());
        }
      });

      let response;
      if (editingItem) {
        response = await apiService.updateProperty(editingItem.id, formData);
      } else {
        response = await apiService.createProperty(formData);
      }

      if (response.success) {
        showMessage(`Property ${editingItem ? 'updated' : 'created'} successfully!`, 'success');
        setShowPropertyModal(false);
        setEditingItem(null);
        resetPropertyForm();
        fetchData();
      }
    } catch (error) {
      showMessage(`Error ${editingItem ? 'updating' : 'creating'} property`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    setLoading(true);
    try {
      const response = await apiService.deleteProperty(id);
      if (response.success) {
        showMessage('Property deleted successfully!', 'success');
        fetchData();
      }
    } catch (error) {
      showMessage('Error deleting property', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Testimonial handlers
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.entries(testimonialForm).forEach(([key, value]) => {
        if (key === 'profileImage' && value) {
          formData.append(key, value);
        } else if (key !== 'profileImage') {
          formData.append(key, value.toString());
        }
      });

      let response;
      if (editingItem) {
        response = await apiService.updateTestimonial(editingItem.id, formData);
      } else {
        response = await apiService.createTestimonial(formData);
      }

      if (response.success) {
        showMessage(`Testimonial ${editingItem ? 'updated' : 'created'} successfully!`, 'success');
        setShowTestimonialModal(false);
        setEditingItem(null);
        resetTestimonialForm();
        fetchData();
      }
    } catch (error) {
      showMessage(`Error ${editingItem ? 'updating' : 'creating'} testimonial`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    setLoading(true);
    try {
      const response = await apiService.deleteTestimonial(id);
      if (response.success) {
        showMessage('Testimonial deleted successfully!', 'success');
        fetchData();
      }
    } catch (error) {
      showMessage('Error deleting testimonial', 'error');
    } finally {
      setLoading(false);
    }
  };

  // FAQ handlers
  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (editingItem) {
        response = await apiService.updateFAQ(editingItem.id, faqForm);
      } else {
        response = await apiService.createFAQ(faqForm);
      }

      if (response.success) {
        showMessage(`FAQ ${editingItem ? 'updated' : 'created'} successfully!`, 'success');
        setShowFAQModal(false);
        setEditingItem(null);
        resetFAQForm();
        fetchData();
      }
    } catch (error) {
      showMessage(`Error ${editingItem ? 'updating' : 'creating'} FAQ`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    setLoading(true);
    try {
      const response = await apiService.deleteFAQ(id);
      if (response.success) {
        showMessage('FAQ deleted successfully!', 'success');
        fetchData();
      }
    } catch (error) {
      showMessage('Error deleting FAQ', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Form reset functions
  const resetPropertyForm = () => {
    setPropertyForm({
      title: '',
      description: '',
      bedrooms: 1,
      bathrooms: 1,
      area: '',
      city: '',
      state: '',
      pincode: '',
      price: 0,
      type: 'Apartment',
      status: 'For Sale',
      featured: false,
      amenities: '',
      images: []
    });
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      title: '',
      content: '',
      author: '',
      location: '',
      rating: 5,
      featured: false,
      profileImage: null
    });
  };

  const resetFAQForm = () => {
    setFAQForm({
      question: '',
      answer: '',
      category: 'General',
      featured: false,
      order: 0
    });
  };

  // Edit handlers
  const handleEditProperty = (property: Property) => {
    setEditingItem(property);
    setPropertyForm({
      title: property.title,
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      city: property.city,
      state: property.state,
      pincode: property.pincode,
      price: property.price,
      type: property.type,
      status: property.status,
      featured: property.featured,
      amenities: property.amenities.join(', '),
      images: []
    });
    setShowPropertyModal(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingItem(testimonial);
    setTestimonialForm({
      title: testimonial.title,
      content: testimonial.content,
      author: testimonial.author,
      location: testimonial.location,
      rating: testimonial.rating,
      featured: testimonial.featured,
      profileImage: null
    });
    setShowTestimonialModal(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingItem(faq);
    setFAQForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      featured: faq.featured,
      order: faq.order
    });
    setShowFAQModal(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <Input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'properties', label: 'Properties', icon: Home },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Featured Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.featuredProperties}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Testimonials</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalTestimonials}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">FAQs</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalFAQs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Type</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.propertiesByType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-gray-600">{type}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by City</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.propertiesByCity).map(([city, count]) => (
                      <div key={city} className="flex items-center justify-between">
                        <span className="text-gray-600">{city}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
              <Button onClick={() => { resetPropertyForm(); setShowPropertyModal(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.featured && (
                      <Badge className="absolute top-2 left-2 bg-primary-600">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-primary-600 mb-3">{property.priceFormatted}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
              <Button onClick={() => { resetTestimonialForm(); setShowTestimonialModal(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.profileImage || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.author}</h3>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      {testimonial.featured && (
                        <Badge className="ml-auto bg-primary-600">Featured</Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{testimonial.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{testimonial.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTestimonial(testimonial)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
              <Button onClick={() => { resetFAQForm(); setShowFAQModal(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                          {faq.featured && (
                            <Badge className="ml-2 bg-primary-600">Featured</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{faq.answer}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Category: {faq.category}</span>
                          <span className="mx-2">•</span>
                          <span>Order: {faq.order}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEditFAQ(faq)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteFAQ(faq.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property Modal */}
      {showPropertyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {editingItem ? 'Edit Property' : 'Add Property'}
                </h3>
                <Button variant="outline" onClick={() => { setShowPropertyModal(false); setEditingItem(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handlePropertySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <Input
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Loft">Loft</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <Input
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: parseInt(e.target.value) })}
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <Input
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: parseInt(e.target.value) })}
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <Input
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                      placeholder="e.g., 1200 sq ft"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input
                      value={propertyForm.city}
                      onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Input
                      value={propertyForm.state}
                      onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <Input
                      value={propertyForm.pincode}
                      onChange={(e) => setPropertyForm({ ...propertyForm, pincode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <Input
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({ ...propertyForm, price: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={propertyForm.status}
                      onChange={(e) => setPropertyForm({ ...propertyForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Sold">Sold</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                  <Input
                    value={propertyForm.amenities}
                    onChange={(e) => setPropertyForm({ ...propertyForm, amenities: e.target.value })}
                    placeholder="Swimming Pool, Gym, Parking, Security"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setPropertyForm({ ...propertyForm, images: Array.from(e.target.files || []) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={propertyForm.featured}
                    onChange={(e) => setPropertyForm({ ...propertyForm, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Property</label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Property'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowPropertyModal(false); setEditingItem(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <Button variant="outline" onClick={() => { setShowTestimonialModal(false); setEditingItem(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={testimonialForm.title}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={testimonialForm.content}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <Input
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input
                      value={testimonialForm.location}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, profileImage: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="testimonial-featured"
                    checked={testimonialForm.featured}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="testimonial-featured" className="text-sm font-medium text-gray-700">Featured Testimonial</label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Testimonial'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowTestimonialModal(false); setEditingItem(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {editingItem ? 'Edit FAQ' : 'Add FAQ'}
                </h3>
                <Button variant="outline" onClick={() => { setShowFAQModal(false); setEditingItem(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleFAQSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                  <Input
                    value={faqForm.question}
                    onChange={(e) => setFAQForm({ ...faqForm, question: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={faqForm.answer}
                    onChange={(e) => setFAQForm({ ...faqForm, answer: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={faqForm.category}
                      onChange={(e) => setFAQForm({ ...faqForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="General">General</option>
                      <option value="Buying">Buying</option>
                      <option value="Selling">Selling</option>
                      <option value="Renting">Renting</option>
                      <option value="Investment">Investment</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <Input
                      type="number"
                      value={faqForm.order}
                      onChange={(e) => setFAQForm({ ...faqForm, order: parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="faq-featured"
                    checked={faqForm.featured}
                    onChange={(e) => setFAQForm({ ...faqForm, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="faq-featured" className="text-sm font-medium text-gray-700">Featured FAQ</label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save FAQ'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowFAQModal(false); setEditingItem(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};