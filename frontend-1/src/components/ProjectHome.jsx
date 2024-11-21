// ProjectHome.jsx - Renders the project home page
import { useContext } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaRegClock } from 'react-icons/fa'; // Import some icons

import { ProjectContext } from './Context/ProjectContext';

import './Styles/ProjectHome.css';


const ProjectHome = () => {
    const { project } = useContext(ProjectContext);

    return (
        <div className="project-home">
            <div className="project-header">
                <h2 className="project-title">Project Overview</h2>
                <p className="project-description">
                    Welcome to the project dashboard. From here, you can explore different stages of the EIA process, view reports, and manage project details.
                </p>
            </div>

            <div className="project-details"> 
                <div className="project-item">
                    <strong>Project Name:</strong>
                    <span>{project.name}</span>
                </div>

                <div className="project-item">
                    <strong>Description:</strong>
                    <span>{project.description}</span>
                </div>

                <div className="project-item">
                    <FaMapMarkerAlt className="project-icon" />
                    <strong>Location:</strong>
                    <span>{project.location}</span>
                </div>

                <div className="project-item">
                    <FaCalendarAlt className="project-icon" />
                    <strong>Start Date:</strong>
                    <span>{new Date(project.start_date).toLocaleDateString()}</span>
                </div>

                <div className="project-item">
                    <FaRegClock className="project-icon" />
                    <strong>Last Modified:</strong>
                    <span>{new Date(project.last_modified).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectHome;

