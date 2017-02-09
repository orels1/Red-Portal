/**
 * Created by antonorlov on 30/01/2017.
 */
import React from 'react';
import {Link} from 'react-router';

class Tags extends React.Component {
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
        let tags = this.props.list.map((item, index) => {
            if (this.props.inline) {
                return (
                    <Link key={`tag-${index}`} to={`/cogs/?search=${encodeURIComponent(item)}`} className="suppress-links">
                        {item}
                        {index !== this.props.list.length - 1 && ', '}
                    </Link>
                );
            }

            return (
                <Link key={`tag-${index}`} className="suppress-links" activeClassName="active" to={`/cogs/?search=${encodeURIComponent(item.name)}`}>
                    <div className="tag d-flex justify-content-between">
                        <span>{item.name}</span>
                        <span>{item.count} cogs</span>
                    </div>
                </Link>
            );
        });

        if (this.props.inline) {
            return (
                <div className="repo-info-item d-flex align-self-end">
                    <div className="icon icon-tags"></div>
                    <div className="muted">{tags && tags.join('').length < 30 && tags || tags && tags.slice(0, 3)}</div>
                </div>
            );
        }

        return (
            <div className="stats-block">
                {this.props.title &&
                    <div className="header-2">
                        {this.props.title}
                    </div>
                }
                <div className="top-tags d-flex flex-column justify-content-between">
                    {tags && tags.slice(0, this.props.limit)}
                </div>
            </div>
        );
    }
}

export default Tags;
