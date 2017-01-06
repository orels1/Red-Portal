import React from 'react';
import CogsListActions from '../actions/CogsListActions';
import CogsListStore from '../stores/CogsListStore';
import {Link} from 'react-router';

// components
import RepoList from './items/ReposList';

class CogsList extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = CogsListStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        CogsListStore.listen(this.onChange);
        CogsListActions.getRepos();
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        CogsListStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    handleShowMoreCogs() {
        CogsListActions.showMoreCogs();
    }

    render() {
        let cogs = Object.keys(this.state.cogs).map((key, index) => {
            return (
                <div key={'cog' + index} className="card">
                    <div className="card-block">
                        <Link to={`/cogs/${key}/`} activeClassName="active">
                            <h4 className="card-title">{key}</h4>
                        </Link>
                        <p className="card-text short text-muted">
                            {this.state.cogs[key].short !== 'undefined' ? decodeURIComponent(this.state.cogs[key].short) : decodeURIComponent(this.state.cogs[key].description).substr(0, 75) + '...'}
                        </p>
                        <p className="card-text"><small className="text-muted">{decodeURIComponent(this.state.cogs[key].author)}</small></p>
                    </div>
                </div>
            )
        });
        return(
            <div>
                <h1 className="section-header" style={{paddingTop: '50px'}}>Disclaimer</h1>
                <p className="cog-info description">
                    These repositories are community made. We have no say over what goes into them. The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
                </p>
                <div className="cogs-list">
                    <h1 className="section-header">Cogs</h1>
                    <div className="card-columns">
                        {cogs.slice(0, this.state.showCogs)}
                    </div>
                    {cogs.length >= this.state.showCogs &&
                        <button className="btn btn-default btn-square" onClick={this.handleShowMoreCogs.bind(this)}>
                            Show more...
                        </button>
                    }
                </div>
                <RepoList repos={this.state.repos} />
            </div>
        )
    }
}

export default CogsList;
