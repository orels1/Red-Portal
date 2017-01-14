import alt from '../alt';

class RepoActions {
    constructor() {
        this.generateActions(
            'getCogsSuccess',
            'getCogsFail',
        );
    }

    getCogs(repoName) {
        $.ajax({
            'url': `/api/v1/cogs/repo/${repoName}`,
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

export default alt.createActions(RepoActions);
