var math = require('mathjs');

module.exports = function(bot, message) {
  var expression = message.text.split(' ').slice(1).join(' ');
  try {
    var solution = math.eval(expression);
    bot.reply(message, String(solution));
  } catch (e) {
    console.log(e);
    bot.reply(message, 'Sorry, I currently don\'t support that expression or it is invalid');
  }
};
