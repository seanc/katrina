'use strict';

let cmdLib = require('../lib/command.js'),
    lib = require('../lib');

module.exports = function(bot) {

  bot.on('message', data => {
    if(typeof data.text === 'undefined') return;
    if(typeof data.user === 'undefined') return;
    if(bot.getUser(data.user).name === bot.config.botName) return;
    if(data.text.charAt(0) !== bot.config.cmdPrefix) return;

    let command = data.text.split(' ')[0].replace(data.text.charAt(0), '');
    let args = (function() {
      let args = data.text.split(' ');
      args.splice(0, 1);
      return args;
    }());

    lib.getCommands().forEach((cmd, i) => {
      cmd = new cmd(bot);
      cmd.getNames().forEach((name, i) => {
        if(name === command) {
          cmd.onCommand(data.channel, data.text, bot.getUser(data.user), args);
        }
      });
    });
  });

  return bot;
};
