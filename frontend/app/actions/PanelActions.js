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
            'loadToken',
            'getLastUpdateSuccess',
            'getLastUpdateFail',
            'parseEverythingSuccess',
            'parseEverythingFail',
            'changeStatus',
            'getCogsSuccess',
            'getCogsFail',
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
        return false;
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
        return false;
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
        return false;
    }

    getLastUpdate() {
        $.ajax({
            'url': '/api/v1/config/last_updated',
            'type': 'GET',
        })
            .done((data) => {
                this.getLastUpdateSuccess(data);
            })
            .fail((jqXhr) => {
                this.getLastUpdateFail(jqXhr);
            });
        return false;
    }

    parseEverything() {
        $.ajax({
            'url': '/api/v1/admin/batch/parse',
            'type': 'PUT',
        })
            .done((data) => {
                this.parseEverythingSuccess(data);
            })
            .fail((jqXhr) => {
                this.parseEverythingFail(jqXhr);
            });
        return false;
    }

    getCogs(payload) {
        $.ajax({
            'url': `/api/v1/cogs/${payload.author.username}/${payload.name}`,
            'type': 'GET',
        })
            .done((data) => {
                payload.data = data;
                this.getCogsSuccess(payload);
            })
            .fail((jqXhr) => {
                this.getCogsFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(HomeActions);
