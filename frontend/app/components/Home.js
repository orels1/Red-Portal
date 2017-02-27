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
        let featuresLeft = this.state.featuresLeft.map((item, index) => {
            return (
                <li
                    key={`featureLeft-${index}`}
                    className={this.state.currentFeatureLeft === index && 'active'}
                    onClick={HomeActions.changeCurrentFeatureLeft.bind(null, index)}
                >{item.title}</li>
            );
        });
        let featuresRight = this.state.featuresRight.map((item, index) => {
            return (
                <li
                    key={`featureLeft-${index}`}
                    className={this.state.currentFeatureRight === index && 'active'}
                    onClick={HomeActions.changeCurrentFeatureRight.bind(null, index)}
                >{item.title}</li>
            );
        });
        return (
            <div className="home padding d-flex justify-content-center flex-column">
                <div className="d-flex justify-content-xl-between justify-content-center align-items-xl-center align-items-xl-stretch flex-column flex-xl-row flex-wrap flex-xl-nowrap">
                    <div className="feature-info align-self-center align-self-xl-auto">
                        <h4>{this.state.featuresLeft[this.state.currentFeatureLeft].title}</h4>
                        <p>
                            {this.state.featuresLeft[this.state.currentFeatureLeft].text}
                        </p>
                    </div>
                    <div className="features d-flex flex-xl-row justify-content-between flex-column align-self-center flex-wrap flex-xl-nowrap">
                        <ul className="features-list left d-flex flex-column align-items-xl-end align-items-center justify-content-between">
                            {featuresLeft}
                        </ul>
                        <div className="d-flex justify-content-center" style={{'height': '176px', 'padding': '0 60px'}}>
                            <h1 className="d-flex align-self-center" >
                                RED
                            </h1>
                        </div>
                        <ul className="features-list right d-flex flex-column  align-items-xl-start align-items-center justify-content-between">
                            {featuresRight}
                        </ul>
                    </div>
                    <div className="feature-info align-self-center align-self-xl-auto">
                        <h4>{this.state.featuresRight[this.state.currentFeatureRight].title}</h4>
                        <p>
                            {this.state.featuresRight[this.state.currentFeatureRight].text}
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
