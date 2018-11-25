import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import styles from './Ranking.module.css';

class Ranking extends Component {
    state = {
        forceLogin: false,
        userAlreadyAuthed: false
    };

    componentDidMount() {
        this.checkIfLoginNeeded(this.props.authedUser, false);
    }

    componentWillReceiveProps(props) {
        this.checkIfLoginNeeded(props.authedUser);
    }

    checkIfLoginNeeded(authedUser) {
        if(!authedUser) {
            this.setState(prev => ({
                forceLogin: true
            }));
        } else {
            this.setState(prev => ({
                userAlreadyAuthed: true
            }));
        }
    }

    render() {
        if(this.state.forceLogin) {
            return (
                <Redirect to={{pathname: '/', state: this.state.userAlreadyAuthed ? {} : {redirectUrl: this.props.location.pathname}}} />
            );
        }

        return (
            <div className={`container main-container ${styles.container}`}>
                <h1>Ranking</h1>
                <ul className='container'>
                    {this.props.users.map(user => {
                        return (
                            <li
                                className='row'
                                key={user.id}>
                                <div className='col-4 col-sm-3'>
                                    <img
                                        src={user.avatarURL}
                                        alt={user.name}/>

                                </div>
                                <div className={`col-8 col-sm-9 nopadding ${styles.results}`}>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <p className={styles['user-name']}>{user.name}</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={`${styles.label} ${styles.score}`}>Score</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={`${styles.value} ${styles.score}`}>{user.results.score}</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={styles.label}>Questions</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={styles.value}>{user.results.questions}</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={styles.label}>Answers</p>
                                            </div>
                                            <div className='col-6'>
                                                <p className={styles.value}>{user.results.answers}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        .map(userKey => {
            const user = users[userKey];
            const questions = user.questions.length;
            const answers = Object.getOwnPropertyNames(user.answers).length;
            const score = questions + answers;

            user.results = {
                questions,
                answers,
                score
            };

            return users[userKey]
        });


    users.sort((a, b) => (b.results.score - a.results.score));

    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Ranking);