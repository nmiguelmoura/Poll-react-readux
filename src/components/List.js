import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {ANSWERED, UNANSWERED} from "../res/texts";
import ListedQuestion from "./ListedQuestion";
import { prepareQuestion } from "../utils/helpers";
import styles from './List.module.css';

class List extends Component {
    state = {
        forceLogin: false,
        showAlreadyAnswered: false
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

    pollClick = (id) => {
        //TODO: REDIRECT TO POLL
        console.log(id);
        this.props.history.push(`/question/${id}`);
    };

    toggleView = () => {
        this.setState(prev => ({
            showAlreadyAnswered: !prev.showAlreadyAnswered
        }));
    };

    render() {
        if(this.state.forceLogin) {
            return (
                <Redirect to='/' />
            );
        }

        let questionsDisplaying = 0;

        return (
            <div className={`container main-container ${styles.container}`}>
                <div className='row'>
                    <div className='col-12'>
                        <button
                            onClick={this.toggleView}
                            className={styles.button}>
                            {this.state.showAlreadyAnswered ? UNANSWERED : ANSWERED}
                        </button>
                    </div>
                    <ul className='col-12'>
                        {this.props.questions.map(question => {
                            if (question.alreadyAnswered === this.state.showAlreadyAnswered) {
                                questionsDisplaying++;
                                return (
                                    <li key={question.id}>
                                        <ListedQuestion
                                            question={question}
                                            user={this.props.users[question.author]}
                                            onPollClick={this.pollClick}
                                        />
                                    </li>
                                );
                            }
                            return null;
                        })}

                        {questionsDisplaying === 0 && (
                            <li className={styles['no-results']}>No questions to see here!</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps({questions, authedUser, users}) {
    questions = Object.getOwnPropertyNames(questions)
    .map(questionId => {
        let question = questions[questionId];
        return prepareQuestion(question, authedUser);
    });

    questions.sort((a, b) => b.timestamp - a.timestamp);

    return {
        authedUser,
        questions,
        users
    }
}

export default connect(mapStateToProps)(List);