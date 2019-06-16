const Telegraf = require('telegraf')
const Face = require('./utils/face')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears(['hi','hello','Hi','Hello'], (ctx) => ctx.reply('Hello there.'))
bot.hears('Rath', (ctx) => ctx.reply('You called?'))
bot.command('marco', (ctx) => ctx.reply('Polo.'))

bot.launch();

// Heroku stopgap.
Face.start();
