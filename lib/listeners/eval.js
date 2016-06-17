var vm = require('vm');
var _ = require('lodash');

module.exports = function(bot, message) {
  try {
    var code = '';
    if (message.text.trim().split('\n').length > 1) {
      var unparsed = message.text.trim().split('\n').slice(1).join('');
      code = unparsed.replace(/```/g, '');
    } else {
      code = message.text.split(' ').slice(1).join(' ');
    }
    var script = new vm.Script(_.unescape(code.trim()));
    var inject = {
      _: _,
      crypto: require('crypto'),
      events: require('events'),
      querystring: require('querystring'),
      url: require('url'),
      Buffer: Buffer
    };
    /* eslint-disable new-cap */
    var context = new vm.createContext(inject);
    var evaluated = script.runInContext(context);
    /* eslint-enable new-cap */
    bot.reply(message, String('```' + evaluated + '```'));
  } catch (e) {
    console.log(e);
    bot.reply(message, '```' + e.message + '```');
  }
};
