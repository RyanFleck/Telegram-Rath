const yesOptions = ['yeah!', 'absolutely', 'yes', 'undeniably', 'hahahahaha, yeah', 'totally', 'Is this a rhetorical question?', 'lololol', 'kek', 'lmao yes, haha', '...yes.'];

module.exports = class Yes {
    static yes() {
        const opt = Math.floor(Math.random() * yesOptions.length);
        return yesOptions[opt];
    }

    static options() {
        return yesOptions;
    }
};
