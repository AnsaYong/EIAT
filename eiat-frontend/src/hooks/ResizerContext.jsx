// ResizerContext.js
import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

// Define action types
const SET_NAVBAR_WIDTH = 'SET_NAVBAR_WIDTH';
const SET_ASIDE_WIDTH = 'SET_ASIDE_WIDTH';

// Create the Resizer context
const ResizerContext = createContext();

// Reducer function to manage width states
function resizerReducer(state, action) {
    switch (action.type) {
        case SET_NAVBAR_WIDTH:
            return { ...state, navbarWidth: action.payload };
        case SET_ASIDE_WIDTH:
            return { ...state, asideWidth: action.payload };
        default:
            return state;
    }
}

// Provider component
export const ResizerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(resizerReducer, {
        navbarWidth: 200, // Default initial width
        asideWidth: 100,  // Default initial width
    });

    // Define the dispatch functions for setting width
    const setNavbarWidth = (width) => dispatch({ type: SET_NAVBAR_WIDTH, payload: width });
    const setAsideWidth = (width) => dispatch({ type: SET_ASIDE_WIDTH, payload: width });

    return (
        <ResizerContext.Provider value={{ ...state, setNavbarWidth, setAsideWidth }}>
            {children}
        </ResizerContext.Provider>
    );
};

ResizerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to access the context
export const useResizerContext = () => useContext(ResizerContext);