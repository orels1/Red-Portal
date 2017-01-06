/**
 * Main container components
 * Defines site-wide elements
 */
import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div className="container" id="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
