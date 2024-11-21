// CustomFooter.jsx: A custom footer to display dynamic information
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, Group, Divider } from '@mantine/core';

// Styles
import { useFooterStyles } from '@/Styles/footerStyles';


const CustomFooter = ({ footerHeight }) => {
    const { classes } = useFooterStyles(footerHeight);

    const activeStep = useSelector((state) => state.steps.activeStep);
    const status = useSelector((state) => state.steps.status);
    //const coordinates = useSelector((state) => state.map.coordinates);
    //const isMapView = useSelector((state) => state.map.isMapView);


    return (
        <div className={classes.footer}>
            <Group className={classes.footerSection}>
                <Text className={classes.footerHighlight}>Current step:</Text>
                <Text>{activeStep}</Text>
            </Group>

            <Divider orientation="vertical" className={classes.footerDivider} />

            <Group className={classes.footerSection}>
                <Text>Footer Section</Text>
            </Group>

            <Divider orientation="vertical" className={classes.footerDivider} />

            <Group className={classes.footerSection}>
                <Text>Status:</Text>
                <Text className={status === 'online' ? classes.footerStatusOnline : classes.footerStatusOffline}>
                    {status === 'online' ? '🟢 Online' : '🔴 Offline'}
                </Text>
            </Group>

            {/* Conditionally render coordinates if in map view */}
            {/*{isMapView && (
                <>
                    <Divider orientation="vertical" style={styles.footerDivider} />
                    <Group style={styles.footerSection}>
                        <Text className="footerHighlight">Coordinates:</Text>
                        <Text>{coordinates.latitude.toFixed(5)}, {coordinates.longitude.toFixed(5)}</Text>
                    </Group>
                </>
            )}*/}
        </div>
    );
};

CustomFooter.propTypes = {
    footerHeight: PropTypes.number.isRequired,
};

export default CustomFooter;
