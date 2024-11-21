// MainWindow.jsx is a component that displays the main window of the application.
// It organizes all the elements, including their children.

import { Outlet, useParams } from 'react-router-dom';
//import { useProject } from '../apiHooks';

import { AppShell, Container, Loader, Button, Text } from '@mantine/core';

import { useContext, useEffect } from 'react';
import { ProjectContext } from './Context/ProjectContext';

import NavigationBar from './NavigationBar';
import MainContent from './MainContent';
import CustomTitleBar from './CustomTitleBar';
import MenuBar from './MenuBar';
import FooterBar from './FooterBar';
import GeoTabs from './Geoprocessing/GeoTabs';
import './Styles/MainWindow.css';
import './Styles/global.css';


const MainWindow = () => {
    const { id } = useParams();
    const { project, fetchProject, isLoading, error } = useContext(ProjectContext);

    // Fetch project data when the component mounts
    useEffect(() => {
        if (id) {
            fetchProject(id);
        }
    }, [id, fetchProject]);
    if (isLoading) return <p>Loading project data...</p>;
    if (error) return <p>Error fetching project data: {error.message}</p>;
    if (!project) return <p>No project data found.</p>;

    return (
        <div className="main-window">
            <CustomTitleBar />
            <MenuBar username="Ansa" />
            <GeoTabs />
            <NavigationBar />

            <MainContent>
                <Outlet />  {/* This will render the currently selected component based on routing */}
            </MainContent>
            <FooterBar status="Autosave Enabled" user="John Doe" notifications="2" />
        </div>
    );
};

export default MainWindow;