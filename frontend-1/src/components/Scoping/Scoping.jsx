// Scoping.jsx

import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const Scoping = () => {
    const { id } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('/project/${id}/scoping/overview');

    const tabs = [
        { name: 'Scoping Overview', link: `/project/${id}/scoping/overview` },
        { name: 'Scoping Plan', link: `/project/${id}/scoping/scoping-plan` },
        { name: 'Scoping Results', link: `/project/${id}/scoping/scoping-results` },
        { name: 'Stakeholder Consultation', link: `/project/${id}/scoping/stakeholder-consultation` },
        { name: 'Key Impacts', link: `/project/${id}/scoping/key-impacts` },
        { name: 'Alternatives', link: `/project/${id}/scoping/alternatives` },
        { name: 'Terms of Reference', link: `/project/${id}/scoping/terms-of-reference` },
    ];

    // Update activeTab when location changes
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    return (
        <div className="scoping">
            {/* Tabs for substeps */}
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <Link 
                        key={index} 
                        to={tab.link}
                        className={`tab-item ${activeTab === tab.link ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.link)}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>

            {/* Content of the selected substep */}
            <div className="scoping-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Scoping;
