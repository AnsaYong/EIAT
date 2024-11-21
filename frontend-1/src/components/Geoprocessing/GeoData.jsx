// GeoData.jsx - Displays a map using the Leaflet library and a Mapbox tile layer
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';

import { GeoContext } from '../Context/GeoContext';
import { ProjectContext } from '../Context/ProjectContext';
import MapComponent from './MapComponent';
import CoordinatesDialog from './CoordinatesDialog';


const GeoData = () => {
    const { coordinates } = useContext(GeoContext); // Accessing coordinates context
    const { project } = useContext(ProjectContext); // Accessing project context

    const [dialogOpen, setDialogOpen] = useState(false);

    // Get the default coordinates from the project or fallback to a default
    const defaultCoordinates = [-26.505, 23.09]; // Fallback coordinates
    const projectCoords = [
        parseFloat(project.latitude) || defaultCoordinates[0],
        parseFloat(project.longitude) || defaultCoordinates[1]
    ];

    // Use the provided coordinates if valid; otherwise, fallback to project coordinates or default
    const mapCoordinates = coordinates || (project.latitude && project.longitude 
        ? projectCoords 
        : defaultCoordinates);

    return (
        <div>
            <h3>Map View</h3>
            <MapComponent coordinates={mapCoordinates} />
            <Button onClick={() => setDialogOpen(true)}>Enter Coordinates</Button>
            <CoordinatesDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
};

export default GeoData;