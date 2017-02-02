/**
 * Created by antonorlov on 02/02/2017.
 */
import alt from '../alt';
import PanelActions from '../actions/PanelActions';

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
}

export default alt.createStore(PanelStore);
