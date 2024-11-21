// GeoContext.jsx - Manages coordinates globally: stores and updates the coordinates
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GeoContext = createContext();

export const GeoProvider = ({ children }) => {
    const [coordinates, setCoordinates] = useState(null);

    const updateCoordinates = (lat, lng) => {
        setCoordinates([lat, lng]);
    };

    return (
        <GeoContext.Provider value={{ coordinates, updateCoordinates }}>
            {children}
        </GeoContext.Provider>
    );
};

GeoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
