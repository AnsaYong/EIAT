// Provides the Redux slice for the menu lists
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openedMenu: null, // Track which menu is currently opened (null means none)
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openMenu: (state, action) => {
            state.openedMenu = action.payload; // Set the opened menu index
        },
        closeAllMenus: (state) => {
            state.openedMenu = null; // Close all menus
        },
    },
});

export const { openMenu, closeAllMenus } = menuSlice.actions;
export default menuSlice.reducer;