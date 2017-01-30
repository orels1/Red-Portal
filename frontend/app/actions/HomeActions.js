import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getStatsSuccess',
            'getStatsFail',
            'getTagsSuccess',
            'getTagsFail'
        );
    }

    getStats() {
        $.ajax({
            'url': '/api/v1/misc/count',
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

    getTags() {
        $.ajax({
            'url': '/api/v1/misc/tags/top',
            'type': 'GET',
        })
            .done((data) => {
                this.getTagsSuccess(data);
            })
            .fail((jqXhr) => {
                this.getTagsFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(HomeActions);
