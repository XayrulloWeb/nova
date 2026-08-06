const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

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
    const applications = await prisma.applications.findMany({ 
      orderBy: { created_at: 'desc' },
      take: 50
    });
    res.json({ data: applications, totalPages: 1 });
  } catch (error) {
    next(error);
  }
});

router.get('/contacts', auth, async (req, res, next) => {
  try {
    const contacts = await prisma.contacts.findMany({ 
      orderBy: { created_at: 'desc' },
      take: 50
    });
    res.json({ data: contacts, totalPages: 1 });
  } catch (error) {
    next(error);
  }
});

// --- Administration Management (Protected) ---
router.post('/administration', auth, upload.single('image'), async (req, res, next) => {
  const { name_uz, name_ru, role_uz, role_ru, desc_uz, desc_ru } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newAdmin = await prisma.administration.create({
      data: {
        name_uz,
        name_ru,
        role_uz,
        role_ru,
        desc_uz,
        desc_ru,
        image_url: imageUrl
      }
    });
    res.json(newAdmin);
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
router.post('/news', auth, upload.single('image'), async (req, res, next) => {
  try {
    const { title_uz, title_ru, content_uz, content_ru } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const news = await prisma.news.create({
      data: { title_uz, title_ru, content_uz, content_ru, image_url }
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
router.post('/teachers', auth, upload.single('image'), async (req, res, next) => {
  const { name_uz, name_ru, subject_uz, subject_ru, title_uz, title_ru, desc_uz, desc_ru, tags_uz, tags_ru } = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newTeacher = await prisma.teachers.create({
      data: {
        name_uz,
        name_ru,
        subject_uz,
        subject_ru,
        title_uz,
        title_ru,
        desc_uz,
        desc_ru,
        tags_uz,
        tags_ru,
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
router.post('/gallery', auth, upload.single('image'), async (req, res, next) => {
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
