module.exports = function(bot, message) {
  var body = message.text.trim().split(' ').slice(1).join(' ');
  var words = body.split(' ').length;
  var letters = body.replace(/[^A-Z]/gi, "").length;
  var reply = '';

  reply += words + ' words\n';
  reply += letters + ' letters';

  bot.reply(message, reply);
};
