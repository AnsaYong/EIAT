// Create a custom layout component that includes a custom navbar and footer
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { AppShell, Box, Paper } from '@mantine/core';
import { Rnd } from 'react-rnd';

// Custom components
import { toolbarsConfig } from './toolbarsConfig';
import { CustomMenuBar } from './LayoutComponents';
import { CustomNavbar } from './LayoutComponents';

// Redux actions
import { closeToolbar, toggleToolbar } from '@/redux/toolbars/actions';
import { setNavbarWidth } from '@/redux/sidebar/actions';

// Custom styles


const CustomLayout = ({ children }) => {
    const dispatch = useDispatch();

    const openToolbars = useSelector((state) => state.toolbars.openToolbars);   // Open toolbars state
    const navbarWidth = useSelector((state) => state.navbar.navbarWidth); // Open navbar width state

    // Toolbar functions
    const handleSelectedToolBar = (toolBarName) => {
        dispatch(toggleToolbar(toolBarName));
    };

    const handleToolbarClose = (toolBarName) => {
        dispatch(closeToolbar(toolBarName));
    };

    const renderToolbars = () =>
        Object.entries(openToolbars).map(([toolBarName, isOpen]) => (
            isOpen && (
                <Rnd key={toolBarName} bounds="window" minWidth={300} minHeight={75} enableResizing={false}>
                    <Paper>
                        {toolbarsConfig[toolBarName] && React.createElement(toolbarsConfig[toolBarName], {
                            onClose: () => handleToolbarClose(toolBarName),
                        })}
                    </Paper>
                </Rnd>
            )
        ));

    // Navbar resizing
    const maxNavbarWidth = 300; // Maximum navbar width

    return (
        <AppShell
            styles={(theme) => ({
                root: {
                    layout: 'alt',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    padding: 'md',
                },
                main: {
                    backgroundColor: theme.colors.gray[1],
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.md,
                    marginLeft: `${navbarWidth}px`, // Dynamic margin based on state
                    transition: 'margin-left 0.1s ease', // Smooth transition
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                    border: `10px solid ${theme.colors.gray[6]}`, // Subtle border
                    marginTop: theme.spacing.xl, // Add margin to the top
                    marginBottom: theme.spacing.xl, // Add margin to the bottom
                    flex: 1, // Fill remaining space
                    overflow: 'hidden', // Prevent overflow in the main section
                    display: 'flex', // Use flexbox
                    flexDirection: 'column', // Ensure children are in column layout
                },
                navbar: {
                    backgroundColor: theme.colors.gray[0],
                    borderRight: `3px solid ${theme.colors.gray[6]}`,
                    marginTop: theme.spacing.xl,
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.md,
                    width: `${navbarWidth}px`, // Set dynamic width based on state
                    height: '100vh', // Full height for consistent layout
                    transition: 'width 0.1s ease', // Smooth transition
                    overflow: 'hidden', // Prevent overflow in the navbar
                },
                header: {
                    backgroundColor: theme.colors.gray[3],
                    height: theme.spacing.xl,
                    borderBottom: `1px solid ${theme.colors.gray[6]}`,
                    flexShrink: 0,
                    overflow: 'hidden',
                },
                footer: {
                    height: theme.spacing.xl,
                    borderTop: `2px solid ${theme.colors.gray[3]}`,
                    marginLeft: `${navbarWidth}px`, // Set dynamic margin for footer
                    transition: 'margin-left 0.1s ease', // Smooth transition
                    overflow: 'hidden', // Prevent overflow in the footer
                },
            })}
        >
            <AppShell.Header>
                <CustomMenuBar onSelectToolBar={handleSelectedToolBar} />
            </AppShell.Header>

            <AppShell.Navbar
                style={{
                    width: `${navbarWidth}px`,
                }}
            >
                {/* Resize handle (you can customize this) */}
                <div
                    style={{
                        cursor: 'ew-resize',
                        width: '10px',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        background: 'transparent',
                    }}
                    onMouseDown={(e) => {
                        const startX = e.clientX;
                        const startWidth = navbarWidth;

                        const handleMouseMove = (moveEvent) => {
                            const newWidth = Math.max(startWidth + moveEvent.clientX - startX, 100); // Minimum width
                            // Set the new width but ensure it doesn't exceed max width
                            dispatch(setNavbarWidth(Math.min(newWidth, maxNavbarWidth)));
                        };

                        const handleMouseUp = () => {
                            window.removeEventListener('mousemove', handleMouseMove);
                            window.removeEventListener('mouseup', handleMouseUp);
                        };

                        window.addEventListener('mousemove', handleMouseMove);
                        window.addEventListener('mouseup', handleMouseUp);
                    }}
                />
                <CustomNavbar />
            </AppShell.Navbar>

            <AppShell.Main>
                <div>{renderToolbars()}</div>
                <Box>{children}</Box>
            </AppShell.Main>

            <AppShell.Footer>Footer content</AppShell.Footer>
        </AppShell>
    );
};

CustomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomLayout;
