// Defines redux actions for updating the navbar width
export const SET_NAVBAR_WIDTH = 'SET_NAVBAR_WIDTH';

export const setNavbarWidth = (width) => ({
    type: SET_NAVBAR_WIDTH,
    payload: width,
});