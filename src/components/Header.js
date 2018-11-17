import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {NEW_QUESTION, QUESTIONS, RANKING, LOGOUT} from '../res/texts';
import {removeAuthenticatedUser} from "../actions/authedUser";

class Header extends Component {
    logout = (event) => {
        this.props.dispatch(removeAuthenticatedUser());
    };

    render() {
        return(
            <header style={{display: this.props.authedUser ? 'block' : 'none'}}>
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                {QUESTIONS}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/new' activeClassName='active'>
                                {NEW_QUESTION}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/ranking' activeClassName='active'>
                                {RANKING}
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={this.logout}>
                                {LOGOUT}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    };
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Header);