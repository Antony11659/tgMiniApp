const { selectUser, insertUser } = require("./server/index");
const { Lot } = require("./lib/messages");

const TelegramBot = require("node-telegram-bot-api");

const token = "7608024573:AAHMupDrsYE2TSY0CE1-N0AgAH3goZ_uCSs";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const channelId = -1002356073219;
const myChannel = "https://t.me/test_anykka_electronics";
const myId = 7431775637;
const markId = 7431775638;
const maxId = 7431775639;

bot.onText(/\/start(.*)/, async (msg, match) => {
  const userId = msg.from.id;
  const userName = msg.chat.first_name;
  const chatId = msg.chat.id;
  const userStatus = (await bot.getChatMember(channelId, msg.from.id)).status;
  const invitation = match[1].trim();
  const friendId = Number(invitation);
  const isUserSupporter = friendId;

  if (
    // don't forget to delete admin and creator
    userStatus === "administrator" ||
    userStatus === "creator" ||
    userStatus === "member"
  ) {
    if (invitation === "participator") {
      bot.sendMessage(
        chatId,
        `Send your friend this link https://t.me/anykka_test_bot?start=${userId}`
      );
    } else if (isUserSupporter) {
      const friend = await selectUser(friendId);
      const friendName = friend[0].username;
      const userHasSubscribedBefore = (await selectUser(userId).length) > 0; // check if a user who clicked the link has been subscribed before.
      if (userHasSubscribedBefore) {
        bot.sendMessage(
          chatId,
          `Sorry you cant support your fried ${friendName} because you are or you were subscribed`
        );
      } else {
        bot.sendMessage(
          chatId,
          `You supported your friend ${friendName} successfully`
        );
        // you should push a friend into participators
        // you should push a supporter into users
        bot.sendMessage(friendId, `You was supported by ${userName}`);
      }
    }
  } else {
    bot.sendMessage(chatId, `Subscribe this channel ${myChannel}`);
  }
});

bot.onText(/\/newLot/, async (msg) => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: Lot.participate,
            url: `https://t.me/anykka_test_bot?start=participator`,
          },
        ],
      ],
    },
  };
  // create a new participators table
  await bot.sendMessage(channelId, Lot.text, options);
});
