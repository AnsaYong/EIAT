import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';

const LocationGIS = () => {
    const selectedProject = useSelector((state) => state.projects.selectedProject);
    return (
        <MapContainer center={[selectedProject.latitude, selectedProject.longitude]} zoom={10}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[selectedProject.latitude, selectedProject.longitude]}>
                <Popup>{selectedProject.location}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default LocationGIS;