const Telegraf = require('telegraf')
const Face = require('./utils/face')
const Yes = require('./utils/yes')
const Haha = require('./utils/haha')
const Timing = require('./utils/timing')

Timing.startingGun()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (c) => c.reply('lol'))

/*
bot.on('message', (c) => {
    console.log(c.message)
})
*/

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

console.log(`Bot up in ${Timing.now()}ms`)


// Heroku stopgap. Start last.
Face.start();
