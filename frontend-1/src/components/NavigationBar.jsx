// NavigationBar.jsx - Renders the navigation bar for the project
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ProjectContext } from './Context/ProjectContext';

import './Styles/NavigationBar.css';

const NavigationBar = () => {
    const { project } = useContext(ProjectContext);
    const steps = [
        { title: "Screening", link: "/project/:id/screening" },
        { title: "Scoping", link: "/project/:id/scoping" },
        { title: "Baseline Assessment", link: "/project/:id/baseline-assessment" },
        { title: "Impact Assessment", link: "/project/:id/impact-assessment" },
        { title: "Mitigation & Risk Management", link: "/project/:id/mitigation-risk-management" },
        { title: "Public Consultation", link: "/project/:id/public-consultation" },
        { title: "Environmental Impact Statement", link: "/project/:id/environmental-impact-statement" },
        { title: "Review of EIA", link: "/project/:id/review-of-eia" },
        { title: "Decision Making", link: "/project/:id/decision-making" },
        { title: "Environmental Management Plan", link: "/project/:id/environmental-management-plan" },
        { title: "Monitoring & Compliane", link: "/project/:id/monitoring-compliance" },
        { title: "Decommissionaing & Rehabilitation", link: "/project/:id/decommissioning-rehabilitation" },
        
        ];


    return (
        <div className="navigation-bar">
            {/* Project Homepage Link */}
            <div className="nav-item">
                <div className="nav-title">
                    <Link 
                        to={`/project/${project.id}/home`} 
                        className="home-link"
                    >
                        Project Home
                    </Link>
                </div>
            </div>
            
            {/* Main steps */}
            {steps.map((step, index) => (
                <div key={index} className="nav-item">
                    <Link 
                        to={step.link.replace(':id', project.id)}
                        className="nav-title"
                    >
                        {step.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default NavigationBar;
