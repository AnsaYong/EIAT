// menubarStyles.js: Uses the `createStyles` function
// to create a more dynamic approach to styling
import { createStyles } from '@mantine/emotion';

export const useMenubarStyles = createStyles((theme) => ({
    menubarContainer: {
        height: '100%',
        backgroundColor: theme.colors.gray[3], // Lighter background for a professional look
        borderBottom: `1px solid ${theme.colors.gray[6]}`,
        padding: '0 10px',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
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
