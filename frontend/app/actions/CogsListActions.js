import alt from '../alt';

class CogsListActions {
    constructor() {
        this.generateActions(
            'getReposSuccess',
            'getReposFail',
            'showMoreCogs'
        );
    }

    getRepos() {
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
}

export default alt.createActions(CogsListActions);
