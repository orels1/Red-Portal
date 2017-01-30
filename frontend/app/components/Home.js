import React from 'react';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';

import Tags from './items/Tags';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        HomeStore.listen(this.onChange);
        HomeActions.getStats();
        HomeActions.getTags();
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return (
            <div className="home">
                <h1 className="display-1">RED</h1>
                <div className="excerpt">
                    A fully customizable <b>Discord</b> bot<br/>
                    Created by <b>Twentysix</b>, made great by many
                </div>
                <div className="download">
                    <a href="https://github.com/Twentysix26/Red-DiscordBot" className="btn btn-default btn-square">
                        <i className="fa fa-github" aria-hidden="true"></i>&nbsp;Download now
                    </a>
                </div>
                <div className="stats">
                    <span>{this.state.cog_count}</span> cogs in <span>{this.state.repo_count}</span> repos and counting
                </div>
                <Tags list={this.state.tags} limit={5} />
            </div>
        );
    }
}

export default Home;
