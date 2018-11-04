import * as API from '../utils/data';
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export const GET_INTIAL_DATA = 'GET_INITIAL_DATA';

export function handleInitialData() {
    return (dispatch) => {
          Promise.all([
              API._getUsers(),
              API._getQuestions()
          ])
        .then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        })
        .catch(e => console.log(e));
    };
}
