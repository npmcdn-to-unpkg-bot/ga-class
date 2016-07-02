/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */


var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});



// IDEA Bot that watches RSS Feed and posts message plus emoji.
// Bot listens for RSS updates
// Bot Name "NCP hard worker"
// Bot Avatar ":ghost:"
// Replys - Repo Updated :boom:

// Chooses a sucess emjoi :boom: :raised_hands: :thumbsup: :star2: :sunglasses:

var emojiList = [':boom:', ':raised_hands:', ':thumbsup:', ':star2:', ':sunglasses:']

function getRandom() {
  return Math.floor(Math.random() * emojiList.length);
}

// Listens for RSS keyword but in the future will listen for RSS update
// Custom name and avatar for bot

controller.hears('RSS',['mention', 'direct_mention', 'direct_message'],function(bot,message) {
  bot.reply(message,{
    text: 'Deployed to repo ' + emojiList[getRandom()],
    username: "NCP hard worker",
    icon_emoji: ":ghost:",
  });
});


// TODO - Add RSS feed and watch for changes
//
// var rssFeed =''
//     rssJSON = []


// Listen for 'First user' keyword in mention, direct mention or DM and reply with a name from the users list

controller.hears('First user',[ 'mention', 'direct_mention', 'direct_message'],function(bot,message) {

  // Get list of users
  bot.api.users.list({'exclude_archived' : 1}, function (err, response) {
    // Get the first users real name
    var userNames = response.members[0].real_name;
    bot.reply(message,'Hello ' + userNames + '!!');
  });

});


// Listen for 'DM ' keyword in mention, direct mention or DM.
// Get name out of command
// Find name in user list
// DM them

controller.hears('DM ',[ 'mention', 'direct_mention', 'direct_message'],function(bot,message) {
  messageText = message.text;
  userName = messageText.substr(3);
  // Remove slackbot @mention id
  userName = userName.replace(' <@U1HA9RNDS>', '');
  // Get list of users
  bot.api.users.list({'exclude_archived' : 1}, function (err, response) {
    // Get the first users real name
    users = response.members

    for (var i = 0; i < users.length; i++) {
      if (users[i].name == userName) {
        console.log('Found User ' + userName);
        userId = users[i].id
        realName = users[i].real_name
        bot.startPrivateConversation({ user: userId },function(err, dm) {
          dm.say('Private reply for ' + realName + '!');
        })
      }
    }

  });

});
