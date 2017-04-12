/**
 * Main container components
 * Defines site-wide elements
 */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'searchActive': false,
            'searchLeft': 0,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSearchHide() {
        if (this.state.searchActive) {
            this.setState(Object.assign({}, this.state, {'searchActive': false, 'searchLeft': 0}));
        }
    }

    handleSearchShow() {
        if (!this.state.searchActive){
            let searchLeft = Math.floor(window.innerWidth/2 - 530/2);
            this.setState(Object.assign({}, this.state, {'searchActive': true, 'searchLeft': searchLeft}));
        }
    }

    render() {
        return (
            <div className="app" style={{'flex': 1}}>
                <div className="container main">
                    <Navbar
                        searchActive={this.state.searchActive}
                        searchLeft={this.state.searchLeft}
                        onSearchSelect={this.handleSearchShow.bind(this)}
                        onSearchDeselect={this.handleSearchHide.bind(this)}
                        router={this.props.router}
                    />
                    <div onClick={this.handleSearchHide.bind(this)} className="contents">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
