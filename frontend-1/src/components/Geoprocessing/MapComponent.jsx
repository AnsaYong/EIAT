// MapComponent.jsx - Displays a map using the Leaflet library and a Mapbox tile layer
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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

// Move the map to the given coordinates
const ChangeMapView = ({ coords }) => {
    const map = useMap();
    
    useEffect(() => {
        if (coords) {
            map.setView(coords, 13); // Zoom in on the provided coordinates
        }
    }, [coords, map]);

    return null;
};

ChangeMapView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// MapComponent to encapsulate Map logic
const MapComponent = ({ coordinates }) => {
    return (
        <MapContainer
            center={coordinates}
            zoom={3}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5zYXlvbmciLCJhIjoiY20xZzVsNjY5MDBoeTJsc2VlaHh2ZDZjbSJ9.lSB8yMOunvpWiHryVjpmFg"
            />
            {coordinates && <ChangeMapView coords={coordinates} />}
            {coordinates && <Marker position={coordinates} />}
        </MapContainer>
    );
};

MapComponent.propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapComponent;