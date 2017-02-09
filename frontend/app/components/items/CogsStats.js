/**
 * Created by orel- on 05/Jan/17.
 */
import React from 'react';
import {Link} from 'react-router';
import {shuffle} from 'underscore';

import Tags from './Tags';

class CogsStats extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        let randomRepo = shuffle(this.props.repos).map((item, index) => {
            return (
                <Link key={`random_repo-${index}`} className="suppress-links" to={item.links.self}>
                    <div className="repo-block">
                        <div className="header-3">
                            {item.name}
                        </div>
                        <div className="paragraph-small">
                            {item.short && item.short.length <= 130 && item.short}
                            {item.short && item.short.length > 130 && item.short.substr(0, 130) + '...'}
                            {!item.short && item.description && item.description.length <= 130 && item.description}
                            {!item.short && item.description && item.description.length > 130 && item.description.substr(0, 130) + '...'}
                        </div>
                        <div className="repo-info d-flex flex-column justify-content-between">
                            <div className="repo-info-item d-flex">
                                <div className="icon icon-author"></div>
                                <div className="muted">{item.author.username}</div>
                            </div>
                            <div className="repo-info-item d-flex">
                                <div className="icon icon-stars"></div>
                                <div className="muted">0</div>
                            </div>
                            <div className="repo-info-item d-flex">
                                <div className="icon icon-tags"></div>
                                <div className="muted">{item.tags.length > 0 && item.tags.join(', ') || 'no tags provided'}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });

        return (
            <div className="cogs-stats d-flex justify-content-between align-items-sm-center align-items-md-stretch flex-sm-column flex-md-row flex-wrap">
                <div className="d-flex flex-column justify-content-between">
                    <div className="stats-block">
                        <div className="header-2">
                            Total Cogs
                        </div>
                        <div className="stats-count">
                            {this.props.cogs.length}
                        </div>
                    </div>
                    <div className="stats-block">
                        <div className="header-2">
                            Total Repos
                        </div>
                        <div className="stats-count">
                            {this.props.repos.length}
                        </div>
                    </div>
                </div>
                <div className="stats-block">
                    <div className="header-2">
                        Random repo
                    </div>
                    {randomRepo[0]}
                </div>
                <Tags
                    list={this.props.tags}
                    inline={false}
                    limit={5}
                    title="Top Tags"
                />
            </div>
        );
    }
}

export default CogsStats;
