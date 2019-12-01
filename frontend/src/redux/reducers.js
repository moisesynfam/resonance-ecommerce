import { combineReducers } from 'redux';
import authReducer from './actions/auth';

export default combineReducers({
    auth: authReducer
})