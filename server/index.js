const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import models
const Property = require('./models/Property');
const Testimonial = require('./models/Testimonial');
const FAQ = require('./models/FAQ');

// Import database
const database = require('./database/database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://sturdy-space-rotary-phone-wrvqrjwgqwqj39r4w-5173.app.github.dev/'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};

// Error handling middleware
const handleError = (res, error, message = 'An error occurred') => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: message,
    error: error.message
  });
};

// PROPERTY ROUTES

// Get all properties with filtering and pagination
app.get('/api/properties', async (req, res) => {
  try {
    const filters = {
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      city: req.query.city,
      type: req.query.type,
      bedrooms: req.query.bedrooms,
      search: req.query.search,
      featured: req.query.featured,
      sortBy: req.query.sortBy || 'created_at',
      sortOrder: req.query.sortOrder || 'DESC'
    };

    const pagination = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10
    };

    const [properties, total] = await Promise.all([
      Property.findAll(filters, pagination),
      Property.count(filters)
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    res.json({
      success: true,
      data: properties,
      pagination: {
        currentPage: pagination.page,
        totalPages: totalPages,
        totalProperties: total,
        hasNext: pagination.page < totalPages,
        hasPrev: pagination.page > 1,
        limit: pagination.limit
      }
    });
  } catch (error) {
    handleError(res, error, 'Error fetching properties');
  }
});

// Get single property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    handleError(res, error, 'Error fetching property');
  }
});

// TESTIMONIAL ROUTES

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const filters = {
      featured: req.query.featured
    };
    
    const testimonials = await Testimonial.findAll(filters);
    
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    handleError(res, error, 'Error fetching testimonials');
  }
});

// FAQ ROUTES

// Get all FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      featured: req.query.featured
    };
    
    const faqs = await FAQ.findAll(filters);
    
    res.json({
      success: true,
      data: faqs
    });
  } catch (error) {
    handleError(res, error, 'Error fetching FAQs');
  }
});

// ADMIN ROUTES

// Admin login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password) ;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      res.json({
        success: true,
        message: 'Login successful',
        token: 'admin-token-' + Date.now()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    handleError(res, error, 'Login error');
  }
});

// ADMIN PROPERTY ROUTES

// Get all properties for admin
app.get('/api/admin/properties', async (req, res) => {
  try {
    const properties = await Property.findAll({}, { page: 1, limit: 1000 });
    const total = await Property.count({});
    
    res.json({
      success: true,
      data: properties,
      total: total
    });
  } catch (error) {
    handleError(res, error, 'Error fetching properties');
  }
});

// Create new property
app.post('/api/admin/properties', upload.array('images', 10), async (req, res) => {
  try {
    console.log('Creating property with data:', req.body);
    console.log('Files received:', req.files);

    // Process uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    // Parse amenities if it's a string
    let amenities = [];
    if (req.body.amenities) {
      try {
        amenities = typeof req.body.amenities === 'string' 
          ? JSON.parse(req.body.amenities) 
          : req.body.amenities;
      } catch (e) {
        amenities = req.body.amenities.split(',').map(a => a.trim());
      }
    }

    const propertyData = {
      title: req.body.title || '',
      description: req.body.description || '',
      bedrooms: parseInt(req.body.bedrooms) || 1,
      bathrooms: parseInt(req.body.bathrooms) || 1,
      area: req.body.area || '',
      city: req.body.city || '',
      state: req.body.state || '',
      pincode: req.body.pincode || '',
      price: parseInt(req.body.price) || 0,
      type: req.body.type || 'Apartment',
      status: req.body.status || 'For Sale',
      featured: req.body.featured === 'true' || req.body.featured === true,
      amenities: amenities,
      images: images,
      location: `${req.body.city}, ${req.body.state}`
    };
    
    propertyData.priceFormatted = `₹${parseInt(propertyData.price).toLocaleString('en-IN')}`;
    
    console.log('Processed property data:', propertyData);
    
    const property = new Property(propertyData);
    const id = await property.save();
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: { ...propertyData, id }
    });
  } catch (error) {
    console.error('Error creating property:', error);
    handleError(res, error, 'Error creating property');
  }
});

// Update property
app.put('/api/admin/properties/:id', upload.array('images', 10), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    const newImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const keepExistingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    const allImages = [...keepExistingImages, ...newImages];
    
    let amenities = property.amenities;
    if (req.body.amenities) {
      try {
        amenities = typeof req.body.amenities === 'string' 
          ? JSON.parse(req.body.amenities) 
          : req.body.amenities;
      } catch (e) {
        amenities = req.body.amenities.split(',').map(a => a.trim());
      }
    }

    const updatedData = {
      title: req.body.title || property.title,
      description: req.body.description || property.description,
      bedrooms: parseInt(req.body.bedrooms) || property.bedrooms,
      bathrooms: parseInt(req.body.bathrooms) || property.bathrooms,
      area: req.body.area || property.area,
      city: req.body.city || property.city,
      state: req.body.state || property.state,
      pincode: req.body.pincode || property.pincode,
      price: parseInt(req.body.price) || property.price,
      type: req.body.type || property.type,
      status: req.body.status || property.status,
      featured: req.body.featured === 'true' || req.body.featured === true,
      amenities: amenities,
      images: allImages,
      location: `${req.body.city || property.city}, ${req.body.state || property.state}`
    };
    
    updatedData.priceFormatted = `₹${parseInt(updatedData.price).toLocaleString('en-IN')}`;
    
    Object.assign(property, updatedData);
    await property.save();
    
    res.json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    handleError(res, error, 'Error updating property');
  }
});

