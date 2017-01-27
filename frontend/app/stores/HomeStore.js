import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.cog_count = 0;
        this.repo_count = 0;
    }

    onGetStatsSuccess(data) {
        this.cog_count = !data.error && data.results && data.results.count.cogs;
        this.repo_count = !data.error && data.results && data.results.count.repos;
    }

    onGetStatsFail(jqXhr) {
        console.error(jqXhr);
    }

}

export default alt.createStore(HomeStore);
