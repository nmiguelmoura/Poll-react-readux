import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ANSWERED, UNANSWERED} from "../res/texts";
import QuestionUnanswered from './QuestionUnanswered';
import { handleAddAnswer } from "../actions/questions";

class List extends Component {
    state = {
        showAlreadyAnswered: false
    };

    answerQuestion = (qid, answer) => {
        this.props.dispatch(handleAddAnswer({
            authedUser: this.props.authedUser,
            qid,
            answer
        }));
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
                                    {this.state.alreadyAnswered
                                        ? question.id
                                        : <QuestionUnanswered
                                            question={question}
                                            onAnswer={this.answerQuestion}
                                        />
                                    }
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

function mapStateToProps({questions, authedUser}) {
    questions = Object.getOwnPropertyNames(questions)
    .map(questionId => {
        let question = questions[questionId];
        question.alreadyAnswered =
            question.optionOne.votes.find((userId) => userId === authedUser)
            || question.optionTwo.votes.find((userId) => userId === authedUser)
                ? true
                : false;

        return question;
    });

    return {
        authedUser,
        questions
    }
}

export default connect(mapStateToProps)(List);