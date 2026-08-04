const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Mock bot if token is not provided
let bot = null;
if (token && token !== 'YOUR_BOT_TOKEN_HERE') {
  bot = new TelegramBot(token, { polling: false });
} else {
  console.warn('Telegram Bot Token is missing. Telegram notifications are disabled. Using console logging.');
}

const sendNotification = async (message) => {
  if (!bot || !chatId || chatId === 'YOUR_CHAT_ID_HERE') {
    console.log('\n[MOCK TELEGRAM MESSAGE]');
    console.log(message.replace(/<[^>]+>/g, '')); // Strip HTML for console
    console.log('-----------------------\n');
    return;
  }
  
  try {
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
};

module.exports = {
  sendNotification,
};
