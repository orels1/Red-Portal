/**
 * Created by antonorlov on 02/02/2017.
 */
import React from 'react';
import PanelActions from '../actions/PanelActions';
import PanelStore from '../stores/PanelStore';
import Select from 'react-select';
import moment from 'moment';
import {decode} from 'jsonwebtoken';

import NavbarStore from '../stores/NavbarStore';

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
        if (this.state.repoUrl.length > 20) {
            PanelActions.addRepo({
                'url': this.state.repoUrl,
                'type': this.state.repoType.value,
            });
        } else {
            PanelActions.changeStatus('Invalid URL');
        }
    }

    checkAccess() {
        let token = NavbarStore.state.token && decode(NavbarStore.state.token) ||  null;
        return token && token.roles && (token.roles.includes('admin') || token.roles.includes('staff'));
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

    handleHideRepo(item) {
        PanelActions.hideRepo({'url': `/api/v1/admin/hide/${item.author.usernamme}/${item.name}`, 'id': item._id});
    }

    handleUnHideRepo(item) {
        PanelActions.unHideRepo({'url': `/api/v1/admin/unhide/${item.author.username}/${item.name}`, 'id': item._id});
    }

    handleParseEverything() {
        PanelActions.parseEverything();
    }

    handleRepoClick(item) {
        PanelActions.getCogs(item);
    }

    render() {
        let reposList = this.state.repos.map((item, index) => {
            return (
                <div
                    key={`repo-${index}`}
                    onClick={this.handleRepoClick.bind(null, item)}
                    className={`list-group-item flex-column align-items-start ${this.state.selectedRepo && this.state.selectedRepo._id === item._id && 'active'}`}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <div className="repo-admin-name">{item.name}</div>
                        <div className="repo-admin-author">
                            <small>
                                By&nbsp;
                                <a href={item.author.url} target="_blank">{item.author.username}</a>
                            </small>
                        </div>
                        <div className={`align-self-center ml-auto type-badge badge-${item.type}`}>{item.type}</div>
                        {item.hidden &&
                          <div className={'align-self-center ml-auto type-badge badge-unapproved'}>hidden</div>
                        }
                    </div>
                </div>
            );
        });
        let cogsList = this.state.cogs.map((item, index) => {
            return (
                <div key={`cog-${index}`} className="cogs-list-item">{item.name}</div>
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
                <div className="d-flex" style={{'padding': '40px 40px 0 40px'}}>
                    <form
                        onSubmit={this.hanldeSubmit.bind(this)}
                        className="form-black d-flex"
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
                                placeholder="Repo GitHub URL"
                            />
                        </div>
                        <div
                            className="form-group select-helper"
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
                                className="btn btn-black-form"
                                onClick={this.handleRepoAdd.bind(this)}
                            >
                                Add
                            </button>
                        </div>
                        {this.state.addStatus &&
                        <div className="form-group">
                            <div className={`status ${this.state.addStatus.class}`}>
                                {this.state.addStatus.text}
                            </div>
                        </div>
                        }
                    </form>
                </div>
                <div className="padding d-flex flex-wrap flex-xl-nowrap justify-content-between">
                    <div className="d-flex flex-column" style={{'flexGrow': '1', 'marginRight': '40px', 'maxWidth': '550px', 'paddingBottom': '40px'}}>
                        <div className="list-group repos-admin-list">
                            {reposList}
                        </div>
                    </div>
                    <div className="d-flex repo-block" style={{'maxWidth': '420px'}}>
                        {this.state.selectedRepo &&
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <div className="header-4">{this.state.selectedRepo.name}</div>
                                    <div className={`align-self-center ml-auto type-badge badge-${this.state.selectedRepo.type}`}>{this.state.selectedRepo.type}</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div><b>Cogs: </b>{this.state.cogs.length}</div>
                                    {this.state.selectedRepo.tags &&
                                     this.state.selectedRepo.tags.length > 0 &&
                                        <div><b>Tags: </b>{this.state.selectedRepo.tags.join(',')}</div>
                                    }
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="header-5">Description</div>
                                    <div>{this.state.selectedRepo.description || this.state.selectedRepo.short}</div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="header-5">Actions</div>
                                    <div className="d-flex action-buttons justify-content-between flex-wrap">
                                        <div
                                            className="action-button"
                                            onClick={this.handleRepoParse.bind(null, this.state.selectedRepo)}
                                        >parse repo</div>
                                        <div
                                            className="action-button"
                                            onClick={this.handleParseCogs.bind(null, this.state.selectedRepo)}
                                        >parse cogs</div>
                                        <div
                                            className="action-button"
                                            onClick={this.handleMoveRepo.bind(null, this.state.selectedRepo, 'approved')}
                                        >approved</div>
                                        <div
                                            className="action-button"
                                            onClick={this.handleMoveRepo.bind(null, this.state.selectedRepo, 'beta')}
                                        >beta</div>
                                        <div
                                            className="action-button"
                                            onClick={this.handleMoveRepo.bind(null, this.state.selectedRepo, 'unapproved')}
                                        >unapproved</div>
                                        {this.checkAccess() &&
                                            <div
                                                className="action-button delete"
                                                onClick={this.handleHideRepo.bind(null, this.state.selectedRepo)}
                                            >hide</div>
                                        }
                                        {this.checkAccess() &&
                                            <div
                                                className="action-button delete"
                                                onClick={this.handleUnHideRepo.bind(null, this.state.selectedRepo)}
                                            >unhide</div>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="header-5">Cogs</div>
                                    <div className="d-flex cogs-list justify-content-between flex-wrap">
                                        {cogsList}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
