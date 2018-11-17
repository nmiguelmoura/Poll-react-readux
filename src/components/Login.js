import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setAuthenticatedUser } from '../actions/authedUser';

class Login extends Component {

    state = {
        selectedUser: ''
    };

    componentWillReceiveProps(props) {
        if(props.authedUser) {
            this.props.history.push('/list');
        }
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
            <div>
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
                <button onClick={this.onLogin}>
                    Submit
                </button>
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