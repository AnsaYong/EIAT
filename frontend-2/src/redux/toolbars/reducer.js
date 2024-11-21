// Creates the reducer to handle actions related to the toolbar
import { OPEN_TOOLBAR, CLOSE_TOOLBAR, TOGGLE_TOOLBAR } from './actions';

// Initial state of the toolbar reducer
const initialState = {
    openToolbars: {},
};

// Reducer function
const toolbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TOOLBAR:
            return {
                ...state,
                openToolbars: {
                    ...state.openToolbars,
                    [action.payload]: true,
                },
            };
        case CLOSE_TOOLBAR:
            return {
                ...state,
                openToolbars: {
                    ...state.openToolbars,
                    [action.payload]: false,
                },
            };
        case TOGGLE_TOOLBAR:
            return {
                ...state,
                openToolbars: {
                    ...state.openToolbars,
                    [action.payload]: !state.openToolbars[action.payload],
                },
            };
        default:
            return state;
    }
};

export default toolbarReducer;
