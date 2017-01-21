import alt from '../alt';
import CogActions from '../actions/CogActions';

import {map, extend} from 'underscore';

class CogStore {
    constructor() {
        this.bindActions(CogActions);
        // this.bindListeners({
        //     'getRepos': CogActions.GET_REPOS,
        // });
        this.cog = {};
    }

    getCog() {
        this.cog = {};
    }

    onGetCogSuccess(data) {
        this.cog = data.results;

    }

    onGetReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onVoteCogSuccess(data) {
        this.cog.voted = data.results.voted;
        this.cog.votes = data.results.votes;

    }

    onVoteReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }
}

export default alt.createStore(CogStore);
