'use strict';

let lib = require('../lib'),
    low = require('lowdb'),
    storage = require('lowdb/file-sync');
    
const db = low('./database/db.json', {storage}),
      users = db('users');
    
module.exports = (bot) => {
  
  let user;
  
  bot.on('message', data => {
    if(typeof data.text === 'undefined') return;
    if(typeof data.user === 'undefined') return;
    if(bot.getUser(data.user).name === bot.config.botName) return;
    
    user = bot.getUser(data.user).name;

    let exists = users.find({
      user: {
        username: user
      }
    });
    
    if(typeof exists === 'undefined') {
      return users.push({
        user: {
          username: user,
          count: 0
        }
      });
    }
    
    users
    .chain()
    .find({user: {username: user}})
    .assign({
      count: exists.user.count++
    });
  });
  
};