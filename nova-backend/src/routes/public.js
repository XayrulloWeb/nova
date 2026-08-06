const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.stats.findUnique({ where: { id: 1 } });
    if (!stats) {
      return res.json({ students_count: '600+', experience_years: '15+', graduates_count: '12K+' });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/news', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.news.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
      prisma.news.count()
    ]);
    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/teachers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.teachers.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
      prisma.teachers.count()
    ]);
    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/administration', async (req, res) => {
  try {
    const adminList = await prisma.administration.findMany({ orderBy: { id: 'asc' } });
    res.json(adminList);
  } catch (error) {
    console.error("ADMIN ERROR:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/gallery', async (req, res) => {
  try {
    const images = await prisma.gallery.findMany({ orderBy: { created_at: 'desc' } });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
