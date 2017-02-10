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
                <Link key={`tag-${index}`}className="suppress-links" activeClassName="active" to={`/cogs/?search=${encodeURIComponent(item.name)}`}>
                    <div className="tag d-flex justify-content-between" style={this.props.horizontal && {'minWidth': '200px', 'marginBottom': '20px'}}>
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
                <div
                    className={`top-tags d-flex justify-content-between ${this.props.horizontal && 'flex-row flex-wrap' || 'flex-column'}`}
                    style={this.props.horizontal && {'width': '100%', 'margin': '0', 'height': 'auto'}}
                >
                    {tags && tags.slice(0, this.props.limit - 1)}

                    {!this.props.horizontal &&
                        <Link className="suppress-links" activeClassName="active" to={'/cogs/tags/'}>
                            <div className="tag d-flex justify-content-between">
                                <span>Show all tags</span>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        );
    }
}

export default Tags;
