var hmu = require('hmu-core');
// var minimist = require('minimist');
var plugins = require('../hmu-plugins');

module.exports = function(bot, message) {
  var plugin = message.text.split(' ')[1];
  var args = message.text.split(' ').slice(2);
  var reply = [];

  reply.push('[' + plugin + ']: \n');

  if (!plugins.hasOwnProperty(plugin)) {
    return bot.reply(reply, 'Unknown hmu plugin');
  }

  hmu([
    {
      plugin: plugins[plugin],
      input: args,
      options: {}
    }
  ]).then(function(results) {
    results.forEach(function(result) {
      var status = (result[1] ? 'available' : 'unavailable');
      reply.push(result[0] + ': ' + status + '\n');
    });
    bot.reply(message, reply.join(''));
  });
};