// Delete property
app.delete('/api/admin/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    await Property.delete(req.params.id);
    
    res.json({
      success: true,
      message: 'Property deleted successfully',
      data: property
    });
  } catch (error) {
    handleError(res, error, 'Error deleting property');
  }
});

// ADMIN TESTIMONIAL ROUTES

// Get all testimonials for admin
app.get('/api/admin/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({});
    
    res.json({
      success: true,
      data: testimonials,
      total: testimonials.length
    });
  } catch (error) {
    handleError(res, error, 'Error fetching testimonials');
  }
});

// Create new testimonial
app.post('/api/admin/testimonials', upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Creating testimonial with data:', req.body);
    console.log('File received:', req.file);

    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage || '';
    
    const testimonialData = {
      title: req.body.title || '',
      content: req.body.content || '',
      author: req.body.author || '',
      location: req.body.location || '',
      profileImage: profileImage,
      rating: parseInt(req.body.rating) || 5,
      featured: req.body.featured === 'true' || req.body.featured === true
    };
    
    console.log('Processed testimonial data:', testimonialData);
    
    const testimonial = new Testimonial(testimonialData);
    const id = await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: { ...testimonialData, id }
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    handleError(res, error, 'Error creating testimonial');
  }
});

// Update testimonial
app.put('/api/admin/testimonials/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    const profileImage = req.file ? `/uploads/${req.file.filename}` : 
                        req.body.profileImage || testimonial.profileImage;
    
    const updatedData = {
      title: req.body.title || testimonial.title,
      content: req.body.content || testimonial.content,
      author: req.body.author || testimonial.author,
      location: req.body.location || testimonial.location,
      profileImage: profileImage,
      rating: parseInt(req.body.rating) || testimonial.rating,
      featured: req.body.featured === 'true' || req.body.featured === true
    };
    
    Object.assign(testimonial, updatedData);
    await testimonial.save();
    
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    handleError(res, error, 'Error updating testimonial');
  }
});

// Delete testimonial
app.delete('/api/admin/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    await Testimonial.delete(req.params.id);
    
    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: testimonial
    });
  } catch (error) {
    handleError(res, error, 'Error deleting testimonial');
  }
});

// ADMIN FAQ ROUTES

// Get all FAQs for admin
app.get('/api/admin/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.findAll({});
    
    res.json({
      success: true,
      data: faqs,
      total: faqs.length
    });
  } catch (error) {
    handleError(res, error, 'Error fetching FAQs');
  }
});

// Create new FAQ
app.post('/api/admin/faqs', async (req, res) => {
  try {
    console.log('Creating FAQ with data:', req.body);

    const faqData = {
      question: req.body.question || '',
      answer: req.body.answer || '',
      category: req.body.category || 'General',
      featured: req.body.featured === 'true' || req.body.featured === true,
      order: parseInt(req.body.order) || 0
    };
    
    console.log('Processed FAQ data:', faqData);
    
    const faq = new FAQ(faqData);
    const id = await faq.save();
    
    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: { ...faqData, id }
    });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    handleError(res, error, 'Error creating FAQ');
  }
});

// Update FAQ
app.put('/api/admin/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    
    const updatedData = {
      question: req.body.question || faq.question,
      answer: req.body.answer || faq.answer,
      category: req.body.category || faq.category,
      featured: req.body.featured === 'true' || req.body.featured === true,
      order: parseInt(req.body.order) || faq.order
    };
    
    Object.assign(faq, updatedData);
    await faq.save();
    
    res.json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    });
  } catch (error) {
    handleError(res, error, 'Error updating FAQ');
  }
});

// Delete FAQ
app.delete('/api/admin/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    
    await FAQ.delete(req.params.id);
    
    res.json({
      success: true,
      message: 'FAQ deleted successfully',
      data: faq
    });
  } catch (error) {
    handleError(res, error, 'Error deleting FAQ');
  }
});

// Get statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [properties, testimonials, faqs] = await Promise.all([
      Property.findAll({}, { page: 1, limit: 1000 }),
      Testimonial.findAll({}),
      FAQ.findAll({})
    ]);

    const stats = {
      totalProperties: properties.length,
      featuredProperties: properties.filter(p => p.featured).length,
      totalTestimonials: testimonials.length,
      totalFAQs: faqs.length,
      propertiesByType: {},
      propertiesByCity: {},
      averagePrice: 0,
      totalValue: 0
    };
    
    // Calculate statistics
    properties.forEach(property => {
      stats.propertiesByType[property.type] = (stats.propertiesByType[property.type] || 0) + 1;
      stats.propertiesByCity[property.city] = (stats.propertiesByCity[property.city] || 0) + 1;
      stats.totalValue += property.price;
    });
    
    stats.averagePrice = stats.totalProperties > 0 ? Math.round(stats.totalValue / stats.totalProperties) : 0;
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    handleError(res, error, 'Error fetching statistics');
  }
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: error.message
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  database.close();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin credentials: username=admin, password=admin123`);
  console.log(`💾 Database initialized with sample data`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
});