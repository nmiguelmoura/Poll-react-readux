export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const REVERT_USER_ANSWER = 'REVERT_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const REVERT_USER_QUESTION = 'REVERT_USER_QUESTION';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserAnswer({ userId, qid, answer }) {
    return {
        type: ADD_USER_ANSWER,
        userId,
        qid,
        answer
    }
}

export function revertUserAnswer({ userId, qid }) {
    return {
        type: REVERT_USER_ANSWER,
        userId,
        qid
    }
}

export function addUserQuestion({ author, id }) {
    return {
        type: ADD_USER_QUESTION,
        userId: author,
        id
    };
}

export function revertUserQuestion({ authedUser, qid }) {
    return {
        type: REVERT_USER_QUESTION,
        userId: authedUser,
        qid
    };
}