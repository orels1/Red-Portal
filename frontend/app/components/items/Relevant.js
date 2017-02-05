/**
 * Created by antonorlov on 05/02/2017.
 */
/**
 * Created by orel- on 05/Jan/17.
 */
import React from 'react';
import RelevantActions from '../../actions/items/RelevantActions';
import RelevantStore from '../../stores/items/RelevantStore';
import {Link} from 'react-router';

import List from './List';

class Relevant extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = RelevantStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        RelevantStore.listen(this.onChange);
        RelevantActions.getCogs(this.props.tags && this.props.tags[0]);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tags && nextProps.tags.length > 0 && nextProps.tags !== this.props.tags) {
            setTimeout(() => {
                RelevantActions.getCogs(this.props.tags && this.props.tags[0]);
            }, 150);
        }
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        RelevantStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return (
            <div className="cogs-relevant">
                <div className="header-4 relevant-title">You might also like</div>
                <List
                    list={this.state.cogs}
                    keyName="relevant"
                    type="cogs"
                    limit={3}
                    router={this.props.router}
                />
            </div>
        );
    }
}

export default Relevant;
