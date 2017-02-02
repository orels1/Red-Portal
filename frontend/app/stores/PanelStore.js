/**
 * Created by antonorlov on 02/02/2017.
 */
import alt from '../alt';
import PanelActions from '../actions/PanelActions';
import {findWhere} from 'underscore';

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
        findWhere(this.repos, {'_id': payload.id}).parsed = true;
    }

    onParseRepoFail(jqXhr) {
        conrole.error(jqXhr.responseText);
    }
}

export default alt.createStore(PanelStore);
