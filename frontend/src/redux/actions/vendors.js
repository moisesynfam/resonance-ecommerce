
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    VENDORS_FETCHED: 'VENDORS_FETCHED',
    
}

export const fetchVendors = () => async (dispatch, getState) => {
    try {
        
        const vendors = await ResonanceApi.vendors.getAll();
        
        dispatch({
            type: types.VENDORS_FETCHED,
            payload: { vendors }
        })
        
        // history.push('/');
        return {success: true}

    } catch (err) {

        console.warn("Error getting vendors ", err);
        return { success: false, message: err.message}


    }
}


const INITIAL_VALUE = {
    list: [],
    
}
export default (vendors = INITIAL_VALUE, action) => {

    switch (action.type) {
        case types.VENDORS_FETCHED:
            return { ...vendors, list: action.payload.vendors }
        default:
            return vendors;
    }
}