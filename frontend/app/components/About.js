import React from 'react'
import {Link} from 'react-router';

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
            <div className="about col-md-10 offset-md-1">
                <h1 className="display-2">About red</h1>
                <div className="excerpt text-justify">
                    Red is an open source Discord bot powered by <a href="https://github.com/Rapptz/discord.py/" target="_blank"><b>discord.py</b></a>
                    <br/>
                    <br/>
                    By default it includes fun general commands, audio playback (mp3, YouTube and more!), moderation commands, slot machines and much more!
                    <br/>
                    <br/>
                    Being fully modular, it also allows for the installation of <a href="https://twentysix26.github.io/Red-Docs/red_cog_approved_repos/" target="_blank"><b>3rd party plugins</b></a>, called cogs, made by our active community, most of which are listed <Link to="/cogs/"><b>here</b></Link>
                </div>
                <div className="clearfix"></div>
                <h1 className="display-2">About Cogs</h1>
                <div className="excerpt text-justify">
                    Cogs are what makes Red unique among other bots, they provide an almost endless amount of addition bot functionality
                    <br/>
                    <br/>
                    Basically if you think of something you want your bot to do - there probably is a cog for that or it's currently being made
                    <br/>
                    <br/>
                    This website was made to help Red users find new and interesting cogs for their bots
                </div>
                <div className="clearfix"></div>
                <h1 className="display-2">Approved, beta & unapproved</h1>
                <div className="excerpt text-justify">
                    All the repos and their cogs are split into 3 main categories:
                    <br/>
                    <br/>
                    <small className="text-success" title="approved">
                        <i className="fa fa-check" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        [approved]
                        &nbsp;
                    </small>
                    - Cogs which were tested, approved by staff of Red-DiscordBot or Cog-Support and defined as high-quality cogs
                    <br/>
                    <br/>
                    <small className="text-warning" title="approved">
                        β
                        &nbsp;&nbsp;
                        [beta]
                        &nbsp;
                    </small>
                    - Cogs which were tested by staff, but are currently in development or have minor issues
                    <br/>
                    <br/>
                    <small className="text-danger" title="approved">
                        <i className="fa fa-minus-circle" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        [unapproved]
                        &nbsp;
                    </small>
                    - Cogs which were not seen and/or tested by staff
                    <br/>
                    <b className="text-danger">USE AT YOUR OWN RISK!</b>
                </div>
            </div>
        );
    }
}

export default About;
