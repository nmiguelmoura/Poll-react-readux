import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component {
    render() {
        console.log(this.props.users);
        return (
            <div>
                <select>
                    {this.props.users.map(user => (
                        <option
                            key={user.id}
                            value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.getOwnPropertyNames(users)
            .map(user => users[user])
    };
}

export default connect(mapStateToProps)(Login);