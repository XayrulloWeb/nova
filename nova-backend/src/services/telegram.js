const TelegramBot = require('node-telegram-bot-api').default || require('node-telegram-bot-api');
const prisma = require('../prisma');

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot = null;

const statusMap = {
  'NEW': '🆕 Новая',
  'CALLED': '📞 Позвонили',
  'THINKING': '🤔 Думают',
  'AGREED': '✅ Согласны',
  'REJECTED': '❌ Отказ'
};

function getStatusKeyboard(appId) {
  return {
    inline_keyboard: [
      [
        { text: '🆕 Новая', callback_data: `status_${appId}_NEW` },
        { text: '📞 Позвонили', callback_data: `status_${appId}_CALLED` }
      ],
      [
        { text: '🤔 Думают', callback_data: `status_${appId}_THINKING` },
        { text: '✅ Согласны', callback_data: `status_${appId}_AGREED` }
      ],
      [
        { text: '❌ Отказ', callback_data: `status_${appId}_REJECTED` }
      ]
    ]
  };
}

if (token && token !== 'YOUR_BOT_TOKEN_HERE') {
  bot = new TelegramBot(token, { polling: true });

  bot.on('callback_query', async (query) => {
    const { data, message, from } = query;
    
    if (data.startsWith('status_')) {
      const parts = data.split('_');
      const appId = parseInt(parts[1]);
      const newStatus = parts[2];

      try {
        // Update database
        await prisma.applications.update({
          where: { id: appId },
          data: { status: newStatus }
        });

        bot.answerCallbackQuery(query.id, { text: `Статус изменен на: ${statusMap[newStatus]}` });

        // Update original message text with the new status
        let newText = message.text;
        const statusLine = `Текущий статус: ${statusMap[newStatus]} (Изменил: ${from.first_name})`;
        
        if (newText.includes('Текущий статус:')) {
          newText = newText.replace(/Текущий статус: .*/, statusLine);
        } else {
          newText += `\n\n${statusLine}`;
        }

        bot.editMessageText(newText, {
          chat_id: message.chat.id,
          message_id: message.message_id,
          reply_markup: getStatusKeyboard(appId)
        });

      } catch (err) {
        console.error(err);
        bot.answerCallbackQuery(query.id, { text: 'Ошибка при обновлении!', show_alert: true });
      }
    }
  });
} else {
  console.warn('Telegram Bot Token is missing. Telegram notifications are disabled. Using console logging.');
}

const sendNotification = async (message, appId = null) => {
  if (!bot || !chatId || chatId === 'YOUR_CHAT_ID_HERE') {
    console.log('\n[MOCK TELEGRAM MESSAGE]');
    console.log(message.replace(/<[^>]+>/g, ''));
    console.log('-----------------------\n');
    return;
  }
  
  try {
    const opts = { parse_mode: 'HTML' };
    if (appId) {
      opts.reply_markup = getStatusKeyboard(appId);
    }
    await bot.sendMessage(chatId, message, opts);
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
};

module.exports = {
  sendNotification,
};
