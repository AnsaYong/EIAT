import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';


const GeoTabs = () => {
    const { id } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(`/project/${id}/geoprocessing/project-info`);

    const tabs = [
        { name: 'Spatial Data', link: `/project/${id}/geo-data` },
        { name: 'Spatial Analysis', link: `/project/${id}/geo-data/""` },
        { name: 'Buffer Analysis', link: `/project/${id}/geo-data/""` },
    ];

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    return (
        <div className="geoprocessing-tabs">
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
        </div>
    );
};

export default GeoTabs;
