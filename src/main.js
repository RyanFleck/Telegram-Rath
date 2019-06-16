const Telegraf = require('telegraf')
const Face = require('./utils/face')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (c) => c.reply('lol'))



bot.hears(['hi','hello','Hi','Hello'], (c) => c.reply('Hello there.'))
bot.hears(/([Rr]ath)/gm, (c) => c.reply('Hm?'))
bot.command('marco', (c) => c.reply('Polo.'))

bot.launch();

bot.command('test')

// Heroku stopgap.
Face.start();
