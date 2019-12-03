import { combineReducers } from 'redux';
import authReducer from './actions/auth';
import furnitureReducer from './actions/furniture';

export default combineReducers({
    auth: authReducer,
    furniture: furnitureReducer
})