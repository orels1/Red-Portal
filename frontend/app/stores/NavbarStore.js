import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
    constructor() {
        this.bindActions(NavbarActions);
        this.searchQuery = '';
        this.searchResults = [];
        this.token = null;
    }

    onUpdateSearchQuery(payload) {
        this.searchQuery = payload.event.target.value;
        payload.router.push('/cogs/?search=' + encodeURIComponent(this.searchQuery));
    }

    onLoadToken(token) {
        this.token = token;
    }
}

export default alt.createStore(NavbarStore);