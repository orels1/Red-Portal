import alt from '../alt';
import CogsListActions from '../actions/CogsListActions';

import {map, extend} from 'underscore';

class CogsListStore {
    constructor() {
        this.bindActions(CogsListActions);
        // this.bindListeners({
        //     'getRepos': CogsListActions.GET_REPOS,
        // });
        this.repos = [];
        this.cogs = [];
        this.showCogs = 10;
        this.searchResults = [];
        this.tags = [];
    }

    getRepos() {
        this.repos = [];
    }

    onGetReposSuccess(data) {
        this.repos = data.results.list;
    }

    onGetReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onGetCogsSuccess(data) {
        this.cogs = [];
        let approved = [],
            unapproved = [];

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        for (let cog of data.results.list) {
            switch (cog.repo.type) {
                case 'approved':
                    approved.push(cog);
                    break;
                case 'beta':
                    approved.push(cog);
                    break;
                case 'unapproved':
                    unapproved.push(cog);
                    break;
                default:
                    unapproved.push(cog);
            }
        }
        this.cogs = this.cogs.concat(shuffle(approved), shuffle(unapproved));
    }

    onGetCogsFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onShowMoreCogs() {
        this.showCogs += 10;
    }

    onResetShowCogs() {
        this.showCogs = 10;
    }

    onFindSuccess(data) {
        this.searchResults = data.results && data.results.list || [];
    }

    onFindFail(jqXhr) {
        console.error(jqXhr.responseText);
    }

    onResetSearchResults() {
        this.searchResults = [];
    }

    onGetTagsSuccess(data) {
        this.tags = !data.error && data.results && data.results.list;
    }

    onGetTagsFail(jqXhr) {
        console.error(jqXhr);
    }
}

export default alt.createStore(CogsListStore);
