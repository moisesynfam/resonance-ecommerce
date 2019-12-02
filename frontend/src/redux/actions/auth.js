
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    USER_LOADED: 'USER_LOADED'
}

export const registerUser = (formData) => async (dispatch, getState) => {
    try {
        const { username, password } = formData;
        
        const results = await ResonanceApi.auth.register(formData);

        if(!results.success) return { success: false, errors: results};

        // history.push('/login');


    } catch (err) {

        console.warn("Error submiting form", err);
        return { success: false, message: err.message}


    }
}

export const loginUser = (loginData) => async (dispatch, getState) => {
    try {
        
        const results = await ResonanceApi.auth.login(loginData);

        if(!results.success) return results;

        const { token } = results;
        localStorage.setItem('jwtToken', token);
        ResonanceApi.setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(loadUser(decoded));
        // history.push('/');

    } catch (err) {

        console.warn("Error submiting form", err);
        return { success: false, message: err.message}


    }
}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('jwtToken');
    ResonanceApi.setAuthToken(false);
    dispatch({
        type: types.USER_LOADED,
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
    
        default:
            return auth;
    }
}