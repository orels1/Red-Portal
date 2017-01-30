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
        let list = this.props.list.map((item, index) => {
            return (
                <div className="cog-info" key={`tag-${index}`}>
                    <Link to={`/cogs/?search=${encodeURIComponent(item.name)}`}>
                        {item.name}
                    </Link>
                </div>
            );
        });
        return (
            <div className="tags">
                {list.slice(0, this.props.limit)}
            </div>
        );
    }
}

export default Tags;
