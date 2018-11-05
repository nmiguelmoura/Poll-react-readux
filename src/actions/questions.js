import * as API from '../utils/data';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

// RECEIVE QUESTIONS
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

// ADD QUESTIONS
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        API._saveQuestion(question)
            .then(formattedQuestion => dispatch(addQuestion(formattedQuestion)))
            .catch(e => console.log(e));
    }
}

// ADD ANSWER
function addAnswer(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER,
        action: {
            authedUser,
            qid,
            answer
        }
    }
}

export function handleAddAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        API._saveQuestionAnswer(authedUser, qid, answer)
            .then(() => dispatch(addAnswer(authedUser, qid, answer)))
            .catch(e => console.log(e));
    }
}