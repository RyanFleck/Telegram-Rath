const Telegraf = require('telegraf')
const Express = require('express')

const PORT = process.env.PORT
Express().get("*", (req,res)=>{
    res.json({message:"Hi, it's Rath."})
}).listen(PORT, ()=>{console.log("Hello Heroku")})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((c) => c.reply("Welcome!"));
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('marco', (ctx) => ctx.reply('Polo.'))

bot.launch();