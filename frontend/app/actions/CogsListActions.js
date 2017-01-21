import alt from '../alt';

class CogsListActions {
    constructor() {
        this.generateActions(
            'getReposSuccess',
            'getReposFail',
            'showMoreCogs',
            'resetShowCogs',
            'findSuccess',
            'findFail',
            'resetSearchResults'
        );
    }

    getList() {
        $.ajax({
            'url': '/api/v1/repo/',
            'type': 'GET',
        })
            .done((data) => {
                this.getReposSuccess(data);
            })
            .fail((jqXhr) => {
                this.getReposFail(jqXhr);
            });
        return false;
    }

    // Search method. Should be pretty straightforward
    find(query) {
        $.ajax({
            'type': 'GET',
            'url': '/api/v1/cogs/search/' + encodeURIComponent(query),
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

export default alt.createActions(CogsListActions);
