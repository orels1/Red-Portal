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
            <div className="padding">
                <div className="header-2 dark">About red</div>
                <p>
                    Red is an open source Discord bot powered by <a href="https://github.com/Rapptz/discord.py/" target="_blank"><b>discord.py</b></a>
                    <br/>
                    By default it includes fun general commands, audio playback, moderation features, trivia, slot machines and much more!
                    <br/>
                    Being fully modular, it also allows for the installation of <a href="https://twentysix26.github.io/Red-Docs/red_cog_approved_repos/" target="_blank"><b>3rd party plugins</b></a>, called cogs, made by our active community, most of which are listed <Link to="/cogs/"><b>here</b></Link>
                </p>
                <div className="header-2 dark">About cogs</div>
                <p>
                    Cogs are what makes Red unique among other bots: they provide an almost endless amount of additional functionalitie
                    <br/>
                    If you think of something you want Red to do there is probably a cog for it. Or at least one is in the making :)
                    <br/>
                    This website was made to help users find new and interesting cogs for their own instance of Red
                </p>
                <div className="header-2 dark">Repositories</div>
                <p>
                    Repositories are split into 3 main categories:
                    <br/>
                    <div className="d-flex">
                        <div className="type-badge badge-approved align-self-center">approved</div>
                        &nbsp; Repositories that have been screened and approved by staff. High quality and support can be expected
                    </div>
                    <div className="d-flex">
                        <div className="type-badge badge-beta align-self-center">beta</div>
                        &nbsp; Repositories that went through the approval process and contain cogs that are at least expected to be working
                    </div>
                    <div className="d-flex">
                        <div className="type-badge badge-unapproved align-self-center">unapproved</div>
                        &nbsp; Repositories that haven't been screened. Quality / safety not guaranteed.
                    </div>
                    <br/>
                    <div className="info-block red" style={{'marginBottom': '0'}}>Despite the above categories each cog creator is responsible for the content of their own repository.
                        <br/>
                        The staff of Red and its community have no responsibilty for any potential damage caused by third party repositories.
                    </div>
                </p>
            </div>
        );
    }
}

export default About;
