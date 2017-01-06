import React from 'react';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return (
            <div className="home">
                <h1 className="display-1">RED</h1>
                <div className="excerpt col-md-8 offset-md-2">
                    A fully modular <b>Discord</b> bot
                    Created by <b>Twentysix</b>, made great by many
                </div>
                <div className="col-md-4 offset-md-4 download">
                    <a href="https://github.com/Twentysix26" className="btn btn-default btn-square">
                        <i className="fa fa-github" aria-hidden="true"></i>&nbsp;Download now
                    </a>
                </div>
            </div>
        );
    }
}

export default Home;
