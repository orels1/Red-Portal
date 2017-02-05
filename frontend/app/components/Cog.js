import React from 'react';
import CogActions from '../actions/CogActions';
import CogStore from '../stores/CogStore';
import DocumentMeta from 'react-document-meta';
import {Link} from 'react-router';

import Relevant from './items/Relevant';

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
            'author': this.props.params.author,
            'repoName': this.props.params.repoName,
            'cogName': this.props.params.cogName,
        });
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        CogStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params !== this.props.params) {
            CogActions.getCog({
                'author': nextProps.params.author,
                'repoName': nextProps.params.repoName,
                'cogName': nextProps.params.cogName,
            });
        }
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    handleVote() {
        if (this.state.cog.voted) {
            CogActions.voteCog({
                'author': this.props.params.author,
                'repoName': this.props.params.repoName,
                'cogName': this.props.params.cogName,
                'choice': 0,
            });
        } else {
            CogActions.voteCog({
                'author': this.props.params.author,
                'repoName': this.props.params.repoName,
                'cogName': this.props.params.cogName,
                'choice': 1,
            });
        }
    }

    render() {
        let tags = this.state.cog.tags && this.state.cog.tags.map((item, index) => {
            return (
                <Link key={`tag-${index}`} to={`/cogs/?search=${encodeURIComponent(item)}`} className="suppress-links">
                    {item}
                    {index !== this.state.cog.tags.length - 1 && ', '}
                </Link>
            );
        });
        return (
            <div className="cog">
                <DocumentMeta
                    title={`${this.props.params.cogName} by ${this.props.params.author} on Cogs.Red`}
                    meta=
                        {
                            {
                                'title': `${this.props.params.cogName} by ${this.props.params.author} on Cogs.Red`,
                                'property': {
                                    'og:title': `${this.props.params.cogName} by ${this.props.params.author} on Cogs.Red`,
                                    'twitter:title': `${this.props.params.cogName} by ${this.props.params.author} on Cogs.Red`,
                                },
                            }
                        }
                />
                <div className="info-header padding d-flex">
                    <div className="header-1">
                        {this.props.params.cogName}
                    </div>
                    <div className="header-4 align-self-end">
                        From&nbsp;
                        <Link to={this.state.cog.links && this.state.cog.links.repo || '#'} className="suppress-links">
                            <b>{this.props.params.repoName}</b>
                        </Link>
                        &nbsp;by&nbsp;
                        <Link to={this.state.cog.author && this.state.cog.author.url || '#'} className="suppress-links">
                            <b>{this.props.params.author}</b>
                        </Link>
                    </div>
                    <div
                        className="repo-info-item d-flex align-self-end vote"
                        onClick={this.handleVote.bind(this)}
                    >
                        <div className="icon icon-stars"></div>
                        <div className="muted">{this.state.cog.votes}</div>
                    </div>
                    <div className={`align-self-end type-badge badge-${this.state.cog.repo && this.state.cog.repo.type}`}>
                        {this.state.cog.repo && this.state.cog.repo.type}
                    </div>
                    <div className="repo-info-item d-flex align-self-end">
                        <div className="icon icon-tags"></div>
                        <div className="muted">{tags}</div>
                    </div>
                    <div className="ml-auto align-self-end">
                        <a
                            href={this.state.cog.links && this.state.cog.links.github.self || '#'}
                            className="suppress-links"
                            style={{'fontSize': '24px'}}
                        >
                            <i className="fa fa-github white"></i>
                        </a>
                    </div>
                </div>
                <div className="padding">
                    {this.state.cog.repo && this.state.cog.repo.type === 'unapproved' &&
                        <div className="info-block red">
                            This is a cog from an unapproved repo, it was not checked by members of either Red-DiscordBot or
                            Cogs-Support staff and it can contain anything.
                            <br />
                            <b>USE AT YOUR OWN RISK!</b>
                        </div>
                    }
                    <div className="header-4">
                        Description
                    </div>
                    <div className="item-description display-linebreak">
                        {this.state.cog.description || this.state.cog.short}
                    </div>
                    <div className="header-4">
                        Install
                    </div>
                    <small className="text-muted">Replace [p] with your bot's prefix and use these commands</small>
                    <div className="code">
                        {`[p]cog repo add ${this.props.params.repoName} ${this.state.cog.links && this.state.cog.links.github.repo}`}
                    </div>
                    <div className="code">
                        {`[p]cog install ${this.props.params.repoName} ${this.props.params.cogName}`}
                    </div>
                </div>
                {this.state.cog.tags && this.state.cog.tags.length > 0 &&
                    <div style={{'padding': '0 40px 0 40px'}}>
                        <Relevant tags={this.state.cog.tags}/>
                    </div>
                }
            </div>
        );
    }
}

export default Cog;
