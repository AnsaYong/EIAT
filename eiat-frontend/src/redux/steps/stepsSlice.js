// Redux slice for the general EIA steps
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeStep: '', // The current active step
};

const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        setActiveStep: (state, action) => {
            state.activeStep = action.payload; // Set the active step
        },
        resetStep: (state) => {
            state.activeStep = ''; // Reset the active step
        },
    },
});

export const { setActiveStep, resetStep } = stepsSlice.actions;
export default stepsSlice.reducer;