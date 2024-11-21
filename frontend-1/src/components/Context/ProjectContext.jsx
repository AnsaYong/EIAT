// ProjectContext.js - Holds the project data globally and provide methods to
// fetch or update the project data as needed
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { useProject } from '../../apiHooks'; 

export const ProjectContext = createContext();  // Create the Project context

// Create a provider component
export const ProjectProvider = ({ children }) => {
    // State to hold the project data
    const [projectId, setProjectId] = useState(null);
    const { data: project, isLoading, error } = useProject(projectId);

    // Function to set the project ID and fetch project details
    const fetchProject = (id) => {
        setProjectId(id);
        
    };

    // Optional function to update project details
    // eslint-disable-next-line no-unused-vars
    const updateProject = (newProjectData) => {
        // Here you can integrate your update logic if needed
    };

    return (
        <ProjectContext.Provider value={{ project, fetchProject, updateProject, isLoading, error }}>
            {children}
        </ProjectContext.Provider>
    );
};

// Define prop types for the ProjectProvider
ProjectProvider.propTypes = {
    children: PropTypes.node.isRequired,
};