const hahaOptions = ['heh','🍆', 'hahahaha','lmao','roflmao','lol','oh man that\'s fucking hilarious','💩'];

module.exports = class Haha {
    static haha() {
        var opt = Math.floor(Math.random() * (hahaOptions.length - 1))
        return hahaOptions[opt];
    }
}