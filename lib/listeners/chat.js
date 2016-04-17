var CleverBot = require('cleverbot-node');
var cbot = new CleverBot();

module.exports = function(bot, message) {
  var command = message.text.split(' ')[0];
  if (module.parent.exports.hasOwnProperty(command)) {
    return;
  }
  bot.startTyping(message);
  CleverBot.prepare(function() {
    cbot.write(message.text, function(reply) {
      bot.reply(message, reply.message);
    });
  });
};
