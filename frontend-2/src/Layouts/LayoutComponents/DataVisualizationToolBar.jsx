// Data Visualization toolbar: Provides a list of tools for data visualization
// Wraps tools in a Group for Horizontal Alignment
import { Group, Button, Text } from '@mantine/core';
import PropTypes from 'prop-types';

// Custom styles
import { useToolbarStyles } from '@/Styles/toolbarStyles';


const DataVisualizationToolBar = ({ onClose }) => {
    const { classes } = useToolbarStyles();

    return (
        <div className={classes.toolbarContainer}>
            <div className={classes.toolbarTitle}>
                <Group className={classes.toolbarTitleGroup}>
                    Data Visualization Toolbar
                    <Button onClick={onClose} className={classes.closeButton}>X</Button>
                </Group>
            </div>

            <Group className={classes.toolbarContent}>
                <Text>Data Visualization Tools</Text>
            </Group>
        </div>
    );
};

DataVisualizationToolBar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default DataVisualizationToolBar;