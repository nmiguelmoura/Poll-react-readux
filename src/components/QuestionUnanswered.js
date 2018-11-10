import React from 'react';
import { QUESTION_OPTIONS } from "../utils/constants";

const QuestionUnanswered = (props) => {
    const {question} = props;
    return (
        <div>
            <button onClick={() => {
                props.onAnswer(question.id, QUESTION_OPTIONS.OPTION_ONE)
            }}>
                {question.optionOne.text}
            </button>
            <button onClick={() => {
                props.onAnswer(question.id, QUESTION_OPTIONS.OPTION_TWO)
            }}>
                {question.optionTwo.text}
            </button>
        </div>
    );
};

export default QuestionUnanswered;