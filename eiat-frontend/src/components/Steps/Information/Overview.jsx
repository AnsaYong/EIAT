// Overview.jsx
// This is the projet header summary component
import { Badge, Progress } from '@mantine/core';
import { useSelector } from 'react-redux';

const Overview = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    console.log("This is the overview")

    return (
        <div>
            <h2>{selectedProject.name}</h2>
            <Badge color={selectedProject.project_status === 'completed' ? 'green' : 'blue'}>
                {selectedProject.project_status}
            </Badge>
            <p>{selectedProject.description}</p>
            <Progress value={calculateTimelineProgress(selectedProject.start_date, selectedProject.end_date)} />
        </div>
    );
};

export default Overview;

// Utility function for calculating progress based on dates
function calculateTimelineProgress(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate || Date.now());
    const now = new Date();
    return ((now - start) / (end - start)) * 100;
}
