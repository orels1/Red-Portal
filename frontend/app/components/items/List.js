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

    render() {
        let list = this.props.list.map((item, index) => {
            return (
                <div key={this.props.keyName + index} className="card">
                    <div className="card-block">
                        {(this.props.type === 'cogs' || this.props.type === 'search') &&
                            <Link to={`/cogs/${item.id}/`} activeClassName="active">
                                <h4 className="card-title">{item.id}</h4>
                            </Link>
                        }
                        {this.props.type === 'repos' && <h4 className="card-title">{decodeURIComponent(item.name)}</h4>}
                        <p className="card-text short text-muted">
                            {item.short !== 'null' ?
                                decodeURIComponent(item.short) :
                                decodeURIComponent(item.description).substr(0, 75) + '...'
                            }
                        </p>
                        <p className="card-text"><small className="text-muted">{decodeURIComponent(item.author)}</small></p>
                    </div>
                </div>
            )
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