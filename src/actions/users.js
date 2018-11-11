export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const REVERT_USER_ANSWER = 'REVERT_USER_ANSWER';

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