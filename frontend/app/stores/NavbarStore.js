import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
    constructor() {
        this.bindActions(NavbarActions);
        this.searchQuery = '';
        this.searchResults = [];
    }

    onUpdateSearchQuery(event) {
        this.searchQuery = event.target.value;
    }

    findSuccess(data) {
        this.searchResults = data.results.list || [];
    }

    findFail(jqXhr) {
        console.error(jqXhr.responseText);
    }
}

export default alt.createStore(NavbarStore);