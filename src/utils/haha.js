const hahaOptions = ['lmao', 'Phhblt, 🍆!', 'hahahaha', 'lmao', 'roflmao', 'lol', 'oh man that\'s fucking hilarious', '💩💩💩'];

module.exports = class Haha {
    static haha() {
        const opt = Math.floor(Math.random() * hahaOptions.length);
        return hahaOptions[opt];
    }

    static options() {
        return hahaOptions;
    }
};
