const Telegraf = require('telegraf')
 
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch();