import React from 'react';
import CogActions from '../actions/CogActions';
import CogStore from '../stores/CogStore';

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
        CogActions.getCog(this.props.params.cogName);
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
                <h1 className="display-3">{this.state.cog.id}</h1>
                <p className="cog-info">
                    By&nbsp;
                    <a href={this.state.cog.repoUrl && this.state.cog.repoUrl.substr(0, this.state.cog.repoUrl.lastIndexOf('/'))} target="_blank">
                        {decodeURIComponent(this.state.cog.author)}
                    </a>
                </p>
                <p className="cog-info">
                    Repo&nbsp;
                    <a href={this.state.cog.repoUrl} target="_blank">
                        {this.state.cog.repoUrl && this.state.cog.repoUrl.substr(this.state.cog.repoUrl.lastIndexOf('/') + 1)}
                    </a>
                </p>
                <div className="clearfix"></div>

                <h2 className="display-4">Description</h2>
                <p className="cog-info description" dangerouslySetInnerHTML={{__html: decodeURIComponent(this.state.cog.description || this.state.cog.short).replace(/(?:\r\n|\r|\n)/g, '<br />')}}>
                </p>

                <h2 className="display-4">Installation</h2>
                <small>Replace [p] with your bot's prefix and use these commands</small>
                <p className="cog-info description code">
                    [p]cog repo add {decodeURIComponent(this.state.cog.author)} {this.state.cog.repoUrl}
                </p>
                <p className="cog-info description code">
                    [p]cog install {decodeURIComponent(this.state.cog.author)} {this.props.params.cogName}
                </p>
            </div>
        )
    }
}

export default Cog;
