'use strict';

const Command = require('../lib/command'),
      low = require('lowdb'),
      storage = require('lowdb/file-sync'),
      table = require('text-table');
     
class MStat extends Command {
 
  constructor(bot) {
    super('', 'View message stats', ['mstats']);
    this.bot = bot;
  }
  
  onCommand(channel, message, sender, args) {
    let db = low('../database/db.json', {storage}),
        users = db('users')
          .chain()
          .sortBy('user.count')
          .take(5)
          .value()
          .reverse(),
       talkers = null,
       board = '',
       leaders = [];

    users.forEach((user) => {
      leaders.push([user.user.username, user.user.count + ' messages']);
    });
    
    talkers = table(leaders);
    
    board = "Top 5 Talkers: \n" + talkers;
    
    this.bot.sendMsg(channel, board);
  }
  
}

module.exports = MStat;