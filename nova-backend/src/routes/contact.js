const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { sendNotification } = require('../services/telegram');
const { io } = require('../index');

router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContact = await prisma.contacts.create({
      data: { name, phone, message }
    });
    
    // Telegram alert
    try {
      const telegramMsg = `📩 <b>Yangi xabar! (Aloqa shakli)</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Telefon:</b> ${phone}\n💬 <b>Xabar:</b>\n${message}`;
      await sendNotification(telegramMsg);
    } catch (telegramErr) {
      console.error('Telegram notification failed:', telegramErr);
    }

    io.emit('new_message', newContact);

    res.status(201).json({ success: true, message: 'Contact saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

module.exports = router;
