import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <div className="about home">
                <h1 className="display-2">About red</h1>
                <div className="excerpt col-md-10 offset-md-1">
                    Red is an open source Discord bot powered by <a href="https://github.com/Rapptz/discord.py/" target="_blank"><b>discord.py</b></a>
                    <br/>
                    <br/>
                    By default it includes fun general commands, audio playback (mp3, YouTube and more!), moderation commands, slot machines and much more!
                    <br/>
                    <br/>
                    Being fully modular, it also allows for the installation of <a href="https://twentysix26.github.io/Red-Docs/red_cog_approved_repos/" target="_blank"><b>3rd party plugins</b></a>, called cogs, made by our active community
                </div>
            </div>
        );
    }
}

export default About;
