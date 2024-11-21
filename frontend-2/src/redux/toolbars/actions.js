// Defines the redux actions for opening and closing toolbars
export const OPEN_TOOLBAR = 'OPEN_TOOLBAR';
export const CLOSE_TOOLBAR = 'CLOSE_TOOLBAR';
export const TOGGLE_TOOLBAR = 'TOGGLE_TOOLBAR';

// Action creators
export const openToolbar = (toolBarName) => ({
    type: OPEN_TOOLBAR,
    payload: toolBarName,
});

export const closeToolbar = (toolBarName) => ({
    type: CLOSE_TOOLBAR,
    payload: toolBarName,
});

export const toggleToolbar = (toolBarName) => ({
    type: TOGGLE_TOOLBAR,
    payload: toolBarName,
});
