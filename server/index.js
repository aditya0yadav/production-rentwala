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
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123'
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
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQs',
      error: error.message
    });
  }
});

// ADMIN ROUTES

// Admin login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
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
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
});

// Create new property
app.post('/api/admin/properties', upload.array('images', 10), async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    const propertyData = {
      ...req.body,
      images: images,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
      featured: req.body.featured === 'true',
      price: parseInt(req.body.price) || 0,
      bedrooms: parseInt(req.body.bedrooms) || 1,
      bathrooms: parseInt(req.body.bathrooms) || 1,
      location: `${req.body.city}, ${req.body.state}`
    };
    
    propertyData.priceFormatted = `₹${parseInt(propertyData.price).toLocaleString('en-IN')}`;
    
    const property = new Property(propertyData);
    const id = await property.save();
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: { ...property, id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
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
    
    const updatedData = {
      ...req.body,
      images: allImages,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : property.amenities,
      featured: req.body.featured === 'true',
      price: parseInt(req.body.price) || property.price,
      bedrooms: parseInt(req.body.bedrooms) || property.bedrooms,
      bathrooms: parseInt(req.body.bathrooms) || property.bathrooms,
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
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// Create new testimonial
app.post('/api/admin/testimonials', upload.single('profileImage'), async (req, res) => {
  try {
    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;
    
    const testimonialData = {
      ...req.body,
      profileImage: profileImage,
      featured: req.body.featured === 'true',
      rating: parseInt(req.body.rating) || 5
    };
    
    const testimonial = new Testimonial(testimonialData);
    const id = await testimonial.save();
    
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: { ...testimonial, id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    });
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
      ...req.body,
      profileImage: profileImage,
      featured: req.body.featured === 'true',
      rating: parseInt(req.body.rating) || testimonial.rating
    };
    
    Object.assign(testimonial, updatedData);
    await testimonial.save();
    
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating testimonial',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQs',
      error: error.message
    });
  }
});

// Create new FAQ
app.post('/api/admin/faqs', async (req, res) => {
  try {
    const faqData = {
      ...req.body,
      featured: req.body.featured === 'true',
      order: parseInt(req.body.order) || 0
    };
    
    const faq = new FAQ(faqData);
    const id = await faq.save();
    
    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: { ...faq, id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating FAQ',
      error: error.message
    });
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
      ...req.body,
      featured: req.body.featured === 'true',
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
    res.status(500).json({
      success: false,
      message: 'Error updating FAQ',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error deleting FAQ',
      error: error.message
    });
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
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: error.message
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
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Admin credentials: username=admin, password=admin123');
  console.log('Database initialized with sample data');
});