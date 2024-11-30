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
      const userHasSubscribedBefore = (await selectUser(userId).length) > 0; // check if a user who clicked the link had been subscribed before.
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
  await bot.sendMessage(channelId, Lot.text, options);
});

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const name = msg.chat.first_name;
//   const userId = msg.from.id;
//   const userStatus = (await bot.getChatMember(channelId, msg.from.id)).status;
//   const referralLink = `https://t.me/anykka_test_bot?start=${userId}`;
//   const argument = match[1].trim();
//   const participatorId = Number(argument);
//   const userResponse = msg.text;
//   if (userResponse === "support") {
//     bot.sendMessage(userId, "You supported your friend");
//   }
// });

// bot.onText(/\/start(.*)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const name = msg.chat.first_name;
//   const userId = msg.from.id;
//   const userStatus = (await bot.getChatMember(channelId, msg.from.id)).status;
//   const referralLink = `https://t.me/anykka_test_bot?start=${userId}`;
//   const argument = match[1].trim();
//   const participatorId = Number(argument);

//   if (argument === "participator") {
//     bot.sendMessage(
//       chatId,
//       `Hello ${name} if you want to participate in this giveaway ask one friend to join our channel https://t.me/test_anykka_electronics and your friend should click to this link ${referralLink} !'`
//     );
//   } else if (participatorId) {
//     if (
//       // don't forget to delete admin and creator
//       userStatus === "administrator" ||
//       userStatus === "creator" ||
//       userStatus === "member"
//     ) {
//       // check if a supporter is new. or he has already been in my group
//       const user = await selectUser(userId); // check if a user who clicked the link had been subscribed before.
//       if (user.length > 0) {
//         bot.sendMessage(
//           userId,
//           "Sorry you cant support your fried because you are or you were subscribed"
//         );
//         bot.sendMessage(
//           participatorId,
//           `Sorry your friend ${name} can't support you he has supported someone else`
//         );
//       } else {
//         await insertUser(name, userId);// add the participator to the users list
//         bot.sendMessage(userId, "You supported your fried successfully");
//         bot.sendMessage(
//           participatorId,
//           `Your friend ${name} supported you successfully!`
//         );
//       }
//     } else {
//       bot.sendMessage(
//         userId,
//         "Bro you haven't subscribed please subscribe https://t.me/test_anykka_electronics and come again! "
//       );
//     }
//   } else {
//     bot.sendMessage(chatId, "Hello do you want to participate? ");
//   }
// });

// bot.onText(/\participate/, async (msg) => {
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "button",
//             url: "https://t.me/anykka_test_bot?start=participator",
//           },
//         ],
//       ],
//     },
//   };
//   await bot.sendMessage(channelId, "Hello", options);
// });
