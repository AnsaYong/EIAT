// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadProjectModalOpen: false,
    // other modals...
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLoadProjectModal: (state) => {
            state.loadProjectModalOpen = true;
        },
        closeLoadProjectModal: (state) => {
            state.loadProjectModalOpen = false;
        },
    },
});

export const { openLoadProjectModal, closeLoadProjectModal } = modalSlice.actions;
export default modalSlice.reducer;
