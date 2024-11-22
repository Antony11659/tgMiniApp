const { selectUser } = require("./server/index");

const TelegramBot = require("node-telegram-bot-api");

const token = "7608024573:AAHMupDrsYE2TSY0CE1-N0AgAH3goZ_uCSs";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const channelId = -1002356073219;
const myId = 7431775637;

bot.onText(/\/start(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const name = msg.chat.first_name;
  const userId = msg.from.id;
  const userStatus = (await bot.getChatMember(channelId, msg.from.id)).status;
  const referralLink = `https://t.me/anykka_test_bot?start=${userId}`;
  const argument = match[1].trim();
  const participatorId = Number(argument);

  if (argument === "participator") {
    bot.sendMessage(
      chatId,
      `Hello ${name} if you want to participate in this giveaway ask one friend to join our channel https://t.me/test_anykka_electronics and your friend should click to this link ${referralLink} !'`
    );
  } else if (participatorId) {
    if (
      // don't forget to delete admin and creator
      userStatus === "administrator" ||
      userStatus === "creator" ||
      userStatus === "member"
    ) {
      // check if a supporter is new. or he has already been in my group
      const user = await selectUser(userId); // check if a user who clicked the link had been subscribed before.
      if (user.length > 0) {
        bot.sendMessage(
          userId,
          "Sorry you cant support your fried because you are or you were subscribed"
        );
        bot.sendMessage(
          participatorId,
          `Sorry your friend ${name} can't support you he has supported someone else`
        );
      } else {
        bot.sendMessage(userId, "You supported your fried successfully");
        // push the participator to the db
        bot.sendMessage(
          participatorId,
          `Your friend ${name} supported you successfully!`
        );
      }
    } else {
      bot.sendMessage(
        userId,
        "Bro you haven't subscribed please subscribe https://t.me/test_anykka_electronics and come again! "
      );
    }
  } else {
    bot.sendMessage(chatId, "Hello do you want to participate? ");
  }
});

bot.onText(/\participate/, async (msg) => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "button",
            url: "https://t.me/anykka_test_bot?start=participator",
          },
        ],
      ],
    },
  };
  await bot.sendMessage(channelId, "Hello", options);
});
// bot.onText(/\/start(.*)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const name = msg.chat.first_name;
//   const userId = msg.from.id; // Get the first user's ID
//   const referralLink = `https://t.me/anykka_test_bot?start=${userId}`;
//   const argument = match[1].trim();
//   const member = await bot.getChatMember(channelId, msg.from.id);
//   const friend = users.filter((u) => u.id === 7431775637)[0];

//   if (argument === "participate") {
//     bot.sendMessage(
//       chatId,
//       `Hello ${name} if you want to participate in this giveaway ask one friend to join our channel https://t.me/test_anykka_electronics and your friend should click to this link ${referralLink} !'`
//     );
//   }
//   if (argument === userId.toString()) {
//     if (
//       member.status === "member" ||
//       member.status === "administrator" ||
//       member.status === "creator"
//     ) {
//       await bot.sendMessage(argument, `your friend ${name} supported you `);
//       await bot.sendMessage(
//         chatId,
//         `hello bro you supported your friend ${friend.name} successfully! good job`
//       );
//     } else {
//       bot.sendMessage(
//         chatId,
//         `if you want to support ${friend.name} you should subscribe https://t.me/test_anykka_electronics`
//       );
//     }
//   }
// });
