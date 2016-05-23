var hmu = require('hmu-core');
var parse = require('hmu-runs-parse');
// var minimist = require('minimist');

module.exports = function(bot, message) {
  var body = message.text.split(' ').slice(1);
  var reply = [];

  parse(body)
  .then(function(runs) {
    hmu(runs).then(function(results) {
      results.forEach(function(result) {
        var res = '[' + result[0] + '] ' + result[1] + ': ' + result[2] + '\n';
        reply.push(res);
      });
      bot.reply(message, reply.join(''));
    });
  });
};
