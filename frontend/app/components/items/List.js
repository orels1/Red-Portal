/**
 * Created by orel- on 05/Jan/17.
 */
import React from 'react';
import {Link} from 'react-router';

class List extends React.Component {
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

    handleCogClick(type, item, router) {
        event.preventDefault();

        if (type === 'cogs' || type === 'search') {
            router.push(`/cogs/cog/${item.repoUrl && item.repoUrl.substr(item.repoUrl.lastIndexOf('/') + 1)}/${item.id}/`);
        } else {
            router.push(`/cogs/repo/${item.url && item.url.substr(item.url.lastIndexOf('/') + 1)}/`);
        }

    }

    render() {
        let list = this.props.list.map((item, index) => {
            if ((this.props.filters && (this.props.filters.indexOf(item.repoType) !== -1)) || (!this.props.filters && true)) {
                return (
                    <div
                        key={this.props.keyName + index}
                        className="card"
                        onClick={this.handleCogClick.bind(null, this.props.type, item, this.props.router)}
                    >
                        <div className="card-block">
                            {(this.props.type === 'cogs' || this.props.type === 'search') &&
                            <Link to={`/cogs/cog/${item.repoUrl && item.repoUrl.substr(item.repoUrl.lastIndexOf('/') + 1)}/${item.id}/`} activeClassName="active">
                                <h4 className="card-title">{item.id}</h4>
                            </Link>
                            }
                            {this.props.type === 'repos' &&
                            <h4 className="card-title">{decodeURIComponent(item.name)}</h4>}
                            <p className="card-text short text-muted">
                                {item.short !== 'null' ?
                                    ((decodeURIComponent(item.short).length > 70 && decodeURIComponent(item.short).substr(0,70) + '...') || decodeURIComponent(item.short))  :
                                    decodeURIComponent(item.description).substr(0, 70) + '...'
                                }
                            </p>
                            <p className="card-text">
                                <small className="text-muted">{decodeURIComponent(item.author)}&nbsp;&nbsp;&nbsp;</small>
                                {((item.type && item.type === 'approved') || (item.repoType === 'approved')) &&
                                    <small className="text-success" title="approved"><i className="fa fa-check" aria-hidden="true"></i></small>
                                }
                                {((item.type && item.type === 'beta') || (item.repoType === 'beta')) &&
                                    <small className="text-warning" title="beta">β</small>
                                }
                                {((item.type && item.type === 'unapproved') || (item.repoType === 'unapproved')) &&
                                    <small className="text-danger" title="unapproved"><i className="fa fa-minus-circle" aria-hidden="true"></i></small>
                                }
                            </p>
                        </div>
                    </div>
                )
            }
        });
        return (
            <div className="repos-list">
                <h1 className="section-header">{this.props.title}</h1>
                <div className="card-columns">
                    {this.props.limit && list.slice(0, this.props.limit) || list}
                </div>
            </div>
        );
    }
}

export default List;