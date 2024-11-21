import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ProjectService from '@/api/ProjectService.js';

// TODO: Implement optimistic updates for saveProject thunk

// Thunk for fetching projects
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        const response = await ProjectService.getProjects();
        return response;  // Assuming response is an array of projects
    }
);

// Thunk for saving a project
export const saveProject = createAsyncThunk(
    'projects/saveProject',
    async (project) => {
        const response = await ProjectService.createProject(project);
        return response;  // Return the saved project
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        items: [],
        selectedProject: null,  // Track the selected project
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        // Define more synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(saveProject.fulfilled, (state, action) => {
                state.items.push(action.payload);  // Assuming payload is the new project
            });
    },
});


// Export actions and selectors
export const { setSelectedProject } = projectsSlice.actions;
export const selectSelectedProject = (state) => state.projects.selectedProject;
export const selectProjects = (state) => state.projects.items;

export default projectsSlice.reducer;
