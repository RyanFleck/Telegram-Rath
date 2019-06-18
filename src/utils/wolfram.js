const request = require('request')
const xml = require('libxmljs')

const token = process.env.BOT_WOLFRAM_ID

module.exports = class Wolfram {

    static query(queryString, botCtx) {
        if (!process.env.BOT_WOLFRAM_ID)
            return "invalid wolfram API key"

        const query = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(queryString)}&primary=true&appid=${token}`
        console.log(`Query: '${queryString}'\nAPI: ${query}`)

        request(
            query,
            (error, response, body) => {
                console.log(body)
                const doc = xml.parseXml(body)
                const root = doc.root()

                if (root.attr('error').value() == 'true') {
                    botCtx.reply('Uh, not sure about that one.')
                } else if (root.attr('success').value() == 'false') {
                    botCtx.reply('Hm, could you rephrase that?')
                } else {
                    /*
                    const pods = root.find('pod').map((pod) => {
                        console.log(pod.attr('title').value())
                        const subpods = pod.find('subpod').map((subpod) => {
                            console.log(subpod.attr('title').value())
                            console.log(subpod.get('plaintext').text())
                            console.log(subpod.get('img').attr('src').value())

                        })
                    })*/
                    const pods = root.find('pod')
                    if (pods[1]) {
                        pods[1].find('subpod').map((subpod) => {
                            botCtx.reply(subpod.get('plaintext').text())
                            botCtx.reply("Multiple can be sent.")
                        })
                    }
                }

            }
        )
    }
}