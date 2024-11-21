import { getProjects } from '@/api/ProjectService';


export const isElectron = () => typeof window.electron !== "undefined";

// Fetch projects from the API
export const fetchProjectsFromAPI = async () => {
    const fetchedProjects = await getProjects();
    if (isElectron()) {
        fetchedProjects.forEach(project => window.electron.saveProject(project));
    } else {
        console.warn("Electron API is not available in the browser environment.");
    }
    return fetchedProjects;
};

// Fetch projects from the local cache
export const fetchProjectsFromCache = () => {
    if (isElectron()) {
        return window.electron.fetchProjects();
    }
    console.warn("Electron API is not available in the browser environment.");
    return [];
};
