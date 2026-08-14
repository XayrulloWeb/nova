const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.stats.findUnique({ where: { id: 1 } });
    if (!stats) {
      return res.json({ students_count: '100%', experience_years: '3+', graduates_count: '24/7' });
    }
    res.json(stats);
  } catch (error) { // eslint-disable-line no-unused-vars
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
  } catch (error) { // eslint-disable-line no-unused-vars
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await prisma.news.findUnique({
      where: { id: parseInt(id) }
    });
    if (!newsItem) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) { // eslint-disable-line no-unused-vars
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
  } catch (error) { // eslint-disable-line no-unused-vars
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

router.get('/administration/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const adminProfile = await prisma.administration.findUnique({
      where: { id: parseInt(id) }
    });
    if (!adminProfile) {
      return res.status(404).json({ error: 'Administration member not found' });
    }
    res.json(adminProfile);
  } catch (error) { // eslint-disable-line no-unused-vars
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/gallery', async (req, res) => {
  try {
    const images = await prisma.gallery.findMany({ orderBy: { created_at: 'desc' } });
    res.json(images);
  } catch (error) { // eslint-disable-line no-unused-vars
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
