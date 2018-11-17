import { combineReducers } from 'redux';
import loading from './loading';
import users from './users';
import questions from './questions';
import authedUser from './authedUser';

export default combineReducers({
    loading,
    users,
    questions,
    authedUser
});