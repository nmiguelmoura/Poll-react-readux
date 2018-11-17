import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {ANSWERED, UNANSWERED} from "../res/texts";
import ListedQuestion from "./ListedQuestion";
import { prepareQuestion } from "../utils/helpers";

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

        return (
            <div>
                <button onClick={this.toggleView}>
                    {this.state.showAlreadyAnswered ? UNANSWERED : ANSWERED}
                </button>
                <ul>
                    {this.props.questions.map(question => {
                        if (question.alreadyAnswered === this.state.showAlreadyAnswered) {
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
                </ul>
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

    return {
        authedUser,
        questions,
        users
    }
}

export default connect(mapStateToProps)(List);