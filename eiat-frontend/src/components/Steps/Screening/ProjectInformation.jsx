// ProjectInformation.jsx
import { useSelector } from 'react-redux';
import { Paper, Group, Text, Title, Divider } from '@mantine/core';

const ProjectInformation = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);

    if (!selectedProject) return <Text>No project selected.</Text>;

    return (
        <Paper padding="lg" shadow="sm">
            <Title order={3}>Project Overview</Title>
            <Divider my="sm" />
            <Group spacing="xl">
                <Text><strong>Name:</strong> {selectedProject.name}</Text>
                <Text><strong>Description:</strong> {selectedProject.description}</Text>
                <Text><strong>Location:</strong> {selectedProject.location}, {selectedProject.country}</Text>
            </Group>

            <Divider my="sm" />
            <Title order={4}>Management Information</Title>
            <Group spacing="xl">
                <Text><strong>Company:</strong> {selectedProject.company}</Text>
                <Text><strong>Project Manager:</strong> {selectedProject.manager}</Text>
            </Group>

            <Divider my="sm" />
            <Title order={4}>Key Dates</Title>
            <Group spacing="xl">
                <Text><strong>Start Date:</strong> {selectedProject.start_date}</Text>
                <Text><strong>End Date:</strong> {selectedProject.end_date || 'Ongoing'}</Text>
                <Text><strong>Last Modified:</strong> {new Date(selectedProject.last_modified).toLocaleDateString()}</Text>
            </Group>

            {selectedProject.latitude && selectedProject.longitude && (
                <>
                    <Divider my="sm" />
                    <Title order={4}>Geographic Coordinates</Title>
                    <Text>Latitude: {selectedProject.latitude}, Longitude: {selectedProject.longitude}</Text>
                </>
            )}
        </Paper>
    );
};

export default ProjectInformation;
