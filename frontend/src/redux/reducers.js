import { combineReducers } from 'redux';
import authReducer from './actions/auth';
import furnitureReducer from './actions/furniture';
import vendorsReducer from './actions/vendors';

export default combineReducers({
    auth: authReducer,
    furniture: furnitureReducer,
    vendors: vendorsReducer
})