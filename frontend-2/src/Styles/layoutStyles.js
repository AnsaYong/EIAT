// layoutStyles.js
import { createStyles } from '@mantine/emotion';

export const useLayoutStyles = createStyles((theme) => ({
    layoutContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    layoutMain: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
    }
}));
