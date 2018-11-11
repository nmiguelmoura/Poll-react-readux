import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ANSWERED, UNANSWERED} from "../res/texts";
import ListedQuestion from "./ListedQuestion";
import { prepareQuestionForList } from "../utils/helpers";

class List extends Component {
    state = {
        showAlreadyAnswered: false
    };

    pollClick = () => {
        //TODO: REDIRECT TO POLL
        console.log('go to poll');
    };

    toggleView = () => {
        this.setState(prev => ({
            showAlreadyAnswered: !prev.showAlreadyAnswered
        }));
    };

    render() {
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
        return prepareQuestionForList(question, authedUser);
    });

    return {
        authedUser,
        questions,
        users
    }
}

export default connect(mapStateToProps)(List);