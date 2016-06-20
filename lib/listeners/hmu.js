var hmu = require('hmu-core');
var parse = require('hmu-runs-parse');
// var minimist = require('minimist');

module.exports = function(bot, message) {
  var body = message.text.split(' ').slice(1);
  var reply = [];

  parse(body)
  .then(function(runs) {
    hmu(runs).then(function(results) {
      var occurrences = {};
      /* eslint-disable block-scoped-var,  */
      for (var i = 0, max = results.length; i < max; i++) {
        var result = results[i][0];
        if (occurrences[result]) {
          occurrences[result].push(results[i].slice(1));
        } else {
          occurrences[result] = [results[i].slice(1)];
        }
      }

      for (var run in occurrences) {
        if (occurrences.hasOwnProperty(run)) {
          var occurrence = occurrences[run];

          var cat = '[' + run + '] \n';

          for (i = 0, max = occurrence.length; i < max; i++) {
            cat += occurrence[i][0] + ': ' + occurrence[i][1] + '\n';
          }

          reply.push(cat += '\n');
        }
      }
      console.log(occurrences);
      bot.reply(message, reply.join(''));
    });
  });
};
