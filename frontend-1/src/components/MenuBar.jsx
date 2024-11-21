// MenuBar.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import MenuWithDropdown from './MenuWithDropdown';
import CoordinatesDialog from './Geoprocessing/CoordinatesDialog';
//import ShapefileDialog from './Dialogs/ShapefileDialog';  // Assuming this exists
//import ImportDialog from './Dialogs/ImportDialog';        // Assuming this exists
//import ExportDialog from './Dialogs/ExportDialog';        // Assuming this exists
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Styles/MenuBar.css';

const MenuBar = ({ username }) => {
    // State to manage which dialog is open
    const [activeDialog, setActiveDialog] = useState(null);

    // Close the active dialog
    const handleDialogClose = () => {
        setActiveDialog(null);  // Close any active dialog by resetting the state
    };

    // Menu items with actions for opening dialogs
    const menuItems = [
        {
            label: 'File',
            subMenu: [
                { label: 'Save', action: () => console.log('Save clicked') },
            ],
        },
        {
            label: 'Add',
            subMenu: [
                { label: 'Coordinates', action: () => setActiveDialog('coordinates') },  // Open Coordinates dialog
                { label: 'Shapefile', action: () => setActiveDialog('shapefile') },  // Open Shapefile dialog
            ],
        },
        { label: 'Import', action: () => setActiveDialog('import') },  // Open Import dialog
        { label: 'Export', action: () => setActiveDialog('export') },  // Open Export dialog
        { label: 'Generate Report', action: () => console.log('Generate Report clicked') },
    ];

    return (
        <div className="menu-container">
            <div className="menu-bar">
                {menuItems.map((menuItem, index) => (
                    <MenuWithDropdown
                        key={index}
                        menuItem={menuItem}
                    />
                ))}
            </div>

            {/* Dialog Components */}
            <CoordinatesDialog open={activeDialog === 'coordinates'} onClose={handleDialogClose} />

            {/* Add more dialog components similar to CoordinatesDialog */}

            {/* User Settings */}
            <div className="user-settings">
                <IconButton onClick={() => window.location.href = '/settings'}>
                    <SettingsIcon className="settings-icon" />
                </IconButton>

                <IconButton>
                    <Avatar alt={username} src="" /> {/* Placeholder for avatar */}
                    <ExpandMoreIcon className="dropdown-arrow" />
                </IconButton>
            </div>
        </div>
    );
};

MenuBar.propTypes = {
    username: PropTypes.string.isRequired,
};

export default MenuBar;
