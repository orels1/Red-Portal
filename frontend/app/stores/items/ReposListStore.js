import alt from '../../alt';
import ReposListActions from '../../actions/items/ReposListActions';

class ReposListStore {
    constructor() {
        this.bindActions(ReposListActions);
        // this.bindListeners({
        //     'getRepos': CogsListActions.GET_REPOS,
        // });
    }
}

export default alt.createStore(ReposListStore);
