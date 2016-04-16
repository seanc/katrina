var math = require('math-expression-evaluator');

module.exports = function(bot, message) {
  var expression = message.text.split(' ').slice(1).join('');
  try {
    var solution = math.eval(expression);
    bot.reply(message, solution);
  } catch (e) {
    bot.reply(message, 'Sorry, I currently don\'t support that expression or it is invalid');
  }
};
