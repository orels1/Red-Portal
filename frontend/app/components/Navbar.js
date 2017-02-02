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
            <nav className='navbar navbar-light navbar-fixed-top bg-faded'>
                <div className="container">
                    <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar">
                        &#9776;
                    </button>
                    <div className='collapse navbar-toggleable-xs' id='navbar'>
                        <Link to='/' activeClassName="active" className='navbar-brand'>
                            <i className="fa fa-code" aria-hidden="true"></i>&nbsp;
                            Red Discord Bot
                        </Link>
                        <ul className="nav navbar-nav float-xs-right">
                            <li className="nav-item github">
                                <a href="/api/v1/auth/github" className="nav-link">
                                    <i className="fa fa-github" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                        <form className="form-inline float-xs-right navbar-search" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search cogs..."
                                autoFocus="autoFocus"
                                value={this.state.searchQuery}
                                onChange={this.handleUpdateSearchQuery.bind(this)}
                            />
                        </form>
                        <ul className="nav navbar-nav float-xs-right">
                            <li className="nav-item">
                                <Link to='/cogs/' activeClassName="active" className="nav-link">
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
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;