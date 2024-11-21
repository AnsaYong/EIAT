// InitialSetup.jsx - Displays a popup for initial setup of the application.
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './InitialSetup.css';

const InitialSetup = ({ onClose }) => {
    const navigate = useNavigate();

    // Event handler for creating a new project - closes the popup and navigates to the create project page
    const handleCreateProject = () => {
        onClose();
        navigate('/create-project');
    };

    // Event handler for opening an existing project - closes the popup and navigates to the projects page
    const handleOpenProject = () => {
        onClose();
        navigate('/projects');
    };

    return (
        <div className="overlay">
            <div className="popup-box">
                <h2>Welcome to the EIA Tool</h2>
                <button className="button" onClick={handleOpenProject}>Load Existing Project</button>
                <button className="button" onClick={handleCreateProject}>Start New Project</button>
            </div>
        </div>
    );
};

InitialSetup.propTypes = {
    onClose: PropTypes.func.isRequired,
};

InitialSetup.defaultProps = {
    onClose: () => {},  // Default function to avoid runtime issues
};

export default InitialSetup;
