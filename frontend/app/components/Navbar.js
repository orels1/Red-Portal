/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import {decode} from 'jsonwebtoken';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = NavbarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    qs(key, props) {
        if (!props) {
            return false;
        }
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        let match = props.location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    componentDidMount() {
        NavbarStore.listen(this.onChange);
        let search = this.qs('search', this.props.router);
        if (search && search.length !== 0) {
            NavbarActions.updateSearchQuery({
                'event': {
                    'target': {
                        'value': search,
                    },
                },
                'router': this.props.router,
            });
        }

        // save token to local storage
        // function source -> https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        if (token) {
            window.localStorage.setItem('token', token);
        }

        // load token into state
        if (window.localStorage.getItem('token')) {
            NavbarActions.loadToken(window.localStorage.getItem('token'));
        }

        // setup ajax headers to send token by default
        $.ajaxSetup({
            'beforeSend': (xhr) => {
                xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
            },
        });

        Mousetrap.bind(['command+shift+p', 'ctrl+shift+p'], (e) => {
            $('.navbar-search .form-control').focus();
            return false;
        });
    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleUpdateSearchQuery(event) {
        let payload = {
            'event': event,
            'router': this.props.router,
        };

        NavbarActions.updateSearchQuery(payload);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    checkAccess() {
        let token = this.state.token && decode(this.state.token) ||  null;
        return token && token.roles && (token.roles.includes('admin') || token.roles.includes('staff'));
    }

    render() {
        return (
            <nav className='navbar navbar-toggleable-lg navbar-light bg-transparent'>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars" style={{'fontSize': '24px'}}></i>
                </button>
                <div className='collapse navbar-collapse justify-content-between' id='navbar'>
                    <div className="mr-auto">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link to='/' activeClassName="active" className="nav-link">
                                    Red-DiscordBot
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/cogs/' activeClassName="active" className="nav-link cogs">
                                    Cogs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about/' activeClassName="active" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="https://twentysix26.github.io/Red-Docs/" target="_blank" className="nav-link">
                                    Docs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="https://discord.me/Red-DiscordBot" target="_blank" className="nav-link">
                                    Community
                                </a>
                            </li>
                            {this.checkAccess() &&
                                <li className="nav-item">
                                    <Link to="/panel/" activeClassName="active" className="nav-link">
                                        Panel
                                    </Link>
                                </li>
                            }
                            <li className="nav-item">
                                <Link to="/cogs/orels1/Red-Portal-Cogs/redportal/" activeClassName="active" className="nav-link cogs active">
                                    get our cog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/api/v1/auth/github"  className="nav-link cogs">
                                    <i className="fa fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <form className="form-inline ml-auto navbar-search" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="cmd/ctrl+shift+p"
                                value={this.state.searchQuery}
                                onChange={this.handleUpdateSearchQuery.bind(this)}
                            />
                            <i className="fa fa-search"></i>
                        </form>
                    </div>
                </div>
            </nav>
    );
    }
}

export default Navbar;