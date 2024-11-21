// toolbarStyles.js: Uses the `createStyles` function
// to create a more dynamic approach to styling
import { createStyles } from '@mantine/emotion';

export const useToolbarStyles = createStyles((theme) => ({
    toolbarContainer: {
        border: `3px solid ${theme.colors.gray[6]}`,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[4],  // Light grey body
        padding: 2,
        zIndex: 1,
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
        width: '24px',
        height: '24px',
        padding: 0,
        borderRadius: '50%',        // Make it a circle
        border: `1px solid ${theme.colors.gray[5]}`,
        color: theme.colors.gray[7],
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
