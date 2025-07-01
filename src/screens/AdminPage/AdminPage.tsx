import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Save, 
  X,
  Home,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  Filter,
  LogOut,
  MessageSquare,
  HelpCircle,
  Star,
  Image as ImageIcon,
  Eye
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

interface Property {
  id: number;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  location: string;
  city: string;
  state: string;
  pincode: string;
  price: number;
  priceFormatted: string;
  type: string;
  status: string;
  featured: boolean;
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: string;
  location: string;
  profileImage: string;
  rating: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalProperties: number;
  featuredProperties: number;
  totalTestimonials: number;
  totalFAQs: number;
  propertiesByType: Record<string, number>;
  propertiesByCity: Record<string, number>;
  averagePrice: number;
  totalValue: number;
}

export const AdminPage = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  // Property form state
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
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
    amenities: [] as string[],
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    images: [] as File[]
  });

  // Testimonial form state
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    title: '',
    content: '',
    author: '',
    location: '',
    profileImage: null as File | null,
    rating: 5,
    featured: false
  });

  // FAQ form state
  const [showFAQForm, setShowFAQForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [faqForm, setFAQForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    featured: false,
    order: 0
  });

  const propertyTypes = ['Apartment', 'Villa', 'House', 'Townhouse', 'Penthouse', 'Loft'];
  const faqCategories = ['General', 'Search', 'Selling', 'Buying', 'Contact', 'Pricing'];
  const commonAmenities = [
    'Parking', 'Security', 'Power Backup', 'Water Supply', 'Elevator',
    'Swimming Pool', 'Gym', 'Garden', 'Club House', 'Internet'
  ];

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', 'admin-token');
        await fetchAllData();
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
    setProperties([]);
    setTestimonials([]);
    setFAQs([]);
    setStats(null);
  };

  // Fetch all data
  const fetchAllData = async () => {
    await Promise.all([
      fetchProperties(),
      fetchTestimonials(),
      fetchFAQs(),
      fetchStats()
    ]);
  };

  // Fetch functions (mock implementations)
  const fetchProperties = async () => {
    // Mock data - replace with actual API calls
    const mockProperties: Property[] = [
      {
        id: 1,
        title: "Luxury Villa in DLF Phase 4",
        description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
        bedrooms: 4,
        bathrooms: 3,
        area: "2,500 sq ft",
        location: "Gurgaon, Haryana",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122001",
        price: 25000000,
        priceFormatted: "₹2,50,00,000",
        type: "Villa",
        status: "For Sale",
        featured: true,
        amenities: ["Swimming Pool", "Gym", "Garden", "Parking"],
        images: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400"],
        agent: { name: "Priya Sharma", phone: "+91 98765 43210", email: "priya@rentwala.com" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    setProperties(mockProperties);
  };

  const fetchTestimonials = async () => {
    const mockTestimonials: Testimonial[] = [
      {
        id: 1,
        title: "Exceptional Service!",
        content: "Our experience with Rentwala was outstanding.",
        author: "Priya Sharma",
        location: "Gurgaon, Haryana",
        profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
        rating: 5,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    setTestimonials(mockTestimonials);
  };

  const fetchFAQs = async () => {
    const mockFAQs: FAQ[] = [
      {
        id: 1,
        question: "How do I search for properties on Rentwala?",
        answer: "You can search for properties using our advanced search filters.",
        category: "Search",
        featured: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    setFAQs(mockFAQs);
  };

  const fetchStats = async () => {
    const mockStats: Stats = {
      totalProperties: 25,
      featuredProperties: 8,
      totalTestimonials: 15,
      totalFAQs: 12,
      propertiesByType: { 'Villa': 5, 'Apartment': 12, 'House': 8 },
      propertiesByCity: { 'Gurgaon': 10, 'Delhi': 8, 'Noida': 7 },
      averagePrice: 18500000,
      totalValue: 462500000
    };
    setStats(mockStats);
  };

  // Form handlers
  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting property:', propertyForm);
      
      if (editingProperty) {
        setProperties(prev => prev.map(p => 
          p.id === editingProperty.id 
            ? { ...p, ...propertyForm, updatedAt: new Date().toISOString() }
            : p
        ));
      } else {
        const newProperty: Property = {
          id: Date.now(),
          ...propertyForm,
          location: `${propertyForm.city}, ${propertyForm.state}`,
          priceFormatted: `₹${propertyForm.price.toLocaleString('en-IN')}`,
          images: propertyForm.images.map(file => URL.createObjectURL(file)),
          agent: {
            name: propertyForm.agentName,
            phone: propertyForm.agentPhone,
            email: propertyForm.agentEmail
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProperties(prev => [newProperty, ...prev]);
      }
      
      resetPropertyForm();
      alert(editingProperty ? 'Property updated successfully!' : 'Property added successfully!');
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('Error submitting property');
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting testimonial:', testimonialForm);
      
      if (editingTestimonial) {
        setTestimonials(prev => prev.map(t => 
          t.id === editingTestimonial.id 
            ? { ...t, ...testimonialForm, updatedAt: new Date().toISOString() }
            : t
        ));
      } else {
        const newTestimonial: Testimonial = {
          id: Date.now(),
          ...testimonialForm,
          profileImage: testimonialForm.profileImage ? URL.createObjectURL(testimonialForm.profileImage) : '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setTestimonials(prev => [newTestimonial, ...prev]);
      }
      
      resetTestimonialForm();
      alert(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial added successfully!');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Error submitting testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting FAQ:', faqForm);
      
      if (editingFAQ) {
        setFAQs(prev => prev.map(f => 
          f.id === editingFAQ.id 
            ? { ...f, ...faqForm, updatedAt: new Date().toISOString() }
            : f
        ));
      } else {
        const newFAQ: FAQ = {
          id: Date.now(),
          ...faqForm,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setFAQs(prev => [newFAQ, ...prev]);
      }
      
      resetFAQForm();
      alert(editingFAQ ? 'FAQ updated successfully!' : 'FAQ added successfully!');
    } catch (error) {
      console.error('Error submitting FAQ:', error);
      alert('Error submitting FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Reset forms
  const resetPropertyForm = () => {
    setPropertyForm({
      title: '', description: '', bedrooms: 1, bathrooms: 1, area: '', city: '', state: '', pincode: '',
      price: 0, type: 'Apartment', status: 'For Sale', featured: false, amenities: [],
      agentName: '', agentPhone: '', agentEmail: '', images: []
    });
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      title: '', content: '', author: '', location: '', profileImage: null, rating: 5, featured: false
    });
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const resetFAQForm = () => {
    setFAQForm({
      question: '', answer: '', category: 'General', featured: false, order: 0
    });
    setShowFAQForm(false);
    setEditingFAQ(null);
  };

  // Delete handlers
  const handleDeleteProperty = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
      alert('Property deleted successfully!');
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      alert('Testimonial deleted successfully!');
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFAQs(prev => prev.filter(f => f.id !== id));
      alert('FAQ deleted successfully!');
    }
  };

  // Edit handlers
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
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
      amenities: property.amenities,
      agentName: property.agent.name,
      agentPhone: property.agent.phone,
      agentEmail: property.agent.email,
      images: []
    });
    setShowPropertyForm(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      title: testimonial.title,
      content: testimonial.content,
      author: testimonial.author,
      location: testimonial.location,
      profileImage: null,
      rating: testimonial.rating,
      featured: testimonial.featured
    });
    setShowTestimonialForm(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFAQForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      featured: faq.featured,
      order: faq.order
    });
    setShowFAQForm(true);
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white hero-pattern flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600 mt-2">Access Rentwala Admin Panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Demo credentials: admin / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rentwala Admin</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
              { id: 'properties', name: 'Properties', icon: Home },
              { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
              { id: 'faqs', name: 'FAQs', icon: HelpCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Properties</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
                    </div>
                    <Home className="h-8 w-8 text-primary-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Testimonials</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalTestimonials}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-primary-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">FAQs</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalFAQs}</p>
                    </div>
                    <HelpCircle className="h-8 w-8 text-primary-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Price</p>
                      <p className="text-2xl font-bold text-gray-900">₹{(stats.averagePrice / 10000000).toFixed(1)}Cr</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary-600" />
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
              <h2 className="text-2xl font-bold text-gray-900">Properties Management</h2>
              <Button 
                onClick={() => setShowPropertyForm(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={property.images[0] || '/placeholder-property.jpg'}
                                alt={property.title}
                                className="w-12 h-12 rounded-lg object-cover mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500">{property.location}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                              {property.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {property.priceFormatted}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              property.featured 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {property.featured ? 'Featured' : 'Regular'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProperty(property)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProperty(property.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
              <Button 
                onClick={() => setShowTestimonialForm(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTestimonial(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{testimonial.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{testimonial.content}</p>
                    
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.profileImage}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
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
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">FAQs Management</h2>
              <Button 
                onClick={() => setShowFAQForm(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {faq.category}
                          </span>
                          {faq.featured && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditFAQ(faq)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFAQ(faq.id)}
                          className="text-red-600 hover:text-red-700"
                        >
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

      {/* Property Form Modal */}
      {showPropertyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <Button variant="outline" onClick={resetPropertyForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handlePropertySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Property title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Property description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
                    <Input
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
                    <Input
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, bathrooms: parseInt(e.target.value) }))}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                    <Input
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, area: e.target.value }))}
                      placeholder="e.g., 1200 sq ft"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                    <Input
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <Input
                      value={propertyForm.city}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g., Gurgaon"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <Input
                      value={propertyForm.state}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="e.g., Haryana"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <Input
                      value={propertyForm.pincode}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="e.g., 122001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Images (Multiple)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, images: Array.from(e.target.files || []) }))}
                      className="hidden"
                      id="property-images"
                    />
                    <label htmlFor="property-images" className="cursor-pointer">
                      <span className="text-sm text-gray-600">Click to upload multiple images</span>
                    </label>
                    {propertyForm.images.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        {propertyForm.images.length} image(s) selected
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name *</label>
                    <Input
                      value={propertyForm.agentName}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, agentName: e.target.value }))}
                      placeholder="Agent name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Phone *</label>
                    <Input
                      value={propertyForm.agentPhone}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, agentPhone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Email *</label>
                    <Input
                      type="email"
                      value={propertyForm.agentEmail}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, agentEmail: e.target.value }))}
                      placeholder="agent@rentwala.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={propertyForm.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPropertyForm(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
                            } else {
                              setPropertyForm(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }));
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={propertyForm.featured}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Featured Property</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={resetPropertyForm}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary-600 hover:bg-primary-700"
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : editingProperty ? 'Update Property' : 'Add Property'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showTestimonialForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <Button variant="outline" onClick={resetTestimonialForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <Input
                    value={testimonialForm.title}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Testimonial title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <textarea
                    value={testimonialForm.content}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Testimonial content"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                    <Input
                      value={testimonialForm.author}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <Input
                      value={testimonialForm.location}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Gurgaon, Haryana"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, profileImage: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      {[5, 4, 3, 2, 1].map(rating => (
                        <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={testimonialForm.featured}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Featured Testimonial</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={resetTestimonialForm}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary-600 hover:bg-primary-700"
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Form Modal */}
      {showFAQForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <Button variant="outline" onClick={resetFAQForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleFAQSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                  <Input
                    value={faqForm.question}
                    onChange={(e) => setFAQForm(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="FAQ question"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
                  <textarea
                    value={faqForm.answer}
                    onChange={(e) => setFAQForm(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="FAQ answer"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={faqForm.category}
                      onChange={(e) => setFAQForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      {faqCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                    <Input
                      type="number"
                      value={faqForm.order}
                      onChange={(e) => setFAQForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      placeholder="Display order"
                      min="0"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={faqForm.featured}
                        onChange={(e) => setFAQForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Featured FAQ</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={resetFAQForm}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary-600 hover:bg-primary-700"
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : editingFAQ ? 'Update FAQ' : 'Add FAQ'}
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