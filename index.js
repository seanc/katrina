'use strict';

let Slack = require('slackbotapi'),
  lib = require('./lib'),
  config = require('./config.js');

let bot = new Slack({
  'token': config.iKey,
  'logging': false,
  'autoReconnect': true
});
lib.setBot(bot);

lib.registerListener('start');
lib.registerListener('command');
lib.registerListener('kbve');

lib.registerCommand('test');
lib.registerCommand('scramble');
lib.registerCommand('lookup');

// bot.on('message', data => {
//   if(typeof data.text === 'undefined') return;
//   if(data.text.charAt(0) !== '!') return;
//   bot.sendMsg(data.channel, 'hi');
// });
