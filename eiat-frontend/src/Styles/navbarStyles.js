// navbarStyles.js
import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
    navbarContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.gray[2],
        borderStyle: 'solid',
        borderColor: theme.colors.gray[3],
        borderWidth: '2px 6px 0px 2px',  // top, right, bottom, left
        borderRadius: theme.radius.xs,
        boxShadow: `inset 0px 2px 4px ${theme.colors.gray[6]}, 0px 2px 4px ${theme.colors.gray[6]}`, // Inner shadow for "sunken" effect
        padding: `1px`,
        height: '100%',
    },
    titleWrapper: {
        backgroundColor: theme.colors.gray[5],
        padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
        borderBottom: `1px solid ${theme.colors.gray[6]}`,
        borderTopRightRadius: theme.radius.lg,
        position: 'sticky',
        top: 0,
    },
    navbarTitle: {
        fontSize: theme.fontSizes.sm,
        fontWeight: 600,
        color: theme.colors.gray[8],
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'sticky',
        left: 0,
    },
    tabsWrapper: {
        backgroundColor: theme.colors.gray[0],
        
        //boxShadow: `inset 0 1px 3px ${theme.colors.gray[4]}`, // Soft inner shadow for depth
        padding: theme.spacing.xs,
    },
    collapseSection: {
        marginTop: theme.spacing.lg,
    },
    collapseButton: {
        fontSize: theme.fontSizes.sm,
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        backgroundColor: theme.colors.gray[2],
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: theme.radius.md,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: theme.shadows.sm,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        '&:hover': {
            backgroundColor: theme.colors.gray[8],
            boxShadow: theme.shadows.md,
        },
    },
    collapseButtonOpen: {
        backgroundColor: theme.colors.gray[6],
        '&::after': {
            content: '"▲"',
            marginLeft: '10px',
        },
    },
    collapseButtonClosed: {
        backgroundColor: theme.colors.gray[4],
        '&::after': {
            content: '"▼"',
            marginLeft: '10px',
        },
    },
    collapseContent: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.gray[1],
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: theme.radius.sm,
    },
    scrollArea: {
        flex: 1,
        overflow: 'auto',
    },
}));
