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

    render() {
        return (
            <div className="panel">
                <section>
                    <h1 className="section-header">Control Panel</h1>
                    <div className="section-inner-wrapper">
                        <h4>Add cog to regitstry</h4>
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
                                    style={{'minWidth': '350px'}}
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
                    </div>
                </section>
            </div>
        );
    }
}

export default Panel;
