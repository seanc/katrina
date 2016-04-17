var CleverBot = require('cleverbot-node');
var cbot = new CleverBot();

module.exports = function(bot, message) {
  var query = message.text.split(' ').slice(1).join(' ');
  CleverBot.prepare(function() {
    cbot.write(query, function(reply) {
      bot.replyWithTyping(message, reply.message);
    });
  });
};
