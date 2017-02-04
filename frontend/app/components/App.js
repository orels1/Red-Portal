/**
 * Main container components
 * Defines site-wide elements
 */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="container main">
                    <Navbar router={this.props.router} />
                    <div className="contents">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
