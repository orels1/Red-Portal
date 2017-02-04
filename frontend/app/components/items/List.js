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
            if (this.props.filters && this.props.filters.indexOf(item.type || item.repo.type) !== -1 || !this.props.filters && true) {
                return (
                    <div
                        key={this.props.keyName + index}
                        className="item"
                    >
                        <Link className="suppress-links" to={item.links.self}>
                            <div className="item-inner d-flex flex-column">
                                <div className="header-4">{item.name}</div>
                                <div className="item-text">
                                    {item.short && item.short.length <= 80 && item.short}
                                    {item.short && item.short.length > 80 && item.short.substr(0, 80) + '...'}
                                    {!item.short && item.description && item.description.length <= 80 && item.description}
                                    {!item.short && item.description && item.description.length > 80 && item.description.substr(0, 80) + '...'}
                                </div>
                                <div className="d-flex">
                                    <div className="item-author">{item.author.username}</div>
                                    {!this.props.notypes &&
                                        <div className={`type-badge badge-${item.type || item.repo.type}`}>
                                            {item.type || item.repo.type}
                                        </div>
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }
        });
        return (
            <div className="list">
                {this.props.title  && <div className="header-2">{this.props.title}</div>}
                <div className="items d-flex justify-content-between flex-wrap">
                    {this.props.limit && list.slice(0, this.props.limit) || list}
                </div>
            </div>
        );
    }
}

export default List;
