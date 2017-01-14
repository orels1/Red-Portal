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
    }

    getRepos() {
        this.repos = [];
    }

    onGetReposSuccess(data) {
        // shuffling
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

        this.repos = data.results.list;
        this.cogs = [];

        let approved = [],
            beta = [],
            unapproved = [];

        for (let repo of data.results.list) {
            switch (repo.type) {
                case 'approved':
                    approved = approved.concat(repo.cogs);
                    break;
                case 'beta':
                    beta = beta.concat(repo.cogs);
                    break;
                case 'unapproved':
                    unapproved = unapproved.concat(repo.cogs);
                    break;
                default:
                    unapproved = unapproved.concat(repo.cogs);
            }
        }

        this.cogs = this.cogs.concat(shuffle(approved), shuffle(beta), shuffle(unapproved));
    }

    onGetReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onShowMoreCogs() {
        this.showCogs += 10;
    }

    onResetShowCogs() {
        this.showCogs = 10;
    }

    findSuccess(data) {
        this.searchResults = data.results.list || [];
    }

    findFail(jqXhr) {
        console.error(jqXhr.responseText);
    }

    onResetSearchResults() {
        this.searchResults = [];
    }
}

export default alt.createStore(CogsListStore);
