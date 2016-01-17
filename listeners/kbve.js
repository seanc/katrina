'use strict';

let lib = require('../lib'),
    SkypeEvent = require('skype-event'),
    skype = new SkypeEvent();

const SLACK_CHANNEL = 'C0JL6HMMZ';
const SKYPE_GROUPID = '19:cbc230b678e04f6d90e543da85df828c@thread.skype';

skype.on('connection', () => console.log('Skype session started'));

module.exports = function(bot) {

  skype.on('message', e => {
    if(e.getSender() === bot.config.skype_username) return;
    if(e.getMessage().isEdited()) return;

    let username = e.getSender(),
      message = e.getMessage().getMessage();

    console.log(e.getGroup().getLongId());

    bot.sendMsg(SLACK_CHANNEL, `[Skype] ${username}: ${message}`);
  });

  bot.on('message', data => {
    if(data.channel !== SLACK_CHANNEL) return;
    if(typeof data.text === 'undefined') return;
    if(bot.getUser(data.user).name === bot.config.botName) return;

    let username = bot.getUser(data.user).name,
      message = data.text;

    skype.skype.sendMessage(SKYPE_GROUPID, `[Slack] ${username}: ${message}`);
  });

  skype.login(bot.config.skype_username, bot.config.skype_password);

  return bot;
};
