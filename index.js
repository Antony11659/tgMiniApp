const TelegramBot = require("node-telegram-bot-api");

const token = "7608024573:AAHMupDrsYE2TSY0CE1-N0AgAH3goZ_uCSs";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const name = msg.chat.first_name;
  console.log(msg);

  bot.sendMessage(chatId, `hello ${name} received you message: '${msg.text}'`);
});
