//Navbar styles
import { createStyles } from '@mantine/emotion';
import { rem } from '@mantine/core';

export const useNavbarStyles = createStyles((theme) => ({
    navbarMain: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        height: rem(640),
        width: rem(300),
        padding: theme.spacing.md,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
    navbarDiv: {
        flex: 1,
        marginTop: theme.spacing.xl,
    },
    navbarTitle: {
        letterSpacing: rem(-0.25),
    },
    navbarLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
            '& .navbarLinkIcon': {
                color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
            },
        },
        '&[data-active]': {
            '&, &:hover': {
                backgroundColor: theme.colors.blue[1],
                color: theme.colors.blue[7],
                '& .navbarLinkIcon': {
                    color: theme.colors.blue[7],
                },
            },
        },
    },
    navbarLinkIcon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
        width: rem(25),
        height: rem(25),
    },
    navbarFooter: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        paddingTop: theme.spacing.md,
    },
}));