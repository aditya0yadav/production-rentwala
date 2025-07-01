const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProperties: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
}

interface PropertyFilters {
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  type?: string;
  bedrooms?: string;
  search?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

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

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Property API methods
  async getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property[]>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Property[]>(endpoint);
  }

  async getProperty(id: number): Promise<ApiResponse<Property>> {
    return this.request<Property>(`/properties/${id}`);
  }

  // Testimonial API methods
  async getTestimonials(featured?: boolean): Promise<ApiResponse<Testimonial[]>> {
    const queryParams = featured ? '?featured=true' : '';
    return this.request<Testimonial[]>(`/testimonials${queryParams}`);
  }

  // FAQ API methods
  async getFAQs(filters: { category?: string; featured?: boolean } = {}): Promise<ApiResponse<FAQ[]>> {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.featured) queryParams.append('featured', 'true');

    const queryString = queryParams.toString();
    const endpoint = `/faqs${queryString ? `?${queryString}` : ''}`;
    
    return this.request<FAQ[]>(endpoint);
  }

  // Admin API methods
  async adminLogin(credentials: { username: string; password: string }): Promise<ApiResponse<{ token: string }>> {
    return this.request<{ token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminProperties(): Promise<ApiResponse<Property[]>> {
    return this.request<Property[]>('/admin/properties');
  }

  async createProperty(propertyData: FormData): Promise<ApiResponse<Property>> {
    return this.request<Property>('/admin/properties', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: propertyData,
    });
  }

  async updateProperty(id: number, propertyData: FormData): Promise<ApiResponse<Property>> {
    return this.request<Property>(`/admin/properties/${id}`, {
      method: 'PUT',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: propertyData,
    });
  }

  async deleteProperty(id: number): Promise<ApiResponse<Property>> {
    return this.request<Property>(`/admin/properties/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    return this.request<Testimonial[]>('/admin/testimonials');
  }

  async createTestimonial(testimonialData: FormData): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>('/admin/testimonials', {
      method: 'POST',
      headers: {},
      body: testimonialData,
    });
  }

  async updateTestimonial(id: number, testimonialData: FormData): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>(`/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: {},
      body: testimonialData,
    });
  }

  async deleteTestimonial(id: number): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>(`/admin/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminFAQs(): Promise<ApiResponse<FAQ[]>> {
    return this.request<FAQ[]>('/admin/faqs');
  }

  async createFAQ(faqData: FAQ): Promise<ApiResponse<FAQ>> {
    return this.request<FAQ>('/admin/faqs', {
      method: 'POST',
      body: JSON.stringify(faqData),
    });
  }

  async updateFAQ(id: number, faqData: FAQ): Promise<ApiResponse<FAQ>> {
    return this.request<FAQ>(`/admin/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    });
  }

  async deleteFAQ(id: number): Promise<ApiResponse<FAQ>> {
    return this.request<FAQ>(`/admin/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/admin/stats');
  }
}

export const apiService = new ApiService();
export type { Property, Testimonial, FAQ, PropertyFilters, ApiResponse };