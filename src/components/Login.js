import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setAuthenticatedUser } from '../actions/authedUser';
import styles from './Login.module.css';

class Login extends Component {

    state = {
        selectedUser: ''
    };

    static getDerivedStateFromProps(props, state) {
        if(props.authedUser) {
            props.history.push('/list');
        }

        return state;
    }

    onLogin = (event) => {
        event.preventDefault();

        if(this.state.selectedUser) {
            this.props.dispatch(setAuthenticatedUser(this.state.selectedUser));
        }
    };

    onChange = (event) => {
        const selectedUser = event.target.value;

        this.setState(prev => ({
            selectedUser
        }))
    };

    render() {
        return (
            <div className={`container main-container ${styles.container}`}>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Would you rather</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <select value={this.state.selectedUser} onChange={this.onChange}>
                                    <option value='' disabled>Select a user</option>
                                    {this.props.users.map(user => (
                                        <option
                                            key={user.id}
                                            value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-12'>
                                <button onClick={this.onLogin}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users: Object.getOwnPropertyNames(users)
            .map(user => users[user])
    };
}

export default connect(mapStateToProps)(Login);