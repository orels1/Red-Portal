import React from 'react';
import RepoActions from '../actions/RepoActions';
import RepoStore from '../stores/RepoStore';
import {Link} from 'react-router';

import List from './items/List';
import Tags from './items/Tags';

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
        RepoActions.getCogs({
            'author': this.props.params.author,
            'repoName': this.props.params.repoName,
        });
        RepoActions.getRepo({
            'author': this.props.params.author,
            'repoName': this.props.params.repoName,
        });
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
        return (
            <div className="repo">
                <div className="info-header padding d-flex">
                    <div className="header-1">
                        {this.props.params.repoName}
                    </div>
                    <div className="header-4 align-self-end">
                        By&nbsp;
                        <a href={this.state.repo.author && this.state.repo.author.url || '#'} className="suppress-links">
                            <b>{this.props.params.author}</b>
                        </a>
                    </div>
                    <div className="repo-info-item d-flex align-self-end">
                        <div className="icon icon-stars"></div>
                        <div className="muted">0</div>
                    </div>
                    <div className={`align-self-end type-badge badge-${this.state.repo.type}`}>
                        {this.state.repo.type}
                    </div>
                    {this.state.repo.tags && <Tags list={this.state.repo.tags} inline={true} />}
                </div>
                <div className="padding">
                    <List
                        list={this.state.cogs}
                        keyName="cog"
                        type="cogs"
                        router={this.props.router}
                        notypes={true}
                    />
                </div>
            </div>
        );
    }
}

export default Repo;
