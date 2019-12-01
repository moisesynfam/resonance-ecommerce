
const types = {
    USER_LOADED: 'USER_LOADED'
}

export default (auth = {}, action) => {

    switch (action.type) {
        case types.USER_LOADED:
            return { ...auth }
    
        default:
            return auth;
    }
}