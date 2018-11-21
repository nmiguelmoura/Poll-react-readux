import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {NEW_QUESTION, QUESTIONS, RANKING, LOGOUT} from '../res/texts';
import {removeAuthenticatedUser} from "../actions/authedUser";
import styles from './Header.module.css';

class Header extends Component {
    logout = (event) => {
        this.props.dispatch(removeAuthenticatedUser());
    };

    render() {
        return (
            <header
                className={`container-fluid ${styles.header}`}
                style={{display: this.props.authedUser ? 'block' : 'none'}}
            >
                <nav className='row'>
                    <ul className='col-12'>
                        <li className={styles.li}>
                            <NavLink to='/list' exact activeClassName='active'>
                                {QUESTIONS}
                            </NavLink>
                        </li>
                        <li className={styles.li}>
                            <NavLink to='/new' activeClassName='active'>
                                {NEW_QUESTION}
                            </NavLink>
                        </li>
                        <li className={styles.li}>
                            <NavLink to='/ranking' activeClassName='active'>
                                {RANKING}
                            </NavLink>
                        </li>
                        <li className={`${styles.li} ${styles['li-right']}`}>
                            <button onClick={this.logout}>
                                {LOGOUT}
                            </button>
                        </li>
                        <li className={`${styles.li} ${styles['li-right']} ${styles.author}`}>
                            {this.props.authedUser && (
                                <img
                                    src={this.props.users[this.props.authedUser].avatarURL}
                                    alt={this.props.users[this.props.authedUser].name}/>
                            )}
                        </li>
                    </ul>
                </nav>


            </header>
        );
    };
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Header);