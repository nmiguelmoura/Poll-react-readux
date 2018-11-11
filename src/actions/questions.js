import * as API from '../utils/data';
import { addUserAnswer, revertUserAnswer } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REVERT_ANSWER = 'REVERT_ANSWER';

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
function addAnswer({authedUser, qid, answer}) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleAddAnswer({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(addAnswer({
            authedUser,
            qid,
            answer}));

        dispatch(addUserAnswer({
            userId: authedUser,
            qid,
            answer
        }));

        API._saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .catch(() => {
                //TODO: alert message here

                dispatch(revertAnswer({
                    authedUser,
                    qid,
                    answer
                }));

                dispatch(revertUserAnswer({
                    userId: authedUser,
                    qid
                }))
            })
    }
}

function revertAnswer({ authedUser, qid, answer }) {
    return {
        type: REVERT_ANSWER,
        authedUser,
        qid,
        answer
    }
}