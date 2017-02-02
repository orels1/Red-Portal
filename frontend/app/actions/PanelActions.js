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
            'parseRepoFail',
            'parseCogsSuccess',
            'parseCogsFail',
            'moveRepoSuccess',
            'moveRepoFail',
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
            });
    }

    parseCogs(payload) {
        $.ajax({
            'url': payload.url,
            'type': 'PUT',
        })
            .done(() => {
                this.parseCogsSuccess(payload);
            })
            .fail((jqXhr) => {
                this.parseCogsFail(jqXhr);
            });
    }

    moveRepo(payload) {
        $.ajax({
            'url': payload.url,
            'type': 'PUT',
            'headers': {
                'Content-Type': 'application/json',
            },
            'data': JSON.stringify({'type': payload.type}),
        })
            .done((data) => {
                payload.data = data;
                this.moveRepoSuccess(payload);
            })
            .fail((jqXhr) => {
                this.moveRepoFail(jqXhr);
            });
    }
}

export default alt.createActions(HomeActions);
