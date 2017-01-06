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
        this.cogs = {};
        this.showCogs = 10;
    }

    getRepos() {
        this.repos = [];
    }

    onGetReposSuccess(data) {
        this.repos = data.results.list;
        let cogsList = map(data.results.list, (repo, key) => {
            return repo.cogs;
        });
        for (let cog of cogsList) {
            extend(this.cogs, cog);
        }

    }

    onGetReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onShowMoreCogs() {
        this.showCogs += 10;
    }
}

export default alt.createStore(CogsListStore);
