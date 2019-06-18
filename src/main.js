const Telegraf = require('telegraf')
const Yes = require('./utils/yes')
const Haha = require('./utils/haha')
const Wolfram = require('./utils/wolfram')


const rathxp = /^[Rr]ath (.*)/gm;

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

    Wolfram.query(rathxp.exec(c.message.text)[1], c)
})
bot.command('marco', (c) => c.reply('Polo.'))

bot.launch({
  webhook: {
    domain: 'https://rath.herokuapp.com',
    port: (process.env.PORT || 5000)
  }
})
