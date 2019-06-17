const Express = require('express')
const Timing = require('./timing')

module.exports = class Face {
    static start() {
        Face.time = 0
        const PORT = process.env.PORT || 3000
        Express().get("*", (req, res) => {
            res.json({
                message: "Hi, it's Rath.",
                startup_ms: `${Face.time}`
            })
        }).listen(PORT, () => { console.log("Hello Heroku") })

        Face.time = Timing.now()
    }
}
