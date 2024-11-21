// Default layout for the application
import React, { useState, useMemo, lazy, Suspense, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useThrottledCallback } from 'use-debounce';

// Mantine components
import { AppShell } from '@mantine/core';

// Lazy loaded EIA Step components
const Information = lazy(() => import('@/components/Steps/Information/Information'))
const Screening = lazy(() => import('@/components/Steps/Screening/Screening'));
const Scoping = lazy(() => import('@/components/Steps/Scoping/Scoping'));
const Mapping = lazy(() => import('@/components/Steps/Maps/MapView'));
//import ImpactAssessment from '@/Components/ImpactAssessment/ImpactAssessment'; // Import other step components
//import Mitigation from '@/Components/Mitigation/Mitigation'; // Import other step components
//import Reporting from '@/Components/Reporting/Reporting'; // Import other step components
//import Review from '@/Components/Review/Review'; // Import other step components
//import DecisionMaking from '@/Components/DecisionMaking/DecisionMaking'; // Import other step components
//import Monitoring from '@/Components/Monitoring/Monitoring'; // Import other step components

// Layout components and error handling
import { CustomMenuBar, SidebarIcon, CustomNavBar, MainContent, CustomFooter } from './LayoutComponents';
import { Toolbars } from '@/utils/layoutUtils';
import LoadProjectModal from '@/components/Modals/LoadProjectModal';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

// Redux actions
import { closeToolbar, toggleToolbar } from '@/redux/toolbars/toolbarsSlice';
import { setActiveStep } from '@/redux/steps/stepsSlice';

// Import styles
import { theme } from '@/Styles/main.theme';
import { layoutStyles } from '@/Styles/layoutStyles';

// Utils
import { useResizer } from '@/hooks/resizableHooks';
import { useResizerContext } from '@/hooks/ResizerContext';

// Constants
const HEADER_HEIGHT = 30;
const FOOTER_HEIGHT = 25;
const SIDEBAR_WIDTH = 60;
const NAVBAR_MIN_WIDTH = 200;
const NAVBAR_MAX_WIDTH = 400;
const ASIDE_MIN_WIDTH = 100;
const ASIDE_MAX_WIDTH = 300;


