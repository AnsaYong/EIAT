// menubarStyles.js
import { createStyles } from '@mantine/emotion';

export const useMenubarStyles = createStyles((theme) => ({
    menubarContainer: {
        height: '100%',
        margin: '0 15px',
        cursor: 'pointer',
    },
    menubarItems: {
        height: '100%',
    },
    menubarList: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    menubarActions: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
}));