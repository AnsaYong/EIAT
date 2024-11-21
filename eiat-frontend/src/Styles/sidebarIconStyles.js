// sidebarIconStyles.js
import { createStyles } from '@mantine/emotion';

export const useSidebarStyles = createStyles((theme) => ({
    sidebarContainer: {
        cursor: 'pointer',
        //borderWidth: '2px 6px 0px 2px',
    },
    iconWrapper: {
        margin: '10px 0',
        padding: '5px',
        borderRadius: '9px',
        backgroundColor: theme.colors.gray[1],
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: theme.colors.gray[4],
        },
    },
    activeIcon: {
        backgroundColor: theme.colors.gray[5],
        boxShadow: '0 4px 8px rgba(0, 50, 136, 0.2)',
        transform: 'scale(1.05)',
    },
    inactiveIcon: {
        backgroundColor: theme.colors.gray[3],
        transform: 'scale(1)',
    },
    icon: {
        fontSize: theme.fontSizes.lg,
        color: theme.colors.gray[8],
        padding: '5px',
    },
    activeIconColor: {
        color: theme.colors.gray[9],
    },
}));
