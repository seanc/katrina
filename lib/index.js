'use strict';

const slackbot = require('botkit').slackbot;
const listeners = require('./listeners');
const config = require('../config.json');

const bot = slackbot({});

bot.spawn(config.bot).startRTM();

let defaultNamespaces = [
  'direct_message',
  'direct_mention',
  'mention'
];

// google
bot.hears('google', defaultNamespaces, listeners.search.command);