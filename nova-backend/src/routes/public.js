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
    const newsList = await prisma.news.findMany({ orderBy: { created_at: 'desc' } });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/teachers', async (req, res) => {
  try {
    const teacherList = await prisma.teachers.findMany({ orderBy: { created_at: 'desc' } });
    res.json(teacherList);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/administration', async (req, res) => {
  try {
    const adminList = await prisma.administration.findMany({ orderBy: { id: 'asc' } });
    res.json(adminList);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
