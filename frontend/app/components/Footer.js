/**
 * Created by orel- on 20/Jan/17.
 */
import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return(
            <div className="footer">
                <a className="footer-text" href="https://patreon.com/orels1" target="_blank">
                    cogs.red made with ❤️️ by orels1
                </a>
            </div>
        );
    }
}

export default Footer;
