import alt from '../alt';

class CogActions {
    constructor() {
        this.generateActions(
            'getCogSuccess',
            'getCogFail',
        );
    }

    getCog(cogName) {
        $.ajax({
            'url': '/api/v1/cog/' + cogName,
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
