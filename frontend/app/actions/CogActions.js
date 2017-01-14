import alt from '../alt';

class CogActions {
    constructor() {
        this.generateActions(
            'getCogSuccess',
            'getCogFail',
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
}

export default alt.createActions(CogActions);
