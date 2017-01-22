import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.cog_count = 0;
        this.repo_count = 0;
    }

    onGetStatsSuccess(data) {
        this.repo_count = data.results && data.results.list.length || 0;

        for (let repo of (data.results && data.results.list || [])) {
            this.cog_count += repo.cogs.length;
        }
    }

    onGetStatsFail(jqXhr) {
        console.error(jqXhr);
    }

}

export default alt.createStore(HomeStore);
