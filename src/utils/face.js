const Express = require('express')

module.exports = class Face {
    static start() {
        const PORT = process.env.PORT || 3000
        Express().get("*", (req, res) => {
            res.json({
                message: "Hi, it's Rath.",
                startup_ms: `${Face.time}`
            })
        }).listen(PORT, () => { console.log("Hello Heroku") })

        console.timeEnd("start")

    }
}
