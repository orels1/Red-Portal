/**
 * Created by antonorlov on 02/02/2017.
 */
import alt from '../alt';
import PanelActions from '../actions/PanelActions';
import {findWhere} from 'underscore';
import {decode} from 'jsonwebtoken';


class PanelStore {
    constructor() {
        this.bindActions(PanelActions);
        this.repoUrl = '';
        this.repoType = {'label': 'Unapproved', 'value': 'unapproved'};
        this.repoTypeOptions = [
            {'label': 'Approved', 'value': 'approved'},
            {'label': 'Beta', 'value': 'beta'},
            {'label': 'Unapproved', 'value': 'unapproved'},
        ];
        this.repos = [];
        this.addStatus = null;
        this.token = '';
        this.roles = [];
        this.user = '';
        this.last_updated = new Date();
        this.parse_text = 'Re-parse everything';
    }

    onRepoUrlChange(value) {
        this.repoUrl = value || '';
    }

    onRepoTypeChange(value) {
        this.repoType = value;
    }

    onAddRepoSuccess(data) {
        this.repos.unshift(data.results);
        this.addStatus = {
            'text': 'Repo added!',
            'class': 'text-success',
        };
    }

    onAddRepoFail(jqXhr) {
        this.addStatus = {
            'text': jqXhr.responseJSON.error_details,
            'class': 'text-danger',
        };
    }

    onGetReposSuccess(data) {
        this.repos = data.results.list;
    }

    onGetReposFail(jqXhr) {
        console.error(jqXhr.reponseText);
    }

    onParseRepoSuccess(payload) {
        findWhere(this.repos, {'_id': payload.id}).status = {
            'state': true,
            'message': 'Parsing started',
        };
    }

    onParseRepoFail(jqXhr) {
        conrole.error(jqXhr.responseText);
    }

    onParseCogsSuccess(payload) {
        findWhere(this.repos, {'_id': payload.id}).status = {
            'state': true,
            'message': 'Parsing started',
        };
    }

    onParseCogsFail(jqXhr) {
        console.error(jqXhr.responseText);
    }

    onMoveRepoSuccess(payload) {
        findWhere(this.repos, {'_id': payload.id}).status = {
            'state': true,
            'message': 'Repo updated',
        };
        findWhere(this.repos, {'_id': payload.id}).type = payload.data.results.type;
    }

    onMoveRepoFail(jqXhr) {
        console.error(jqXhr.responseText);
    }

    onLoadToken(token) {
        let decoded = decode(token);
        this.token = token;
        this.roles = decoded.roles;
        this.user = decoded.user;
    }

    onGetLastUpdateSuccess(data) {
        this.last_updated = data.results.value;
    }

    onGetLastUpdateFail(jqXhr) {
        console.error(jqXhr.responseText);
    }

    onParseEverythingSuccess(data) {
        this.parse_text = 'Parsing started';
    }

    onParseEverythingFail(jqXhr) {
        console.error(jqXhr.responseText);
    }
}

export default alt.createStore(PanelStore);
