import React from 'react';
import { NavLink } from 'react-router-dom';
import {NEW_QUESTION, QUESTIONS, RANKING, LOGOUT} from '../res/texts';

const Header = (props) => {
    return(
        <header>
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
                        <button onClick={props.onLogout}>
                            {LOGOUT}
                        </button>
                    </li>
                </ul>
            </nav>
            Questions
            New Question
            Leaderboard
            UserInfo
            Logout
        </header>
    );
};

export default Header;