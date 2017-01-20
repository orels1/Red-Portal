import React from 'react';
import RepoActions from '../actions/RepoActions';
import RepoStore from '../stores/RepoStore';
import {Link} from 'react-router';

import List from './items/List';

class Repo extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = RepoStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        RepoStore.listen(this.onChange);
        RepoActions.getCogs(this.props.params.repoName);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        RepoStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return(
            <div className="inner-page">
                <List
                    title={`Cogs from ${this.props.params.repoName}`}
                    list={this.state.cogs}
                    keyName="cog"
                    type="cogs"
                    router={this.props.router}
                />
            </div>
        )
    }
}

export default Repo;
