/**
 * Created by orel- on 04/Jan/17.
 */
import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
    constructor() {
        this.generateActions(
            'updateSearchQuery',
            'findSuccess',
            'findFail'
        );
    }

    // Search method. Should be pretty straightforward
    find(query) {
        $.ajax({
            'type': 'GET',
            'url': '/api/v1/cog/search/' + encodeURIComponent(query),
        })
            .done((data) => {
                this.findSuccess(data);
            })
            .fail((jqXhr) => {
                this.findFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(NavbarActions);