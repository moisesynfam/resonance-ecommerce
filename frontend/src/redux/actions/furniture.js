
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    FURNITURE_FETCHED: 'FURNITURE_FETCHED',
    
}

export const fetchFurniture = (page = 1, perPage = 9) => async (dispatch, getState) => {
    try {
        
        const { furniture, pagination } = await ResonanceApi.furniture.getAll(page, perPage);
        
        dispatch({
            type: types.FURNITURE_FETCHED,
            payload: { furniture, pagination }
        })
        
        // history.push('/');
        return {success: true}

    } catch (err) {

        console.warn("Error getting  furnitures ", err);
        return { success: false, message: err.message}


    }
}


const INITIAL_VALUE = {
    items: [],
    pagination: {}
}
export default (furniture = INITIAL_VALUE, action) => {

    switch (action.type) {
        case types.FURNITURE_FETCHED:
            return { ...furniture, items: action.payload.furniture, pagination: action.payload.pagination }
        default:
            return furniture;
    }
}