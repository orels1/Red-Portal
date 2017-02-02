/**
 * Created by orel- on 04/Jan/17.
 */
import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
    constructor() {
        this.generateActions(
            'updateSearchQuery',
            'loadToken',
        );
    }
}

export default alt.createActions(NavbarActions);