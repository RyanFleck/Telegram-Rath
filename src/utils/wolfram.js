const request = require('request')
const xml = require('libxmljs')

const token = process.env.BOT_WOLFRAM_ID

module.exports = class Wolfram {

    static query(queryString, botCtx) {
        if (!process.env.BOT_WOLFRAM_ID)
            return "invalid wolfram API key"

        const query = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(queryString)}&primary=true&appid=${token}`
        console.log(`Query: '${queryString}'\nAPI: ${query}`)
        
        botCtx.reply('Hm...')

        request(
            query,
            (error, response, body) => {
                // console.log(body)
                const doc = xml.parseXml(body)
                const root = doc.root()

                if (root.attr('error').value() == 'true') {
                    botCtx.reply('Uh, not sure about that one.')
                } else if (root.attr('success').value() == 'false') {
                    botCtx.reply('Hm, could you rephrase that?')
                } else {
                    root.find('pod').map((pod) => {
                        let title = pod.attr('title').value();

                        if (title.toLowerCase().indexOf('result') > -1) {

                            console.log('SECTION: ' + title)

                            pod.find('subpod').map((subpod) => {
                                console.log('SUBSC: ' + subpod.attr('title').value())
                                console.log('\t' + subpod.get('plaintext').text())
                                console.log('\t' + subpod.get('img').attr('src').value())
                                botCtx.reply(subpod.get('plaintext').text())

                            })
                        }
                    })
                }
            }
        )
    }
}