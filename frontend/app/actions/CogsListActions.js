import alt from '../alt';

class CogsListActions {
    constructor() {
        this.generateActions(
            'getReposSuccess',
            'getReposFail',
            'getCogsSuccess',
            'getCogsFail',
            'showMoreCogs',
            'resetShowCogs',
            'findSuccess',
            'findFail',
            'resetSearchResults',
            'getTagsSuccess',
            'getTagsFail'
        );
    }

    getRepos() {
        $.ajax({
            'url': '/api/v1/repos/',
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

    getCogs() {
        $.ajax({
            'url': '/api/v1/cogs/',
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

    // Search method. Should be pretty straightforward
    find(query) {
        $.ajax({
            'type': 'GET',
            'url': '/api/v1/search/cogs/' + encodeURIComponent(query),
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
