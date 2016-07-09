var vm = require('vm');
var _ = require('lodash');

module.exports = function(bot, message) {
  try {
    var code = '';
    var multiline = false;
    if (message.text.trim().split('\n').length > 1) {
      var unparsed = message.text.trim().split('\n').slice(1).join('');
      code = unparsed.replace(/```/g, '');
      multiline = true;
    } else {
      code = message.text.split(' ').slice(1).join(' ');
    }
    var script = new vm.Script(_.unescape(code.trim()), {
      timeout: 10000
    });
    var inject = {
      _: _,
      crypto: require('crypto'),
      events: require('events'),
      querystring: require('querystring'),
      url: require('url'),
      Buffer: Buffer,
      util: require('util'),
      assert: require('assert'),
      zlib: require('zlib'),
      Promise: require('bluebird'),
      JSON: JSON,
      punycode: require('punycode'),
      path: require('path'),
      stream: require('stream'),
      timers: require('timers'),
      pixie: require('pixie'),
      kewler: require('kewler'),
      cheerio: require('cheerio'),
      through2: require('through2'),
      diagnose: require('diagnose'),
      osia: require('osia'),
      sate: require('sate'),
      microtime: require('microtime'),
      semver: require('semver'),
      log: function(msg, pretty) {
        if (pretty) {
          msg = '```' + msg + '```';
        }
        return bot.reply(message, require('util').format(msg));
      }
    };
    /* eslint-disable new-cap */
    var context = new vm.createContext(inject);
    var evaluated = script.runInContext(context, {
      timeout: 2000
    });
    /* eslint-enable new-cap */
    if (!multiline) {
      inject.log(String(evaluated), true);
    }
  } catch (e) {
    console.log(e);
    bot.reply(message, '```' + e.message + '```');
  }
};
