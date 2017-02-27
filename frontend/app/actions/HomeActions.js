import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'changeCurrentFeatureLeft',
            'changeCurrentFeatureRight',
        );
    }
}

export default alt.createActions(HomeActions);
