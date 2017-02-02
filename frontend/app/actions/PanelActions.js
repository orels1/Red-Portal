/**
 * Created by antonorlov on 02/02/2017.
 */
import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'repoUrlChange',
            'repoTypeChange',
            'addRepoSuccess',
            'addRepoFail',
        );
    }

    addRepo(payload) {
        $.ajax({
            'url': '/api/v1/repos',
            'type': 'POST',
            'headers': {
                'Content-Type': 'application/json',
            },
            'data': JSON.stringify(payload),
        })
            .done((data) => {
                this.addRepoSuccess(data);
            })
            .fail((jqXhr) => {
                console.log(this.addRepoFail);
                this.addRepoFail(jqXhr);
            });
    }
}

export default alt.createActions(HomeActions);
