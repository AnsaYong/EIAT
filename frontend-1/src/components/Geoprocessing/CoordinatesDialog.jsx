// CoordinatesDialog.jsx
import { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GeoContext } from '../Context/GeoContext';

const CoordinatesDialog = ({ open, onClose }) => {
    const { updateCoordinates } = useContext(GeoContext);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // Ref for the first input field (Latitude)
    const latitudeInputRef = useRef(null);
    
    // Manage focus when the dialog opens/closes
    useEffect(() => {
        if (open && latitudeInputRef.current) {
            latitudeInputRef.current.focus(); // Focus on Latitude input when dialog opens
        }
    }, [open]);

    const handleSave = () => {
        updateCoordinates(parseFloat(latitude), parseFloat(longitude));
        onClose(); // Close the dialog after saving
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Add Coordinates</DialogTitle>
            <DialogContent>
                <TextField
                    label="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    fullWidth
                    margin="dense"
                    inputRef={latitudeInputRef}  // Assign the ref to Latitude input
                />
                <TextField
                    label="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CoordinatesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CoordinatesDialog;