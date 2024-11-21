// ProjectInfo.jsx
// Allows the user to input the project details after the Developer's Site Visit and Information Acquisition.
// The form is submitted to the backend for processing.
// The component is used in the Screening step of the project workflow.
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useProject, useUpdateProject } from '../../apiHooks'; // Import your custom hooks
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl; // Remove default behavior

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to move the map to the given coordinates
const ChangeMapView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.setView(coords, 13); // Zoom in on the provided coordinates
        }
    }, [coords, map]); // Update map view when coords change

    return null;
};

ChangeMapView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const ProjectInfo = () => {
    const { project } = useOutletContext();
    const [coordinates, setCoordinates] = useState(null);
    

    // Load project coordinates on component mount
    useEffect(() => {
        if (project.latitude && project.longitude) {
            setCoordinates([parseFloat(project.latitude), parseFloat(project.longitude)]);
        }
    }, [project]);

    return (
        <div>
            <h3>Map View</h3>
            <MapContainer
                center={coordinates || [51.505, -0.09]} // Default center
                zoom={3} // Zoom out initially
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5zYXlvbmciLCJhIjoiY20xZzVsNjY5MDBoeTJsc2VlaHh2ZDZjbSJ9.lSB8yMOunvpWiHryVjpmFg"
                />
                {/* Move the map to the coordinates */}
                {coordinates && <ChangeMapView coords={coordinates} />}
                {/* Display marker at the coordinates */}
                {coordinates && <Marker position={coordinates} />}
            </MapContainer>
        </div>
    );
};

export default ProjectInfo;