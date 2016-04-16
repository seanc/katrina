#!/usr/bin/env node
var slackbot = require('botkit').slackbot;
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var listeners = require('./listeners');
var supervisor = slackbot({});
var namespaces = [
  'direct_message',
  'direct_mention',
  'mention'
];

if (args.h) {
  console.log('Usage: katrina [--debug] --token <token>');
  process.exit(0);
}

if (!args.token) {
  console.log('Please specify slack token');
  process.exit(0);
}

supervisor.spawn({
  token: args.token,
  debug: args.debug || false
}).startRTM();

supervisor.hears('math', namespaces, listeners.math);
// supervisor.hears('hmu', namespaces, listeners.hmu);
supervisor.hears('count', namespaces, listeners.count);

