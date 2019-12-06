
import ResonanceApi from '../../apis/Resonance';
import jwtDecode from 'jwt-decode';
import isEmpty from 'is-empty';

const types = {
    FURNITURE_FETCHED: 'FURNITURE_FETCHED',
    SET_CURRENT_ITEM: 'SET_CURRENT_ITEM',
    QUERY_CHANGED: 'QUERY_CHANGED'
    
}

export const fetchFurniture = () => async (dispatch, getState) => {
    try {
        const { furniture: {query} } = getState();
        const { furniture, pagination } = await ResonanceApi.furniture.getAll(query);
        
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

export const changeQuery = (newQueryItem) => async (dispatch, getState) => {
    
    await dispatch({
        type: types.QUERY_CHANGED,
        payload: {newQueryItem}
    });
    dispatch(fetchFurniture());
}

export const fetchCurrentItem = (itemId) => async (dispatch, getState) => {
    try {
        
        const item = await ResonanceApi.furniture.getItem(itemId);
        
        await dispatch({
            type: types.SET_CURRENT_ITEM,
            payload: { item }
        })
        
        // history.push('/');
        return {success: true}

    } catch (err) {

        console.warn("Error getting item ", err);
        return { success: false, message: err.message}


    }
}


const INITIAL_VALUE = {
    items: [],
    pagination: {},
    currentItem: {},
    query: {
        perPage: 9,
        page: 1
    }
}
export default (furniture = INITIAL_VALUE, action) => {

    switch (action.type) {
        case types.FURNITURE_FETCHED:
            return { ...furniture, items: action.payload.furniture, pagination: action.payload.pagination };
        case types.SET_CURRENT_ITEM:
            return { ...furniture, currentItem: action.payload.item };
        case types.QUERY_CHANGED:
            return { ...furniture, query: { ...furniture.query, ...action.payload.newQueryItem } };
        default:
            return furniture;
    }
}