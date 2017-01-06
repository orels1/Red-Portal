/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = NavbarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NavbarStore.listen(this.onChange);
    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    // Search stuff. Was left here just to keep the useful code
    handleSubmit(event) {
        event.preventDefault();

        let searchQuery = this.state.searchQuery.trim();

        if (searchQuery && searchQuery.length > 2) {
            NavbarActions.find(searchQuery);
        }
    }

    handleUpdateSearchQuery(event) {
        NavbarActions.updateSearchQuery(event);
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
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;