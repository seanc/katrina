module.exports = function(bot, message) {
  var body = message.text.trim().split(' ').slice(1).join(' ');
  var words = body.split(' ').length;
  var letters = body.split('').length;
  var reply = '@sean:\n';

  reply += words + ' words\n';
  reply += letters + ' letters';

  bot.reply(message, reply);
};