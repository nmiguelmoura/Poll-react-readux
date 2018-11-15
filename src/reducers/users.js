import {
    RECEIVE_USERS,
    ADD_USER_ANSWER,
    REVERT_USER_ANSWER,
    ADD_USER_QUESTION,
    REVERT_USER_QUESTION
} from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };

        case ADD_USER_ANSWER:
            const userToUpdate = state[action.userId];
            userToUpdate.answers[action.qid] = action.answer;
            return {
                ...state,
                [action.userId]: userToUpdate
            };

        case REVERT_USER_ANSWER:
            const userToRevert = state[action.userId];
            delete userToRevert.answers[action.qid];

            return {
                ...state,
                [action.userId]: userToRevert
            };

        case ADD_USER_QUESTION:
            const userToUpdateQuestion = state[action.userId];
            userToUpdateQuestion.questions = [...userToUpdateQuestion.questions, action.id];
            return {
                ...state,
                userToUpdateQuestion
            };

        case REVERT_USER_QUESTION:
            const userToRevertQuestion = state[action.userId];
            userToRevertQuestion.questions.filter(question => question.id !== action.id);
            return {
                ...state,
                userToRevertQuestion
            };

        default:
            return state;
    }
}