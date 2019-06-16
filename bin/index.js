const Telegraf = require('telegraf')
 
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('marco', (ctx) => ctx.reply('Polo.'))

bot.launch();