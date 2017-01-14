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
                    By default it includes fun general commands, audio playback, moderation features, trivia, slot machines and much more!
                    <br/>
                    <br/>
                    Being fully modular, it also allows for the installation of <a href="https://twentysix26.github.io/Red-Docs/red_cog_approved_repos/" target="_blank"><b>3rd party plugins</b></a>, called cogs, made by our active community, most of which are listed <Link to="/cogs/"><b>here</b></Link>
                </div>
                <div className="clearfix"></div>
                <h1 className="display-2">About Cogs</h1>
                <div className="excerpt text-justify">
                    Cogs are what makes Red unique among other bots: they provide an almost endless amount of additional functionalities
                    <br/>
                    <br/>
                    If you think of something you want Red to do there is probably a cog for it. Or at least one is in the making :)
                    <br/>
                    <br/>
                    This website was made to help users find new and interesting cogs for their own instance of Red
                </div>
                <div className="clearfix"></div>
                <h1 className="display-2">Repositories</h1>
                <div className="excerpt text-justify">
                    Repositories are split into 3 main categories:
                    <br/>
                    <br/>
                    <small className="text-success" title="approved">
                        <i className="fa fa-check" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        [approved]
                        &nbsp;
                    </small>
                    - Repositories that have been screened and approved by staff. High quality and support can be expected
                    <br/>
                    <br/>
                    <small className="text-warning" title="approved">
                        β
                        &nbsp;&nbsp;
                        [beta]
                        &nbsp;
                    </small>
                    - Repositories that went through the approval process and contain cogs that are at least expected to be working
                    <br/>
                    <br/>
                    <small className="text-danger" title="approved">
                        <i className="fa fa-minus-circle" aria-hidden="true"></i>
                        &nbsp;&nbsp;
                        [unapproved]
                        &nbsp;
                    </small>
                    - Repositories that haven't been screened. Quality / safety not guaranteed.
                    <br/>
                    <br/>
                    <b className="text-danger">Despite the above categories each cog creator is responsible for the content of their own repository.
                        <br/>
                        The staff of Red and its community have no responsibilty for any potential damage caused by third party repositories.
                    </b>
                </div>
            </div>
        );
    }
}

export default About;
