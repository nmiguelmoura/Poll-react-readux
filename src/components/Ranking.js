import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

class Ranking extends Component {
    state = {
        forceLogin: false,
    };

    componentDidMount() {
        this.checkIfLoginNeeded(this.props.authedUser);
    }

    componentWillReceiveProps(props) {
        this.checkIfLoginNeeded(props.authedUser);
    }

    checkIfLoginNeeded(authedUser) {
        if(!authedUser) {
            this.setState(prev => ({
                forceLogin: true
            }));
        }
    }

    render() {
        if(this.state.forceLogin) {
            return (
                <Redirect to='/' />
            );
        }

        return (
            <div>
                <h1>LEADERBOARD</h1>
                <ul>
                    {this.props.users.map(user => {
                        const questions = user.questions.length;
                        const answers = Object.getOwnPropertyNames(user.answers).length;
                        const score = questions + answers;
                        return (
                            <li key={user.id}>
                                <img
                                    src={user.avatarURL}
                                    alt={user.name}/>

                                <p>{user.name}</p>
                                <p>Questions: {questions}</p>
                                <p>Answers: {answers}</p>
                                <p>Score: {score}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ authedUser, users }) {

    users = Object.getOwnPropertyNames(users)
        .map(userKey => users[userKey]);

    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Ranking);