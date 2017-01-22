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
        return(
            <div className="inner-page">
                <h1 className="section-header" style={{paddingTop: '50px'}}>Add cogs.red to your bot</h1>
                <p className="cog-info description">
                    There is an option to interact with cogs.red without leaving discord!
                    <br />
                    Install <Link to="/cogs/cog/Red-Portal-Cogs/redportal/">redportal cog</Link> to search through all the cogs listed one the website.
                </p>
                <h1 className="section-header" style={{paddingTop: '50px'}}>Disclaimer</h1>
                <p className="cog-info description">
                    These repositories are community made. We have no say over what goes into them. The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
                </p>

                {this.state.searchResults.length !== 0 &&
                    <List
                        title="Search results"
                        keyName="search"
                        list={this.state.searchResults}
                        type="search"
                        router={this.props.router}
                    />
                }

                <List
                    title="Cogs"
                    list={this.state.cogs}
                    filers={['approved', 'beta']}
                    keyName="cog"
                    type="cogs"
                    limit={this.state.showCogs}
                    router={this.props.router}
                />
                {this.state.cogs.length >= this.state.showCogs &&
                <button className="btn btn-default btn-square" onClick={this.handleShowMoreCogs.bind(this)}>
                    Show more...
                </button>
                }

                <List
                    title="Repos"
                    list={this.state.repos}
                    keyName="repo"
                    type="repos"
                    router={this.props.router}
                />
            </div>
        )
    }
}

export default CogsList;
