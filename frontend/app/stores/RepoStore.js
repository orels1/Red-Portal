import alt from '../alt';
import RepoActions from '../actions/RepoActions';

import {map, extend} from 'underscore';

class RepoStore {
    constructor() {
        this.bindActions(RepoActions);
        // this.bindListeners({
        //     'getRepos': RepoActions.GET_REPOS,
        // });
        this.cogs = [];
        this.repo = {};
    }

    getRepos() {
        this.repos = [];
    }

    onGetCogsSuccess(data) {
        this.cogs = data.results.list;
    }

    onGetCogsFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onGetRepoSuccess(data) {
        this.repo = data.results;
    }

    onGetRepoFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }
}

export default alt.createStore(RepoStore);
