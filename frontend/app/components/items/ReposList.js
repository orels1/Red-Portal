/**
 * Created by orel- on 05/Jan/17.
 */
import React from 'react';
import ReposListActions from '../../actions/items/ReposListActions';
import ReposListStore from '../../stores/items/ReposListStore';

class ReposList extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = ReposListStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        ReposListStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        ReposListStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        let repos = this.props.repos.map((repo, index) => {
            return (
                <div key={'repo' + index} className="card">
                    <div className="card-block">
                        <h4 className="card-title">{decodeURIComponent(repo.name)}</h4>
                        <p className="card-text short text-muted">
                            {repo.short !== 'undefined' ? decodeURIComponent(repo.short) : decodeURIComponent(repo.description).substr(0, 75) + '...'}
                        </p>
                        <p className="card-text"><small className="text-muted">{decodeURIComponent(repo.author)}</small></p>
                    </div>
                </div>
            )
        });
        return (
            <div className="repos-list">
                <h1 className="section-header">Repos</h1>
                <div className="card-columns">
                    {repos}
                </div>
            </div>
        );
    }
}

export default ReposList;