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
            'getReposSuccess',
            'getReposFail',
            'parseRepoSuccess',
            'parseRepoFail,'
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

    getRepos() {
        $.ajax({
            'url': '/api/v1/repos?unparsed=1',
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

    parseRepo(payload) {
        $.ajax({
            'url': payload.url,
            'type': 'PUT',
        })
            .done(() => {
                this.parseRepoSuccess(payload);
            })
            .fail((jqXhr) => {
                this.parseRepoFail(jqXhr);
            })
    }
}

export default alt.createActions(HomeActions);
