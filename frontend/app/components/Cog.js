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

    render() {
        return(
            <div className="cog">
                <DocumentMeta
                    title={`Cogs.Red | Cog: ${this.props.params.cogName}`}
                    meta={{
                    'property': {
                        'og:title': `Cog: ${this.props.params.cogName}`,
                        'twitter:title': `Cog: ${this.props.params.cogName}`,
                    }
                }} />
                <h1 className="display-3">
                    {this.state.cog.id ||
                        <span>
                            <i className="fa fa-cog fa-spin" aria-hidden="true"></i>&nbsp;
                            Loading
                        </span>
                    }
                </h1>
                {this.state.cog.repoType === 'approved' &&
                    <p className="cog-info">
                        <span className="text-success">{this.state.cog.repoType}</span>
                    </p>
                }
                {this.state.cog.repoType === 'beta' &&
                    <p className="cog-info">
                        <span className="text-warning">{this.state.cog.repoType}</span>
                    </p>
                }
                {this.state.cog.repoType === 'unapproved' &&
                    <p className="cog-info">
                        <span className="text-danger">{this.state.cog.repoType}</span>
                    </p>
                }
                <p className="cog-info">
                    By&nbsp;
                    <a href={this.state.cog.repoUrl && this.state.cog.repoUrl.substr(0, this.state.cog.repoUrl.lastIndexOf('/'))} target="_blank">
                        {decodeURIComponent(this.state.cog.author)}
                    </a>
                </p>
                <p className="cog-info">
                    Repo&nbsp;
                    <Link to={`/cogs/repo/${this.state.cog.repoUrl && this.state.cog.repoUrl.substr(this.state.cog.repoUrl.lastIndexOf('/') + 1)}/`}>
                        {this.state.cog.repoUrl && this.state.cog.repoUrl.substr(this.state.cog.repoUrl.lastIndexOf('/') + 1)}
                    </Link>
                </p>
                <p className="cog-info">
                    <a href={`${this.state.cog.repoUrl}/blob/master/${this.state.cog.id}/${this.state.cog.id}.py`} target="_blank">
                        source
                    </a>
                </p>
                <div className="clearfix"></div>

                {this.state.cog.repoType === 'unapproved' &&
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
                <p className="cog-info description" dangerouslySetInnerHTML={{__html: decodeURIComponent((this.state.cog.description !== 'null' && this.state.cog.description) || this.state.cog.short).replace(/(?:\r\n|\r|\n)/g, '<br />')}}>
                </p>

                <h2 className="display-4">Installation</h2>
                <small>Replace [p] with your bot's prefix and use these commands</small>
                <p className="cog-info description code">
                    [p]cog repo add {this.state.cog.repoUrl && this.state.cog.repoUrl.substr(this.state.cog.repoUrl.lastIndexOf('/') + 1)} {this.state.cog.repoUrl}
                </p>
                <p className="cog-info description code">
                    [p]cog install {this.state.cog.repoUrl && this.state.cog.repoUrl.substr(this.state.cog.repoUrl.lastIndexOf('/') + 1)} {this.props.params.cogName}
                </p>
            </div>
        )
    }
}

export default Cog;
