/**
 * Created by antonorlov on 05/02/2017.
 */
import alt from '../../alt';
import RelevantActions from '../../actions/items/RelevantActions';

class RelevantStore {
    constructor() {
        this.bindActions(RelevantActions);
        this.cogs = [];
    }

    onGetCogsSuccess(data) {
        this.cogs = data.results.list;
    }

    onGetCogsFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }
}

export default alt.createStore(RelevantStore);
