import React from 'react';
import CogsListActions from '../actions/CogsListActions';
import CogsListStore from '../stores/CogsListStore';
import {Link} from 'react-router';

import List from './items/List';

class CogsList extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = CogsListStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    qs(key, props) {
        if (!props) {
            return false;
        }
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        let match = props.location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        CogsListStore.listen(this.onChange);
        CogsListActions.getList();

        let search = this.qs('search', this.props);
        if (search && search.length !== 0) {
            CogsListActions.find(search);
        }
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        CogsListStore.unlisten(this.onChange);
        CogsListActions.resetShowCogs();
    }

    componentWillReceiveProps(nextProps) {
        let search = this.qs('search', nextProps);
        if (nextProps.location.search !== this.props.location.search && search && search.length !== 0) {
            CogsListActions.find(search);
        }
        if (!search) {
            CogsListActions.resetSearchResults();
        }
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

                {this.state.searchResults.length !== 0 &&
                    <List title="Search results" keyName="search" list={this.state.searchResults} type="search"/>
                }

                <List title="Cogs" list={this.state.cogs} filers={['approved', 'beta']} keyName="cog" type="cogs" limit={this.state.showCogs} />
                {cogs.length >= this.state.showCogs &&
                <button className="btn btn-default btn-square" onClick={this.handleShowMoreCogs.bind(this)}>
                    Show more...
                </button>
                }

                <List title="Repos" list={this.state.repos} keyName="repo" type="repos" />
            </div>
        )
    }
}

export default CogsList;
