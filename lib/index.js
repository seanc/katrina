#!/usr/bin/env node
var slackbot = require('botkit').slackbot;
var config = require('./config.json');
var listeners = require('./listeners');
var supervisor = slackbot({});
var namespaces = [
  'direct_message',
  'direct_mention',
  'mention'
];

supervisor.spawn(config.bot).startRTM();

supervisor.hears('math', namespaces, listeners.math);
// supervisor.hears('hmu', namespaces, listeners.hmu);
supervisor.hears('count', namespaces, listeners.count);

