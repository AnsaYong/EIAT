// Screening.jsx

import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams, useOutletContext } from 'react-router-dom';

const Screening = () => {
    const { id } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('/project/${id}/screening/overview');
    const [userInput, setUserInput] = useState({ /* Initialize necessary state */ });

    const project = useOutletContext(); // Get project data from parent component

    const tabs = [
        { name: 'Screening Overview', link: `/project/${id}/screening/overview` },
        { name: 'Regulations', link: `/project/${id}/screening/regulations` },
        { name: 'Project Information', link: `/project/${id}/screening/project-info` },
        { name: 'Environmental Sensitivity', link: `/project/${id}/screening/environmental-sensitivity` },
        { name: 'Triggered Activities', link: `/project/${id}/screening/triggered-activities` },
        { name: 'Impact Prediction', link: `/project/${id}/impact-prediction` },
        { name: 'Competent Authority', link: `/project/${id}/screening/competent-authority` },
        { name: 'Screening Decision', link: `/project/${id}/screening/screening-decision` },
    ];

    // Update activeTab when location changes
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    // Function to check if a tab is accessible
    const isTabAccessible = (tab) => {
        return !tab.requiresInput || (tab.requiresInput && userInput.someCondition); // Define condition based on user input
    };

    return (
        <div className="screening">
            {/* Tabs for substeps */}
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <Link 
                        key={index} 
                        to={tab.link}
                        className={`tab-item ${activeTab === tab.link ? 'active' : ''}`}
                        onClick={(e) => {
                            if (!isTabAccessible(tab)) {
                                e.preventDefault(); // Prevent navigation if not accessible
                                alert('Please provide necessary information to access this tab.');
                            } else {
                                setActiveTab(tab.link);
                            }
                        }}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>

            {/* Content of the selected substep */}
            <div className="screening-content">
                <Outlet context={{ userInput, setUserInput, project }} />  {/* Pass user input state to child components */}
            </div>
        </div>
    );
};

export default Screening;
