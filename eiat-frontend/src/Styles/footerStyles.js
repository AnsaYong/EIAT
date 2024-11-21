import { createStyles } from '@mantine/emotion';

export const useFooterStyles = createStyles((theme, footerHeight) => ({
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${footerHeight}px`,
        backgroundColor: theme.colors.gray[2],
        display: 'flex',
        padding: `0 ${theme.spacing.md}px`,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `1px solid ${theme.colors.gray[4]}`,
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
    },
    footerSection: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    footerDivider: {
        color: theme.colors.gray[9],
        margin: `0 ${theme.spacing.sm}px`,
    },
    footerHighlight: {
        fontWeight: 600,
        color: theme.colors.blue[7],
    },
    footerStatusOnline: {
        color: theme.colors.green[7],
    },
    footerStatusOffline: {
        color: theme.colors.red[7],
    },
}));
