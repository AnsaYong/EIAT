// apiService.jsx - Manages project creation, retrieval, and updating, etc.
// by using the Axios library to make HTTP requests to the Django API.

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Django API base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        // Include other default headers here
    },
});

// Create a new project
export const createProject = async (projectData) => {
    const response = await api.post('core/projects/', projectData);
    return response.data;
};

// Fetch all existing projects
export const getProjects = async () => {
    if (!navigator.onLine) {
        // Retrieve data from the local storage if offline
        return JSON.parse(localStorage.getItem('projects')) || [];
    }

    const response = await api.get('core/projects/');
    localStorage.setItem('projects', JSON.stringify(response.data));
    
    //console.log(response.data.results);

    return response.data.results;
};

// Fetch a single project by ID
export const getProjectById = async (id) => {

    // Retrieve data from local storage if offline
    if (!navigator.onLine) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        return projects.find(project => project.id === id);
    }

    // Retrieve data online
    const response = await api.get(`core/projects/${id}/`);

    console.log("Data fetched by getProjectById:", response.data)
    return response.data;
};

// Update an existing project (partial update allowed)
export const updateProject = async (id, projectData) => {
    const response = await api.put(`core/projects/${id}/`, projectData, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            partial: true,
        },  // This is optional; check if the backend recognizes it
    });
    return response.data;
};

// Submit screening data
export const submitScreening = async (screeningData) => {
    const response = await api.post('screening/screenings/', screeningData);
    return response.data;
};

export default api;