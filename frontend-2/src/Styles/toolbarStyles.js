// toolbarStyles.js
import { createStyles } from '@mantine/emotion';

export const useToolbarStyles = createStyles((theme) => ({
    toolbarContainer: {
        border: `3px solid ${theme.colors.gray[6]}`,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[4],  // Light grey body
        padding: 2,
    },
    toolbarTitle: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],  // Text
        padding: 1,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        borderRadius: theme.radius.md,
    },
    toolbarTitleGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
    },
    toolbarContent: {
        padding: 2,
        display: 'flex',
        gap: '10px',
    },
    closeButton: {
        width: '24px',              // Set the width
        height: '24px',             // Set the height to make it a square
        padding: 0,                 // Remove padding for perfect centering
        borderRadius: '50%',        // Make it a circle
        border: `1px solid ${theme.colors.gray[5]}`,  // Outline for the button
        color: theme.colors.gray[7],  // Color for "X"
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
    },
    transparentPaper: {
        backgroundColor: 'transparent',
    },
}));
