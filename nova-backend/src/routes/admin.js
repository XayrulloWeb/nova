const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const sharp = require('sharp');

// Multer storage in memory to allow sharp to process
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB limit
});

// Middleware to process image to WebP
const processImage = async (req, res, next) => {
  if (!req.file) return next();
  
  const filename = Date.now() + '.webp';
  const dir = path.join(__dirname, '../../public/uploads');
  const outputPath = path.join(dir, filename);
  
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    req.file.filename = filename;
    next();
  } catch (error) {
    next(error);
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_nova_key';

// Helper function to delete image from disk
const deleteImage = (imageUrl) => {
  if (imageUrl) {
    // imageUrl is something like '/uploads/filename.jpg'
    // Map to physical path 'public/uploads/filename.jpg'
    const filePath = path.join(__dirname, '../../public', imageUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete image file:', err);
    });
  }
};

// --- Auth ---
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await prisma.admins.findUnique({ where: { username } });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    next(error);
  }
});

// --- Get Applications & Contacts (Protected) ---
router.get('/applications', auth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.applications.findMany({ 
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.applications.count()
    ]);
    res.json({ data, totalPages: Math.ceil(total / limit), page, total });
  } catch (error) {
    next(error);
  }
});

router.get('/contacts', auth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.contacts.findMany({ 
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.contacts.count()
    ]);
    res.json({ data, totalPages: Math.ceil(total / limit), page, total });
  } catch (error) {
    next(error);
  }
});

// --- Administration Management (Protected) ---
router.post('/administration', auth, upload.single('image'), processImage, async (req, res, next) => {
  const { name_uz, name_ru, role_uz, role_ru, desc_uz, desc_ru, experience_years, experience_period, awards_uz, awards_ru } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newAdmin = await prisma.administration.create({
      data: {
        name: { uz: name_uz, ru: name_ru },
        role: { uz: role_uz, ru: role_ru },
        desc: { uz: desc_uz || '', ru: desc_ru || '' },
        experience_years,
        experience_period,
        awards: { uz: awards_uz || '', ru: awards_ru || '' },
        image_url: imageUrl
      }
    });
    res.json(newAdmin);
  } catch (err) {
    next(err);
  }
});

router.put('/administration/:id', auth, upload.single('image'), processImage, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name_uz, name_ru, role_uz, role_ru, desc_uz, desc_ru, experience_years, experience_period, awards_uz, awards_ru } = req.body;
    
    // Find existing to conditionally delete old image if a new one is uploaded
    const existing = await prisma.administration.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    let imageUrl = existing.image_url;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      // deleteImage(existing.image_url); // Optional: delete old image
    }

    const updatedAdmin = await prisma.administration.update({
      where: { id },
      data: {
        name: { uz: name_uz, ru: name_ru },
        role: { uz: role_uz, ru: role_ru },
        desc: { uz: desc_uz || '', ru: desc_ru || '' },
        experience_years: experience_years || null,
        experience_period: experience_period || null,
        awards: { uz: awards_uz || '', ru: awards_ru || '' },
        image_url: imageUrl
      }
    });
    res.json(updatedAdmin);
  } catch (err) {
    next(err);
  }
});

router.delete('/administration/:id', auth, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const admin = await prisma.administration.findUnique({ where: { id } });
    if (admin) {
      deleteImage(admin.image_url);
      await prisma.administration.delete({ where: { id } });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// --- Stats Management (Protected) ---
router.post('/stats', auth, async (req, res, next) => {
  try {
    const { students_count, experience_years, graduates_count } = req.body;
    const stats = await prisma.stats.upsert({
      where: { id: 1 },
      update: { students_count, experience_years, graduates_count, updated_at: new Date() },
      create: { id: 1, students_count, experience_years, graduates_count }
    });
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// --- News Management (Protected) ---
router.post('/news', auth, upload.single('image'), processImage, async (req, res, next) => {
  try {
    const { title_uz, title_ru, content_uz, content_ru } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const news = await prisma.news.create({
      data: { 
        title: { uz: title_uz, ru: title_ru }, 
        content: { uz: content_uz, ru: content_ru }, 
        image_url 
      }
    });
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
});

router.delete('/news/:id', auth, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const news = await prisma.news.findUnique({ where: { id } });
    if (news) {
      deleteImage(news.image_url);
      await prisma.news.delete({ where: { id } });
    }
    res.json({ message: 'News deleted' });
  } catch (error) {
    next(error);
  }
});

// --- Teacher Management (Protected) ---
router.post('/teachers', auth, upload.single('image'), processImage, async (req, res, next) => {
  const { name_uz, name_ru, subject_uz, subject_ru, title_uz, title_ru, desc_uz, desc_ru, tags_uz, tags_ru } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newTeacher = await prisma.teachers.create({
      data: {
        name: { uz: name_uz, ru: name_ru },
        subject: { uz: subject_uz || '', ru: subject_ru || '' },
        title: { uz: title_uz || '', ru: title_ru || '' },
        desc: { uz: desc_uz || '', ru: desc_ru || '' },
        tags: { uz: tags_uz || '', ru: tags_ru || '' },
        image_url: imageUrl
      }
    });
    res.json(newTeacher);
  } catch (err) {
    next(err);
  }
});

router.delete('/teachers/:id', auth, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const teacher = await prisma.teachers.findUnique({ where: { id } });
    if (teacher) {
      deleteImage(teacher.image_url);
      await prisma.teachers.delete({ where: { id } });
    }
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    next(error);
  }
});

// --- Gallery Management (Protected) ---
router.post('/gallery', auth, upload.single('image'), processImage, async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  try {
    const image_url = '/uploads/' + req.file.filename;
    const gallery = await prisma.gallery.create({ data: { image_url } });
    res.status(201).json(gallery);
  } catch (error) {
    next(error);
  }
});

router.delete('/gallery/:id', auth, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const gallery = await prisma.gallery.findUnique({ where: { id } });
    if (gallery) {
      deleteImage(gallery.image_url);
      await prisma.gallery.delete({ where: { id } });
    }
    res.json({ message: 'Gallery image deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
