import { useState } from 'react';
import { createProject } from '../apiService'; // This calls the API to create the project
import { useNavigate } from 'react-router-dom';
import './CreateProject.css'

const CreateProject = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState(''); // Should be an ID, not a string
    const [start_date, setStart_date] = useState('');
    const [company, setCompany] = useState(''); // Should be an ID, not a string
    const [manager, setManager] = useState(''); // Should be an ID, not a string
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProjectData = { name, location, description, country, start_date, company, manager }; // Add more fields as needed
        try {
            const createdProject = await createProject(newProjectData); // Make API call to create project
            navigate(`/project/${createdProject.id}/home`);  // Redirect to the created project page
        } catch (error) {
            console.error("Error creating project:", error);
            setError("Failed to create project. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Create a New Project</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Project Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country ID</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={start_date}
                        onChange={(e) => setStart_date(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Company ID</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Manager ID</label>
                    <input
                        type="text"
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                    />
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;