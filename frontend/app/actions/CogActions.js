import alt from '../alt';

class CogActions {
    constructor() {
        this.generateActions(
            'getCogSuccess',
            'getCogFail',
            'voteCogSuccess',
            'voteCogFail',
        );
    }

    getCog(payload) {
        $.ajax({
            'url': `/api/v1/cogs/cog/${payload.repoName}/${payload.cogName}`,
            'type': 'GET',
        })
            .done((data) => {
                this.getCogSuccess(data);
            })
            .fail((jqXhr) => {
                this.getCogFail(jqXhr);
            });
        return false;
    }

    voteCog(payload) {
        $.ajax({
            'url': `/api/v1/cogs/cog/${payload.repoName}/${payload.cogName}/vote?choice=${payload.choice}`,
            'type': 'GET',
        })
            .done((data) => {
                this.voteCogSuccess(data);
            })
            .fail((jqXhr) => {
                this.voteCogFail(jqXhr);
            });
        return false;
    };
}

export default alt.createActions(CogActions);
