const request = require('request');
const xml = require('libxmljs');

const token = process.env.BOT_WOLFRAM_ID;

module.exports = class Wolfram {
    static query(queryString, botCtx) {
        this.queryGeneral(queryString, botCtx, false);
    }

    static queryVerbose(queryString, botCtx) {
        this.queryGeneral(queryString, botCtx, true);
    }

    static queryGeneral(queryString, botCtx, verbose) {
        if (!process.env.BOT_WOLFRAM_ID) { return 'invalid wolfram API key'; }

        const query = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(queryString)}&primary=true&appid=${token}`;
        console.log(`Query: '${queryString}'\nAPI: ${query}`);

        request(
            query,
            (error, response, body) => {
                console.time('wolfram');

                // console.log(body)
                const doc = xml.parseXml(body);
                const root = doc.root();
                console.log('Request recieved.');

                botCtx.reply('Hm...');

                if (root.attr('error').value() === 'true') {
                    botCtx.reply('Uh, not sure about that one.');
                    console.log('Wolfram error.');
                } else if (root.attr('success').value() === 'false') {
                    botCtx.reply('Hm, could you rephrase that?');
                    console.log('Wolfram failure.');
                } else {
                    console.log('Success. Returning data');

                    if (verbose) {
                        let section = 1;
                        root.find('pod').forEach((pod) => {
                            let responseBuilder = '';
                            let photoSent = false;
                            const title = pod.attr('title').value();
                            console.log(`SECTION ${section++}: ${title}`);

                            pod.find('subpod').forEach((subpod) => {
                                console.log(`SUBSC: ${subpod.attr('title').value()}`);
                                console.log(`\t${subpod.get('plaintext').text()}`);
                                console.log(`\t${subpod.get('img').attr('src').value()}`);
                                if (subpod.get('plaintext').text().length > 1) {
                                    if (title.length > 1) {
                                        responseBuilder = responseBuilder.concat(`${section} - ${title}:`);
                                    }
                                    responseBuilder = responseBuilder.concat(`\n${subpod.get('plaintext').text()}`);
                                } else {
                                    // botCtx.replyWithPhoto(subpod.get('img').attr('src').value());
                                    photoSent = true;
                                    botCtx.telegram.sendPhoto({
                                        chat_id: botCtx.chat.id,
                                        photo: subpod.get('img').attr('src').value(),
                                        caption: responseBuilder,
                                    }).catch(console.error);
                                }
                            });

                            if (responseBuilder.length > 1 && !photoSent) {
                                botCtx.reply(responseBuilder);
                            }
                        });
                    } else {
                        root.find('pod').forEach((pod) => {
                            const title = pod.attr('title').value();

                            if (title.toLowerCase().indexOf('result') > -1) {
                                console.log(`SECTION: ${title}`);

                                pod.find('subpod').forEach((subpod) => {
                                    console.log(`SUBSC: ${subpod.attr('title').value()}`);
                                    console.log(`\t${subpod.get('plaintext').text()}`);
                                    console.log(`\t${subpod.get('img').attr('src').value()}`);
                                    botCtx.reply(subpod.get('plaintext').text());
                                });
                            }
                        });
                    }
                }

                console.timeEnd('wolfram');
            },
        );

        return 0;
    }
};
