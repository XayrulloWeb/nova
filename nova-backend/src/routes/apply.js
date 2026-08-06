const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { sendNotification } = require('../services/telegram');

router.post('/', async (req, res) => {
  const { parentName, parentPhone, childName, childDob, grade } = req.body;
  
  // Basic validation
  if (!parentName || !parentPhone || !childName || !childDob || !grade) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    const application = await prisma.applications.create({
      data: {
        parent_name: parentName,
        parent_phone: parentPhone,
        child_name: childName,
        child_dob: new Date(childDob),
        grade: String(grade)
      }
    });

    const id = application.id;
    
    // Notify Telegram
    const message = `
🔔 <b>Yangi ariza kelib tushdi! (ID: ${id})</b>

👨‍👩‍👧 <b>Ota-ona:</b> ${parentName}
📞 <b>Telefon:</b> ${parentPhone}

🎓 <b>O'quvchi:</b> ${childName}
📅 <b>Tug'ilgan sana:</b> ${childDob}
🏫 <b>Sinf:</b> ${grade}-sinf
    `;
    try {
      await sendNotification(message, id);
    } catch (telegramErr) {
      console.error('Telegram notification failed, but application was saved:', telegramErr);
    }
    
    res.status(201).json({ success: true, applicationId: id });
  } catch (err) {
    console.error('Application Error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
