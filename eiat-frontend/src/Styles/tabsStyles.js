// tabsStyles.js
import { createStyles } from '@mantine/emotion';


export const useTabsStyles = createStyles((theme) => ({
    tabList: {
        marginTop: 2,
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: 1,
        //borderBottom: `1px solid ${theme.colors.gray[4]}`,
        fontSize: '14px',
    },
    tabItem: {
        whiteSpace: 'nowrap',
        padding: '5px 5px',
        color: theme.colors.gray[7],
        fontWeight: 600,
        '&:hover': {
            backgroundColor: theme.colors.gray[2],
        },
    },
    activeTab: {
        backgroundColor: theme.colors.gray[4],
        color: theme.black,
        fontWeight: 'bold',
    },
}));
