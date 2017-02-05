/**
 * Created by antonorlov on 05/02/2017.
 */
import alt from '../../alt';

class RelevantActions {
    constructor() {
        this.generateActions(
            'getCogsSuccess',
            'getCogsFail'
        );
    }

    getCogs(tag) {
        $.ajax({
            'url': `/api/v1/search/cogs/${encodeURIComponent(tag)}?limit=3`,
            'type': 'GET',
        })
            .done((data) => {
                this.getCogsSuccess(data);
            })
            .fail((jqXhr) => {
                this.getCogsFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(RelevantActions);
