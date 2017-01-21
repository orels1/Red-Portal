import React from 'react';
import CogActions from '../actions/CogActions';
import CogStore from '../stores/CogStore';
import DocumentMeta from 'react-document-meta';
import {Link} from 'react-router';

class Cog extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = CogStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        CogStore.listen(this.onChange);
        CogActions.getCog({
            'repoName': this.props.params.repoName,
            'cogName': this.props.params.cogName
        });
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        CogStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    handleVote() {
        if (this.state.cog.voted) {
            CogActions.voteCog({
                'repoName': this.props.params.repoName,
                'cogName': this.props.params.cogName,
                'choice': 0
            });
        } else {
            CogActions.voteCog({
                'repoName': this.props.params.repoName,
                'cogName': this.props.params.cogName,
                'choice': 1
            });
        }
    }

    render() {
        return(
            <div className="cog inner-page">
                <DocumentMeta
                    title={`Cogs.Red | Cog: ${this.props.params.cogName}`}
                    meta={{
                    'property': {
                        'og:title': `Cog: ${this.props.params.cogName}`,
                        'twitter:title': `Cog: ${this.props.params.cogName}`,
                    }
                }} />
                <h1 className="display-3">
                    {this.state.cog.name ||
                        <span>
                            <i className="fa fa-cog fa-spin" aria-hidden="true"></i>&nbsp;
                            Loading
                        </span>
                    }
                </h1>
                {this.state.cog.repo && this.state.cog.repo.type === 'approved' &&
                    <p className="cog-info">
                        <span className="text-success">{this.state.cog.repo.type}</span>
                    </p>
                }
                {this.state.cog.repo && this.state.cog.repo.type === 'beta' &&
                    <p className="cog-info">
                        <span className="text-warning">{this.state.cog.repo.type}</span>
                    </p>
                }
                {this.state.cog.repo && this.state.cog.repo.type === 'unapproved' &&
                    <p className="cog-info">
                        <span className="text-danger">{this.state.cog.repo.type}</span>
                    </p>
                }
                {this.state.cog.votes &&
                    <p className="cog-info vote" onClick={this.handleVote.bind(this)}>
                        <i className={`fa ${this.state.cog.voted && 'fa-star' || 'fa-star-o'}`} aria-hidden="true"></i>
                        &nbsp;
                        {this.state.cog.votes}
                    </p>
                }
                <p className="cog-info">
                    By&nbsp;
                    <a href={this.state.cog.author && this.state.cog.author.url} target="_blank">
                        {this.state.cog.author && this.state.cog.author.name}
                    </a>
                </p>
                <p className="cog-info">
                    Repo&nbsp;
                    <Link to={this.state.cog.links && this.state.cog.links.repo}>
                        {this.state.cog.repo && this.state.cog.repo.name}
                    </Link>
                </p>
                <p className="cog-info">
                    <a href={this.state.cog.links && this.state.cog.links.github.self} target="_blank">
                        source
                    </a>
                </p>
                <div className="clearfix"></div>

                {this.state.cog.repo && this.state.cog.repo.type === 'unapproved' &&
                    <div>
                        <h2 className="display-4">Disclaimer</h2>
                        <p className="cog-info description">
                            This is a cog from an unapproved repo, it was not checked by members of either Red-DiscordBot or Cogs-Support staff and it can contain anything.
                            <br/>
                            <b className="text-danger">USE AT YOUR OWN RISK!</b>
                        </p>
                    </div>
                }

                <h2 className="display-4">Description</h2>
                <p className="cog-info description display-linebreak">
                    {(this.state.cog.description || this.state.cog.short || '')}
                </p>

                <h2 className="display-4">Installation</h2>
                <small>Replace [p] with your bot's prefix and use these commands</small>
                <p className="cog-info description code">
                    [p]cog repo add {`${this.state.cog.repo && this.state.cog.repo.name} ${this.state.cog.links && this.state.cog.links.github.repo}`}
                </p>
                <p className="cog-info description code">
                    [p]cog install {`${this.state.cog.repo && this.state.cog.repo.name} ${this.state.cog.name}`}
                </p>
            </div>
        )
    }
}

export default Cog;
