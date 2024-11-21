import { createSlice } from '@reduxjs/toolkit';

// Initial state of the toolbar reducer
const initialState = {
    openToolbars: {}, // Track the open/closed state of toolbars
};

const toolbarsSlice = createSlice({
    name: 'toolbars',
    initialState,
    reducers: {
        openToolbar: (state, action) => {
            // Set the specified toolbar to open
            state.openToolbars[action.payload] = true;
        },
        closeToolbar: (state, action) => {
            // Set the specified toolbar to close
            state.openToolbars[action.payload] = false;
        },
        toggleToolbar: (state, action) => {
            // Toggle the open/closed state of the specified toolbar
            state.openToolbars[action.payload] = !state.openToolbars[action.payload];
        },
        setToolbarsState: (state, action) => {
            // Initialize the openToolbars state from persisted storage
            state.openToolbars = action.payload;
        },
    },
});

// Export actions
export const { openToolbar, closeToolbar, toggleToolbar, setToolbarsState } = toolbarsSlice.actions;

// Export the reducer
export default toolbarsSlice.reducer;
