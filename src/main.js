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
    console.log(c.message)
    if (c.message.text.slice(-1) === '?') {
        c.reply(Yes.yes())
    } else {
        c.reply(Haha.haha())
    }

})
bot.hears(/^([Rr]ath)/gm, (c) => {
    console.log(c.message)
    let msg = c.message.substring(5);
    if (msg != null && msg.length > 1) {
        Wolfram.query(msg, c)
    }else{
        c.reply(Haha.haha()+' write something')
    }
})
bot.command('marco', (c) => c.reply('Polo.'))

bot.launch({
    webhook: {
        domain: 'https://rath.herokuapp.com',
        port: (process.env.PORT || 5000)
    }
})
