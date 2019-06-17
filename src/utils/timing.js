module.exports = class Timing {
    static startingGun() {
        Timing.start = performance.now()
    }

    static now() {
        return performance.now() - Timing.start
    }

}