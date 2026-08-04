const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_nova_key';

// --- Auth ---
router.post('/login', async (req, res) => {
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
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Get Applications & Contacts (Protected) ---
router.get('/applications', auth, async (req, res) => {
  try {
    const applications = await prisma.applications.findMany({ orderBy: { created_at: 'desc' } });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await prisma.contacts.findMany({ orderBy: { created_at: 'desc' } });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Administration Management (Protected) ---
router.post('/administration', auth, upload.single('image'), async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/administration/:id', auth, async (req, res) => {
  try {
    await prisma.administration.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Stats Management (Protected) ---
router.post('/stats', auth, async (req, res) => {
  try {
    const { students_count, experience_years, graduates_count } = req.body;
    const stats = await prisma.stats.upsert({
      where: { id: 1 },
      update: { students_count, experience_years, graduates_count, updated_at: new Date() },
      create: { id: 1, students_count, experience_years, graduates_count }
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- News Management (Protected) ---
router.post('/news', auth, upload.single('image'), async (req, res) => {
  try {
    const { title_uz, title_ru, content_uz, content_ru } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const news = await prisma.news.create({
      data: { title_uz, title_ru, content_uz, content_ru, image_url }
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/news/:id', auth, async (req, res) => {
  try {
    await prisma.news.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Teacher Management (Protected) ---
// POST /api/admin/teachers - add teacher
router.post('/teachers', auth, upload.single('image'), async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/teachers/:id', auth, async (req, res) => {
  try {
    await prisma.teachers.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
