// apiHooks.js - Custom hook that uses React Query to fetch and update project data.
// It manages the state of the projects and provides hooks to fetch, create, and update projects.

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProjects, getProjectById, createProject, updateProject } from './apiService';

// Hook to create a project
export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation(createProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // Invalidate 'projects' query to refresh the list
        },
    });
};

// Hook to fetch all projects
export const useProjects = () => {
    return useQuery('projects', getProjects);
};

// Hook to fetch a project by ID
export const useProject = (id) => {
    console.log('UseProject is fetching project with ID:', id);
    return useQuery(['project', id], () => getProjectById(id), {
        enabled: !!id, // Fetch the project only if id is available
    });
};

// Hook to update a project
export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (project) => updateProject(project.id, project),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects'); // Invalidate 'projects' query to refresh the list
                queryClient.invalidateQueries(['project', project.id]); // Invalidate the specific project query
            },
        }
    );
};