export const DefaultLayout = () => {
    const dispatch = useDispatch();

    // State management
    const openToolbars = useSelector(state => state.toolbars.openToolbars); // State to manage open toolbars
    const activeStep = useSelector(state => state.steps.activeStep); // State to manage the active step

    // Dispatch actions
    const handleSelectedToolBar = useCallback(
        (toolBarName) => dispatch(toggleToolbar(toolBarName)),
        [dispatch]
    );
    const handleToolbarClose = useCallback(
        (toolBarName) => dispatch(closeToolbar(toolBarName)),
        [dispatch]
    );
    const handleStepChange = useCallback(
        (step) => dispatch(setActiveStep(step)),
        [dispatch]
    );

    console.log('Active Step From DefaultLayout:', activeStep);

    // Retrieve width states from ResizerContext
    //const { navbarWidth, asideWidth } = useResizerContext();
    //const handleNavbarMouseDown = useResizer(NAVBAR_MIN_WIDTH, NAVBAR_MAX_WIDTH, 'navbar');
    //const handleAsideMouseDown = useResizer(ASIDE_MIN_WIDTH, ASIDE_MAX_WIDTH, 'aside');

    const [navbarWidth, setNavbarWidth] = useState(NAVBAR_MIN_WIDTH);
    const [asideWidth, setAsideWidth] = useState(ASIDE_MIN_WIDTH);

    // Throttled resize handlers
    const throttledSetNavbarWidth = useThrottledCallback(setNavbarWidth, 100);
    const throttledSetAsideWidth = useThrottledCallback(setAsideWidth, 100);

    // Resize functions
    const handleNavbarResize = useCallback((e) => {
        const newWidth = Math.min(Math.max(e.clientX - SIDEBAR_WIDTH, NAVBAR_MIN_WIDTH), NAVBAR_MAX_WIDTH);
        throttledSetNavbarWidth(newWidth);
    }, [throttledSetNavbarWidth]);

    const handleAsideResize = useCallback((e) => {
        const newWidth = Math.min(Math.max(window.innerWidth - e.clientX, ASIDE_MIN_WIDTH), ASIDE_MAX_WIDTH);
        throttledSetAsideWidth(newWidth);
    }, [throttledSetAsideWidth]);

    const handleMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', handleNavbarResize);
        window.removeEventListener('mousemove', handleAsideResize);
        window.removeEventListener('mouseup', handleMouseUp);
    }, [handleNavbarResize, handleAsideResize]);

    const handleMouseDown = (resizeFn) => {
        window.addEventListener('mousemove', resizeFn);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // Memoized styles based on theme
    const styles = useMemo(() => ({
        sidebar: layoutStyles(theme).sidebar(HEADER_HEIGHT, SIDEBAR_WIDTH),
        navbar: layoutStyles(theme).navbar(SIDEBAR_WIDTH, navbarWidth),
        resizeHandle: layoutStyles(theme).resizeHandle,
        main: layoutStyles(theme).main(HEADER_HEIGHT, FOOTER_HEIGHT, SIDEBAR_WIDTH, navbarWidth, asideWidth),
        footer: layoutStyles(theme).footer(FOOTER_HEIGHT),
        aside: layoutStyles(theme).aside(asideWidth),
        resizeAsideHandle: layoutStyles(theme).resizeAsideHandle,
    }), [navbarWidth, asideWidth]);

    // Function to render content based on the active step
    const renderContent = () => {
        switch (activeStep) {
            case 'Information':
                return (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading..</div>}>
                            <Information />
                        </Suspense>
                    </ErrorBoundary>
                );
            case 'Screening':
                return (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading..</div>}>
                            <Screening />
                        </Suspense>
                    </ErrorBoundary>
                );
            case 'Scoping':
                return (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading..</div>}>
                            <Scoping />
                        </Suspense>
                    </ErrorBoundary>
                );
            case 'Mapping and Visualization':
                return (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading..</div>}>
                            <Mapping />
                        </Suspense>
                    </ErrorBoundary>
                );
            default:
                return <MainContent />; // Replace this with the Information/Home component
        }
    };

    return (
        <AppShell
            header={{ height: HEADER_HEIGHT }}
            footer={{ height: FOOTER_HEIGHT }}
            aside={{ width: asideWidth }}
            padding="md"
            styles={() => styles}
        >
            <AppShell.Header>
                <CustomMenuBar onSelectToolBar={handleSelectedToolBar} />
                <LoadProjectModal />
            </AppShell.Header>

            <div style={styles.sidebar}>
                <SidebarIcon setActiveStep={handleStepChange} />
            </div>

            <AppShell.Navbar p="md" style={styles.navbar}>
                <CustomNavBar />
                <div
                    style={styles.resizeHandle}
                    //onMouseDown={handleNavbarMouseDown}
                    onMouseDown={() => handleMouseDown(handleNavbarResize)}
                    role="separator"
                    aria-label="Resize Navbar"
                    tabIndex={0}
                />
            </AppShell.Navbar>

            <AppShell.Main style={styles.main}>
                {renderContent()}
            </AppShell.Main>

            <AppShell.Aside p="md" style={styles.aside}>
                Aside Content
                <div
                    style={styles.resizeAsideHandle}
                    //onMouseDown={handleAsideMouseDown}
                    role="separator"
                    aria-label='Resize Navbar'
                />
            </AppShell.Aside>

            <AppShell.Footer p="md" style={styles.footer}>
                <CustomFooter footerHeight={FOOTER_HEIGHT} />
            </AppShell.Footer>

            <Toolbars openToolbars={openToolbars} handleToolbarClose={handleToolbarClose} />
        </AppShell>
    );
};

export default React.memo(DefaultLayout);
