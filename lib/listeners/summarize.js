var tldr = require('node-summary');
var unfluff = require('unfluff');
var validator = require('is-valid');
var request = require('request');

module.exports = function(bot, message) {
  var url = message.text.split(' ').slice(1)[0].replace(/[<>]/g, '');

  if (!validator.isLink(url)) {
    return bot.reply(message, 'Invalid URL');
  }

  request(url, function(err, res, body) {
    if (err) {
      return bot.reply(message, 'An error occurred');
    }

    var data = unfluff(body);
    tldr.getSortedSentences(data.text, 5, function(err, summary) {
      if (err) {
        return bot.reply(message, 'An error occurred');
      }

      var reply = '[' + data.title + '] \n';
      reply += summary;

      bot.reply(message, reply);
    });
  });
};
