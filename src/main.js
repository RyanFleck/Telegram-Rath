const Telegraf = require('telegraf')
const Yes = require('./utils/yes')
const Haha = require('./utils/haha')
const Haha = require('./utils/wolfram')


console.time("start")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (c) => c.reply(Haha.haha()))

bot.hears(['hi', 'hello', 'Hi', 'Hello'], (c) => c.reply(`Hello there, ${c.from.first_name}.`))
bot.hears(/^.+([Rr]ath)/gm, (c) => {
    if( c.message.text.slice(-1) === '?' ){
        c.reply(Yes.yes())
    }else{
        c.reply(Haha.haha())
    }
    
})
bot.hears(/^([Rr]ath)/gm, (c) => {
    c.reply(`Alright, I\'ll take a look, ${c.from.first_name}. One sec.`)

})
bot.command('marco', (c) => c.reply('Polo.'))

bot.launch();
bot.startWebhook('/secret-path', null, (process.env.PORT || 5000))
