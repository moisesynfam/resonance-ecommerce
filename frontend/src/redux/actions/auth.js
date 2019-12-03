
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    USER_LOADED: 'USER_LOADED',
    USER_LOGGED_OUT: 'USER_LOGGED_OUT'
}

export const registerUser = (formData) => async (dispatch, getState) => {
    try {
        // const { username, password } = formData;
        
        const results = await ResonanceApi.auth.register(formData);

        return results;

        // history.push('/login');


    } catch (err) {

        console.warn("Error submiting form", err);
        return { success: false, message: err.message}


    }
}

export const loginUser = (loginData) => async (dispatch, getState) => {
    try {
        
        const token = await ResonanceApi.auth.login(loginData);
        
        localStorage.setItem('jwtToken', token);
        ResonanceApi.setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(loadUser(decoded));
        // history.push('/');
        return {success: true}

    } catch (err) {

        console.warn("Error submiting form", err);
        return { success: false, message: err.message}


    }
}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('jwtToken');
    ResonanceApi.setAuthToken(false);
    dispatch({
        type: types.USER_LOGGED_OUT,
        user: {}
    })
}

export const loadUser = (user) => {
    
    return {
        type: types.USER_LOADED,
        payload: { user }
    }
}

const INITIAL_VALUE = {
    isAuthenticated: false,
    user: {}
}
export default (auth = INITIAL_VALUE, action) => {

    switch (action.type) {
        case types.USER_LOADED:
            return { ...auth, isAuthenticated: !isEmpty(action.payload.user), user: action.payload.user}
        case types.USER_LOGGED_OUT:
            return { ...auth, isAuthenticated: false, user: {}}
        default:
            return auth;
    }
}