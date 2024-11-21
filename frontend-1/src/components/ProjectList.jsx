import { useState, useEffect } from 'react';
import { getProjects } from '../apiService'; // Import the API service to fetch projects
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'; // Add a separate CSS file for styling

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all projects when the component mounts
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectSelect = (id) => {
        // Navigate to the main window with the selected project ID
        navigate(`/project/${id}/home`);
    };

    return (
        <div className="project-list-container">
            <h2>Existing Projects</h2>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="project-list">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div 
                                key={project.id} 
                                className="project-item" 
                                onClick={() => handleProjectSelect(project.id)}
                            >
                                <p>{project.name}</p>
                                <span>{project.description}</span>
                            </div>
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </div>
            )}
            <div className="status-bar">
                <p>{projects.length} Projects Loaded</p>
            </div>
        </div>
    );
};

export default ProjectList;
