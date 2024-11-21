// layoutStyles.js: This approach that does not use the more dynamic `createStyles` function
// is used to create a more static approach which allows the use of functions
export const layoutStyles = (theme) => ({
    main: (headerHeight, footerHeight, sidebarWidth, navbarWidth, asideWidth) => ({
        position: 'fixed',
        top: `${headerHeight + 2}px`,
        minHeight: `calc(100vh - ${headerHeight + footerHeight + 2}px)`,
        left: `${sidebarWidth + navbarWidth}px`,
        right: `${asideWidth}px`,
        //marginLeft: `${navbarWidth}px`,
        border: `1px solid ${theme.colors.gray[6]}`,
        borderTop: `1px solid ${theme.colors.gray[6]}`, 
        paddingLeft: theme.spacing.sm,
        display: 'flex',    // Main area allows flexbox behavior
        flexDirection: 'column',
    }),
    navbar: (sidebarWidth, navbarWidth) => ({
        width: `${navbarWidth}px`,
        marginLeft: `${sidebarWidth}px`,
        marginRight: `${sidebarWidth}px`,
        backgroundColor: theme.colors.gray[3], // Distinct background for navbar
        //borderRight: `1px solid ${theme.colors.gray[6]}`,
        borderBottom: `1px solid ${theme.colors.gray[6]}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1, // Ensures it sits above the main content area
    }),
    footer: (footerHeight) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${footerHeight}px`,
        backgroundColor: theme.colors.gray[2],
        display: 'flex',
        padding: `0 ${theme.spacing.md}px`,  // Horizontal padding for content alignment
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `2px solid ${theme.colors.gray[4]}`,  // Subtle border on top
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
    }),
    sidebar: (headerHeight, sidebarWidth) => ({
        position: 'fixed',
        top: `${headerHeight + 2}px`,
        left: 0,
        height: `calc(97vh - ${headerHeight}px)`,
        width: `${sidebarWidth}px`,
        backgroundColor: theme.colors.gray[0],
        borderTop: `1px solid ${theme.colors.gray[6]}`,  // Subtle border on top
        borderRight: `1px solid ${theme.colors.gray[6]}`,
        borderBottom: `1px solid ${theme.colors.gray[6]}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        //padding: '10px 0',  // TODO: change this to use spacing in theme for consistency througout the app
        zIndex: 1,
    }),
    aside: (asideWidth) => ({
        width: `${asideWidth}px`,
        backgroundColor: theme.colors.gray[1],
    }),
    resizeHandle: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '4px', // Narrow gap for subtle look
        height: '100%',
        cursor: 'col-resize',
        backgroundColor: 'transparent', // Transparent initially
        transition: 'background-color 0.2s ease, width 0.2s ease',
        zIndex: 2,
        '&:hover': {
            width: '8px', // Thicker on hover for easier interaction
            backgroundColor: theme.colors.gray[5], // Color on hover for visibility
        },
    },
    resizeAsideHandle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '20px',
        height: '100%',
        cursor: 'col-resize',
        backgroundColor: 'grey',
        zIndex: 2,
    },
    mainContent: {
    },
});