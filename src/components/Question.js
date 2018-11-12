import React, {Component} from 'react';
import {connect} from 'react-redux';
import {QUESTION_OPTIONS} from "../utils/constants";
import {prepareQuestion} from "../utils/helpers";
import { handleAddAnswer } from "../actions/questions";

class Question extends Component {
    onAnswer = (qid, answer) => {
        this.props.dispatch(handleAddAnswer({
            authedUser: this.props.authedUser,
            qid,
            answer
        }))
    };

    render() {
        const qid = this.props.match.id;
        let question = this.props.questions[qid];

        if(!question) {
            return(<div>LOADING</div>);
        }

        question = prepareQuestion(question, this.props.authedUser);

        let userAnswer;
        if(question.alreadyAnswered) {
            const user = this.props.users[this.props.authedUser];
            console.log("#######");
            console.log(this.props.authedUser);
            console.log(user);
            userAnswer = user.answers[qid];
        }

        return (
            <div>
                {!question.alreadyAnswered && (
                    <div>
                        <button onClick={() => {
                            this.onAnswer(question.id, QUESTION_OPTIONS.OPTION_ONE)
                        }}>
                            {question.optionOne.text}
                        </button>
                        <button onClick={() => {
                            this.onAnswer(question.id, QUESTION_OPTIONS.OPTION_TWO)
                        }}>
                            {question.optionTwo.text}
                        </button>
                    </div>
                )}

                {question.alreadyAnswered && (
                    <div>
                        {userAnswer}
                        <div>
                            <p>{question.optionOne.Text}</p>
                            <p>{question.optionOne.percentage}</p>
                        </div>
                        <div>
                            <p>{question.optionTwo.Text}</p>
                            <p>{question.optionOne.percentage}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

//
// const Question = (props) => {
//     const {question} = props;
//     return (
//         <div>
//             <button onClick={() => {
//                 props.onAnswer(question.id, QUESTION_OPTIONS.OPTION_ONE)
//             }}>
//                 {question.optionOne.text}
//             </button>
//             <button onClick={() => {
//                 props.onAnswer(question.id, QUESTION_OPTIONS.OPTION_TWO)
//             }}>
//                 {question.optionTwo.text}
//             </button>
//         </div>
//     );
// };

function mapStateToProps({authedUser, questions, users}, props) {
    return {
        authedUser,
        questions,
        users,
        ...props
    }
}

export default connect(mapStateToProps)(Question);