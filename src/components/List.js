import React, {Component} from 'react';
import {connect} from 'react-redux';

class List extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

function mapStateToProps({ questions, authedUser }) {
    questions = Object.getOwnPropertyNames(questions)
        .map(questionId => {
            console.log(questionId);
            let question = questions[questionId];
            question.alreadyAnswered =
                question.optionOne.votes.find((userId) => userId === authedUser)
                || question.optionTwo.votes.find((userId) => userId === authedUser)
                    ? true
                    : false;

            return question;
        });

    console.log(questions);
    return {
        questions
    }
}

export default connect(mapStateToProps)(List);