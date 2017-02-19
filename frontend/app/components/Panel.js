/**
 * Created by antonorlov on 02/02/2017.
 */
import React from 'react';
import PanelActions from '../actions/PanelActions';
import PanelStore from '../stores/PanelStore';
import Select from 'react-select';
import moment from 'moment';

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
        PanelActions.getLastUpdate();

        if (window.localStorage.getItem('token')) {
            PanelActions.loadToken(window.localStorage.getItem('token'));
        }
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

    handleParseCogs(item) {
        PanelActions.parseCogs({'url': `${item.links._cogs}/parse`, 'id': item._id});
    }

    handleMoveRepo(item, type) {
        PanelActions.moveRepo({'url': `/api/v1/repos/${item._id}`, 'type': type, 'id': item._id});
    }

    handleParseEverything() {
        PanelActions.parseEverything();
    }

    render() {
        let reposList = this.state.repos.map((item, index) => {
            return (
                <li key={`repo-${index}`} className="list-group-item flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        {item.name}
                        <div className="d-flex">
                            <span>
                                move to:&nbsp;&nbsp;
                            </span>
                            &nbsp;
                            <button className="btn btn-outline-success btn-sm" onClick={this.handleMoveRepo.bind(null, item, 'approved')}>
                                approved
                            </button>
                            &nbsp;
                            <span className="btn btn-outline-warning btn-sm" onClick={this.handleMoveRepo.bind(null, item, 'beta')}>
                                beta
                            </span>
                            &nbsp;
                            <span className="btn btn-outline-danger btn-sm" onClick={this.handleMoveRepo.bind(null, item, 'unapproved')}>
                                unapproved
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="btn btn-outline-primary btn-sm" onClick={this.handleRepoParse.bind(null, item)}>
                                parse repo
                            </span>
                            &nbsp;
                            <span className="btn btn-outline-primary btn-sm" onClick={this.handleParseCogs.bind(null, item)}>
                                parse cogs
                            </span>
                            &nbsp;
                            <div className={`align-self-center type-badge badge-${item.type}`}>{item.type}</div>
                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between mb-1" style={{'marginTop': '7px'}}>
                        <small>
                            By&nbsp;
                            <a href={item.author.url} target="_blank">{item.author.username}</a>
                        </small>
                        {item.status &&
                            <small>
                                Status:&nbsp;&nbsp;
                                <span
                                    className={`badge badge-pill ${item.status.state && 'badge-success' || 'badge-danger'}`}>
                                    {item.status && item.status.message}
                                </span>
                            </small>
                        }
                    </div>
                </li>
            );
        });
        return (
            <div className="panel">
                <div className="info-header padding d-flex justify-content-between">
                    <div className="mr-auto d-flex">
                        <div className="stats-block small">
                            <div className="header-5">
                                Last updated
                            </div>
                            <div className="stats-count">
                                {moment(this.state.last_updated).fromNow()}
                            </div>
                        </div>
                        <div className="stats-block small">
                            <div className="header-5">
                                Repos
                            </div>
                            <div className="stats-count">
                                {this.state.repos.length}
                            </div>
                        </div>
                        <div className="stats-block">
                            <div className="btn-square" onClick={this.handleParseEverything.bind(null)}>
                                {this.state.parse_text}
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto d-flex">
                        <div className="stats-block small">
                            <div className="header-5">
                                Access level
                            </div>
                            <div className="stats-count">
                                <div className="badge type-badge badge-blue">{this.state.roles[1]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="padding">
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
                    <h4 style={{'marginTop': '20px'}}>Repos list (re-parse both repo and cogs after type change)</h4>
                    <div className="list-group repos-admin-list">
                        {reposList}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Panel;
