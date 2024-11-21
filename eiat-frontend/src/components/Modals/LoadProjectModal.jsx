import { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Select, Loader, Box, Text, Group, Image, Center, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { fetchProjectsFromAPI, fetchProjectsFromCache } from '@/utils/projectUtils';

// Redux actions
import { closeLoadProjectModal } from '@/redux/modals/modalSlice';
import { setSelectedProject } from '@/redux/projects/projectsSlice';
import { setActiveStep } from '@/redux/steps/stepsSlice';

// Styles
import { loadProjectStyles } from '@/Styles/loadProjectStyles';

import icon1 from '@/assets/icon1.png';

const LoadProjectModal = () => {
    // Hooked to redux state and theme styling
    const { classes } = loadProjectStyles();
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.loadProjectModalOpen);
    const selectedProject = useSelector((state) => state.projects.selectedProject);

    // Local state and network check
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewType, setViewType] = useState('thumbnails');
    const isOnline = window.navigator.onLine;
    
    console.log('Current project:', selectedProject);

    // Handle loading errors
    const handleLoadingError = (error) => {
        console.error('Error loading projects:', error);
        setError('Failed to load projects. Please try again later');
    };

    // Load projects from API or local storage
    const loadProjects = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const fetchedProjects = isOnline ? await fetchProjectsFromAPI() : fetchProjectsFromCache();
            setProjects(fetchedProjects);
        } catch (error) {
            handleLoadingError(error);
        } finally {
            setLoading(false);
        }
    }, [isOnline]);

    // Auto load projects on modal open
    useEffect(() => {
        if (modalOpen)  loadProjects();
    }, [modalOpen, loadProjects]);

    // Show error notifications
    useEffect(() => {
        if (error) {
            showNotification({
                title: 'Error',
                message: error,
                color: 'red',
            });
        }
    }, [error]);

    // Project selection handler
    const handleProjectSelect = (projectID) => {
        const project = projects.find((project) => project.id === Number(projectID));
        if (project) {
            console.log('Project loaded:', project.name);
            dispatch(setSelectedProject(project));
            dispatch(closeLoadProjectModal());
            dispatch(setActiveStep('Information'));
        }
    };

    // Load blank project if user cancels the modal
    const handleCancel = () => {
        if (!selectedProject) {
            dispatch(setSelectedProject({ id: null, name: 'Untitled Project' }));
        }
        dispatch(closeLoadProjectModal());
    };

    // Memoize project options for Select dropdown
    const projectOptions = useMemo(() => (
        projects.map((project) => ({
            value: project.id.toString(),
            label: project.name,
        }))
    ), [projects]);

    return (
        <Modal
            opened={modalOpen}
            onClose={handleCancel}
            title="Select a Project"
            overlayProps={{
                backgroundOpacity: 0.55,
            }}
            size="lg"
            style = {{backgroundColor: '#f9f9f9'}}
        >
            {loading ? (
                <Center><Loader /></Center>
            ) : projects.length > 0 ? (
                <Box padding="sm" style={{ padding: "lg", display: 'flex', flexDirection: 'row' }}>
                    {/* Sidebar for folder navigation */}
                    <Box style={{ flex: 1, padding: '1rem', borderRight: '10px solid #e0e0e0', maxWidth: '250px', backgroundColor: '#f9f9f9' }}>
                        <Text weight={500}>Folders</Text>
                        {/* Placeholder for folder navigation, replace with actual data */}
                        <Text>Default Folder</Text>
                        <Text>Other Folder</Text>
                        <Text>Subfolder</Text>
                    </Box>

                    {/* Main area for project display */}
                    <Box style={{ flex: 3, padding: '1rem', backgroundColor: '#f9f9f9' }}>
                        <Group position="apart" style={{ marginBottom: '1rem' }}>
                            <Text weight={500}>Available Projects</Text>
                            <Select
                                placeholder="View as"
                                data={[{ value: 'thumbnails', label: 'Thumbnails' }, { value: 'lists', label: 'Lists' }]}
                                size="sm"
                                style={{ width: '150px' }}
                            />
                        </Group>
                        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {projects.map(project => (
                                <Box key={project.id} padding="md" style={{ border: '1px solid #e0e0e0', borderRadius: '4px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                                    <Image
                                        src={icon1}
                                        alt={project.name}
                                        width={80}
                                        height={80}
                                        mb="sm"
                                    />
                                    <Text size="sm">{project.name}</Text>
                                    <Button variant="light" onClick={() => handleProjectSelect(project.id)}>Select</Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Center>
                    <Text color="dimmed">No projects available</Text>
                </Center>
            )}
            <Box style={{ padding: '1rem', textAlign: 'right', borderTop: '1px solid #e0e0e0', color: '#e0e0e0', backgroundColor: '#f9f9f9' }}>
                <Button onClick={handleCancel}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default LoadProjectModal;
