import { createStyles } from '@mantine/emotion';

export const loadProjectStyles = createStyles((theme) => ({
    projectsContainer: {
        size: "lg",
        padding: "md",
        overlayOpacity: 0.5,
        overlayBlur: 5,
        radius: "md",
        shadow: "md",
        backgroundColor: theme.colors.gray[9],
    },
    menubarItems: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        //height: '100%',
        width: '100%',
        justifyContent: 'space-between',
    },
    menubarItem: {
        fontSize: theme.fontSizes.sm,
        fontWeight: 500, // Slightly bolder for emphasis
        cursor: 'pointer',
        borderRadius: theme.radius.sm,
        padding: '1px 12px', // More padding for a larger clickable area
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: theme.colors.gray[4], // Subtle hover effect
        },
    },
    menuDropdown: {
        backgroundColor: theme.colors.white, // Use white for dropdown for contrast
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
    },
    menubarActions: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.colors.gray[2],
            borderRadius: theme.radius.sm,
        },
    },
    actionText: {
        fontWeight: 500,
        marginLeft: '5px',
    },
}));
