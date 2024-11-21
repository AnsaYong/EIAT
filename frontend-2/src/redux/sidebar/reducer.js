// Creates the reducer to handle actions related to the navbar
import { SET_NAVBAR_WIDTH } from './actions';

// Initial state of the navbar reducer
const initialState = {
    navbarWidth: 100, // Default width
};

const navbarWidthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAVBAR_WIDTH:
            return {
                ...state,
                navbarWidth: action.payload,
            };
        default:
            return state;
    }
};

export default navbarWidthReducer;