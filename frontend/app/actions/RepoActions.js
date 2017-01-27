import alt from '../alt';

class RepoActions {
    constructor() {
        this.generateActions(
            'getCogsSuccess',
            'getCogsFail',
        );
    }

    getCogs(payload) {
        $.ajax({
            'url': `/api/v1/cogs/${payload.author}/${payload.repoName}`,
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
