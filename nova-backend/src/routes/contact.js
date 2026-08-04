const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { sendNotification } = require('../services/telegram');

router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;
  
  // Basic validation
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    const contact = await prisma.contacts.create({
      data: { name, phone, message }
    });

    // Notify Telegram
    const telegramMsg = `
📩 <b>Yangi xabar! (Aloqa shakli)</b>

👤 <b>Ism:</b> ${name}
📞 <b>Telefon:</b> ${phone}
💬 <b>Xabar:</b>
${message}
    `;
    await sendNotification(telegramMsg);
    
    res.status(201).json({ success: true, contactId: contact.id });
  } catch (err) {
    console.error('Contact Error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
