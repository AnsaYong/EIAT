// Styles for the App component
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: theme.colors.gray[1],
    },
    box: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        border: `1px solid ${theme.colors.gray[4]}`,
    },
    title: {
        fontSize: theme.fontSizes.lg,
        color: theme.colors.gray[7],
    },
    button: {
        borderColor: theme.colors.gray[5],
        color: theme.colors.gray[7],
        '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
    },
}));
