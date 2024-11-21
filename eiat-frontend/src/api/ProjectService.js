// ProjectService.js - Handles project-related API calls
import api from './apiService.js';

// Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await api.post('core/projects/', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;  // This will let the caller handle the error
    }
};

// Fetch all projects
export const getProjects = async () => {
    try {
        const response = await api.get('core/projects/');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

// Fetch a single project by ID
export const getProjectById = async (id) => {
    try {
        const response = await api.get(`core/projects/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project with ID ${id}:`, error);
        throw error;
    }
};

// Update an existing project by ID
export const updateProject = async (id, projectData) => {
    try {
        const response = await api.put(`core/projects/${id}/`, projectData);
        return response.data;
    } catch (error) {
        console.error(`Error updating project with ID ${id}:`, error);
        throw error;
    }
};

// Delete a project by ID
export const deleteProject = async (id) => {
    try {
        await api.delete(`core/projects/${id}/`);
        console.log(`Project with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting project with ID ${id}:`, error);
        throw error;
    }
};
