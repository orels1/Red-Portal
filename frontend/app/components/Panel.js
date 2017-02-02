/**
 * Created by antonorlov on 02/02/2017.
 */
import React from 'react';
import PanelActions from '../actions/PanelActions';
import PanelStore from '../stores/PanelStore';
import Select from 'react-select';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = PanelStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        PanelStore.listen(this.onChange);
        PanelActions.getRepos();
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        PanelStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    handleRepoUrlChange(event) {
        PanelActions.repoUrlChange(event.target.value);
    }

    handleRepoTypeChange(value) {
        PanelActions.repoTypeChange(value);
    }

    hanldeSubmit(event) {
        event.preventDefault();
    }

    handleRepoAdd() {
        PanelActions.addRepo({
            'url': this.state.repoUrl,
            'type': this.state.repoType.value,
        });
    }

    handleRepoParse(item) {
        PanelActions.parseRepo({'url': item.links._update, 'id': item._id});
    }

    render() {
        let reposList = this.state.repos.map((item, index) => {
            return (
                <li key={`repo-${index}`} className="list-group-item flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        {item.name}
                        <div>
                            <span className="admin-links-item" onClick={this.handleRepoParse.bind(null, item)}>
                                parse
                            </span>
                            <span
                                className={`badge badge-pill ${item.parsed && 'badge-success' || 'badge-danger'}`}
                                style={{'marginRight': '15px'}}
                            >{item.parsed && 'parsed' || 'not parsed'}</span>
                            <span className={`badge badge-pill ${item.type === 'approved' && 'badge-success' || item.type === 'beta' && 'badge-warning' || item.type === 'unapproved' && 'badge-danger'}`}>{item.type}</span>
                        </div>
                    </div>
                    <small className="mb-1">
                        By&nbsp;
                        <a href={item.author.url} target="_blank">{item.author.username}</a>
                    </small>
                </li>
            );
        });
        return (
            <div className="panel">
                <section>
                    <h1 className="section-header">Control Panel</h1>
                    <div className="section-inner-wrapper">
                        <h4>Add repo to regitstry</h4>
                        <form
                            onSubmit={this.hanldeSubmit.bind(this)}
                            className="form-inline"
                        >
                            <div
                                className="form-group"
                                style={{
                                    'marginRight': '15px',
                                }}
                            >
                                <input
                                    id="repoUrl"
                                    value={this.state.repoUrl}
                                    onChange={this.handleRepoUrlChange.bind(this)}
                                    className="form-control"
                                    placeholder="Repo URL"
                                    style={{'minWidth': '350px', 'height': '38px'}}
                                    />
                            </div>
                            <div
                                className="form-group"
                                style={{
                                    'marginRight': '15px',
                                }}
                            >
                                <Select
                                    id="repoType"
                                    value={this.state.repoType}
                                    options={this.state.repoTypeOptions}
                                    onChange={this.handleRepoTypeChange.bind(this)}
                                    className="form-control"
                                    placeholder="Repo type"
                                    clearable={false}
                                    style={{'minWidth': '150px'}}
                                />
                            </div>
                            <div
                                className="form-group"
                                style={{
                                    'marginRight': '15px',
                                }}
                            >
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={this.handleRepoAdd.bind(this)}
                                >
                                    Add
                                </button>
                            </div>
                            {this.state.addStatus &&
                                <div className="form-group">
                                    <span className={`status ${this.state.addStatus.class}`}>
                                        {this.state.addStatus.text}
                                    </span>
                                </div>
                            }
                        </form>
                        <h4 style={{'marginTop': '20px'}}>Repos list</h4>
                        <div className="list-group repos-admin-list">
                            {reposList}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Panel;
