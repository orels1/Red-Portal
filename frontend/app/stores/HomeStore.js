import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    onChangeCurrentFeatureLeft(value) {
        this.currentFeatureLeft = value[0];
    }

    constructor() {
        this.bindActions(HomeActions);
        this.currentFeatureLeft = 1;
        this.currentFeatureRight = 2;

        this.featuresLeft = [
            {
                'title': 'stream alerts',
                'text': 'Ever wanted a bot to tell your followers when you come online? Growing a community for streamers? RED is equipped with a top-notch stream announcer right out of the box!'
            },
            {
                'title': 'music',
                'text': 'RED can play music from YouTube, Soundcloud or even from your own hard drive. No more boring silence in the voicechat!',
            },
            {
                'title': 'gifs',
                'text': 'All the power of gifs is at your fingertips, just use a command and unleash the a wave of pure memes.',
            },
            {
                'title': 'trivia',
                'text': 'Feeling smart? RED boasts an expanding library of challenging trivias for your community to play.'
            }
        ];

        this.featuresRight = [
            {
                'title': 'slots',
                'text': 'For those, who like to gamble - a slot machine! You can earn credits and spend them on slots right inside Discord. What a time to be alive!',
            },
            {
                'title': 'imgur',
                'text': 'Cats, dogs, pandas and all the other wonders of imgur are in the reach of one simple RED command, we\'re not responsible for the results ;)',
            },
            {
                'title': 'moderation',
                'text': 'RED is equipped with all the tools you need to keep your community at bay: from simple kick/ban to more advanced filters, and a mod-log to see what your mods are up to.',
            },
            {
                'title': 'custom commands',
                'text': 'Have some common questions in your community? Want to save a crucial link to use it later? Custom commands allows RED to save snippets of text for the later use.'
            }
        ];
    }

    onChangeCurrentFeatureRight(value) {
        this.currentFeatureRight = value[0];
    }
}

export default alt.createStore(HomeStore);
