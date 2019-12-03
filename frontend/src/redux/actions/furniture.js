
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    FURNITURE_FETCHED: 'FURNITURE_FETCHED',
    
}

export const fetchFurniture = () => async (dispatch, getState) => {
    try {
        
        const items = await ResonanceApi.furniture.getAll();
        
        dispatch({
            type: types.FURNITURE_FETCHED,
            payload: { items }
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
}
export default (furniture = INITIAL_VALUE, action) => {

    switch (action.type) {
        case types.FURNITURE_FETCHED:
            return { ...furniture, items: action.payload.items}
        default:
            return furniture;
    }
}