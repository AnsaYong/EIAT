// Handles the sidebar icons (representing the EIA steps) and its functionality
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tooltip, Paper } from '@mantine/core';
import {
    IconFilter,
    IconTarget,
    IconFileText,
    IconShieldCheck,
    IconReport,
    IconCircleCheck,
    IconGavel,
    IconGraph,
    IconHomeFilled,
    IconMap2,
} from '@tabler/icons-react';

// Styles
import { useSidebarStyles } from '@/Styles/sidebarIconStyles';


const SidebarIcon = ({ setActiveStep }) => {
    const { classes, cx } = useSidebarStyles();
    const activeStep = useSelector((state) => state.steps.activeStep);

    // Handling click events
    const handleIconClick = (step) => {
        console.log(`${step} Icon clicked`);
        setActiveStep(step);
        console.log('Active Step From Sidebar:', step);
    };

    // Configuration for icons and steps
    const iconsConfig = useMemo(() => [
        { icon: <IconHomeFilled />, label: 'Information', step: 'Information' },
        { icon: <IconFilter />, label: 'Screening', step: 'Screening' },
        { icon: <IconTarget />, label: 'Scoping', step: 'Scoping' },
        { icon: <IconFileText />, label: 'Impact Assessment', step: 'Impact Assessment' },
        { icon: <IconShieldCheck />, label: 'Mitigation', step: 'Mitigation' },
        { icon: <IconReport />, label: 'Reporting', step: 'Reporting' },
        { icon: <IconCircleCheck />, label: 'Review', step: 'Review' },
        { icon: <IconGavel />, label: 'Decision-making', step: 'Decision-making' },
        { icon: <IconGraph />, label: 'Monitoring and Compliance', step: 'Monitoring and Compliance' },
        { icon: <IconMap2 />, label: 'Mapping-Visualization', step: 'Mapping and Visualization' },
    ], []);

    return (
        <Paper className={classes.sidebarContainer}>
            {iconsConfig.map(({ icon, label, step }) => (
                <Tooltip key={step} label={label} position="right" withArrow>
                    <div 
                        onClick={() => handleIconClick(step)}
                        className={cx(
                            classes.iconWrapper,
                            { [classes.activeIcon]: activeStep === step },
                            { [classes.inactiveIcon]: activeStep !== step }
                        )}
                    >
                        <div className={cx(classes.icon, { [classes.activeIconColor]: activeStep === step })}>
                            {icon}
                        </div>
                    </div>
                </Tooltip>
            ))}
        </Paper>
    );
};

SidebarIcon.propTypes = {
    setActiveStep: PropTypes.func.isRequired,
};

export default SidebarIcon;