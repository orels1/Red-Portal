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

    handleCogClick(item, router) {
        router.push(item.links.self);
    }

    render() {
        let list = this.props.list.map((item, index) => {
            if ((this.props.filters && (this.props.filters.indexOf(item.type || item.repo.type) !== -1)) || (!this.props.filters && true)) {
                return (
                    <div
                        key={this.props.keyName + index}
                        className="card"
                        onClick={this.handleCogClick.bind(null, item, this.props.router)}
                    >
                        <div className="card-block">
                            <h4 className="card-title">{item.name}</h4>
                            <p className="card-text short text-muted">
                                {item.short || item.description.substr(0, 70) + '...'}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">{item.author.name}&nbsp;&nbsp;&nbsp;</small>
                                {((item.type && item.type === 'approved') || (item.repo && item.repo.type === 'approved')) &&
                                    <small className="text-success" title="approved"><i className="fa fa-check" aria-hidden="true"></i></small>
                                }
                                {((item.type && item.type === 'beta') || (item.repo && item.repo.type === 'beta')) &&
                                    <small className="text-warning" title="beta">β</small>
                                }
                                {((item.type && item.type === 'unapproved') || (item.repo && item.repo.type === 'unapproved')) &&
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