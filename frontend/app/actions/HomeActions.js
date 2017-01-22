import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getStatsSuccess',
            'getStatsFail'
        );
    }

    getStats() {
        $.ajax({
            'url': '/api/v1/repo/',
            'type': 'GET',
        })
            .done((data) => {
                this.getStatsSuccess(data);
            })
            .fail((jqXhr) => {
                this.getStatsFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(HomeActions);
