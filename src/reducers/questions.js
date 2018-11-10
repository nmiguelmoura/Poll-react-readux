import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER, REVERT_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };

        case ADD_QUESTION:
            const question = action.question;
            return {
                ...state,
                [question.id]: question
            };

        case ADD_ANSWER:
            const updatedQuestion = state[action.qid];
            const currentVotes = updatedQuestion[action.answer].votes;
            updatedQuestion[action.answer].votes = [...currentVotes, action.authedUser];

            return {
                ...state,
                [action.qid]: updatedQuestion
            };

        case REVERT_ANSWER:
            const questionToRevert = state[action.qid];
            questionToRevert[action.answer].votes.filter(userId => userId !== action.authedUser);
            return {
                ...state,
                [action.qid]: questionToRevert
            };

        default:
            return state;
    }
}