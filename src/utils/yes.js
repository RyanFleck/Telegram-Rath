const yesOptions = ['mhm', 'yep', 'absolutely', 'yes', 'undeniably', 'hahahahaha, yeah', 'totally', 'Is this a rhetorical question?'];

module.exports = class Yes {
    static yes() {
        var opt = Math.floor(Math.random() * (yesOptions.length - 1))
        return yesOptions[opt];
    }
}