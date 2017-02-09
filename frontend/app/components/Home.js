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
        HomeActions.getStats();
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
            <div className="home padding d-flex justify-content-center flex-column">
                <div className="d-flex justify-content-between align-items-center align-items-xl-stretch flex-column flex-xl-row flex-wrap flex-xl-nowrap">
                    <div className="feature-info">
                        <h4>Music</h4>
                        <p>
                            RED can play music from YouTube, Soundcloud or even from your own hard drive. No more boring silence in the voicechat!
                        </p>
                    </div>
                    <div className="features d-flex align-self-center">
                        <ul className="features-list left d-flex flex-column align-items-end justify-content-between">
                            <li>stream alerts</li>
                            <li className="active">music</li>
                            <li>gifs</li>
                            <li>trivia</li>
                        </ul>
                        <h1 className="d-flex align-self-center">
                            RED
                        </h1>
                        <ul className="features-list right d-flex flex-column justify-content-between">
                            <li>slots</li>
                            <li>imgur</li>
                            <li className="active">moderation</li>
                            <li>custom commands</li>
                        </ul>
                    </div>
                    <div className="feature-info">
                        <h4>Moderation</h4>
                        <p>
                            RED is equipped with all the tools you need to keep your community at bay: from simple kick/ban to more advanced filters, and a mod-log to see what your mods are up to.
                        </p>
                    </div>
                </div>
                <div className="description">
                    A fully customizable <b>Discord</b> bot
                    <br />
                    Created by <b>Twentysix</b>, made great by many
                </div>
                <a href="https://github.com/Twentysix26/Red-DiscordBot" className="btn-pill bg-red glow-red">
                    <i className="fa fa-github"></i>
                    Get Red
                </a>
            </div>
        );
    }
}

export default Home;
