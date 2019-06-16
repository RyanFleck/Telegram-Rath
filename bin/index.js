const Telegraf = require('telegraf')
const Express = require('express')

// Stopgap until I can figure out how to calm down Heroku;
const PORT = process.env.PORT || 3000 
Express().get('/', (req, res) => {
    res.send('Hello World!')
  }).listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('marco', (ctx) => ctx.reply('Polo.'))

bot.launch();