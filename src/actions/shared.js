import * as API from '../utils/data';
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import {dispatchAlert} from "../utils/helpers";
import {startLoading, endLoading} from "./loading";

export const GET_INTIAL_DATA = 'GET_INITIAL_DATA';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(startLoading());
          Promise.all([
              API._getUsers(),
              API._getQuestions()
          ])
        .then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(endLoading());
        })
        .catch(e => {
            dispatchAlert()
            dispatch(endLoading());
        });
    };
}
