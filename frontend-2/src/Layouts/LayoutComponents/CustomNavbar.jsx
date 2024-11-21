// Custom Navbar component for the layout
import { useState } from 'react';
import { SegmentedControl, Text } from '@mantine/core';
import {
    IconShoppingCart,
    IconLicense,
    IconMessage2,
    IconBellRinging,
    IconMessages,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconUsers,
    IconFileAnalytics,
    IconDatabaseImport,
    IconReceipt2,
    IconReceiptRefund,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useNavbarStyles } from '@/Styles/navbarStyles';

const tabs = {
    account: [
        { link: '', label: 'Notifications', icon: IconBellRinging },
        { link: '', label: 'Billing', icon: IconReceipt2 },
        { link: '', label: 'Security', icon: IconFingerprint },
        { link: '', label: 'SSH Keys', icon: IconKey },
        { link: '', label: 'Databases', icon: IconDatabaseImport },
        { link: '', label: 'Authentication', icon: Icon2fa },
        { link: '', label: 'Other Settings', icon: IconSettings },
    ],
    general: [
        { link: '', label: 'Orders', icon: IconShoppingCart },
        { link: '', label: 'Receipts', icon: IconLicense },
        { link: '', label: 'Reviews', icon: IconMessage2 },
        { link: '', label: 'Messages', icon: IconMessages },
        { link: '', label: 'Customers', icon: IconUsers },
        { link: '', label: 'Refunds', icon: IconReceiptRefund },
        { link: '', label: 'Files', icon: IconFileAnalytics },
    ],
};

const CustomNavbar = () => {
    const { classes } = useNavbarStyles();
    const [section, setSection] = useState('account');
    const [active, setActive] = useState('Billing');

    const links = tabs[section].map((item) => (
        <a
            className={classes.navbarLink}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.navbarLinkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbarMain}>
            <div>
                <Text fw={500} size="sm" className={classes.navbarTitle} color="dimmed" mb="xs">
                    Table of Content
                </Text>

                <SegmentedControl
                    value={section}
                    onChange={setSection}
                    transitionTimingFunction="ease"
                    fullWidth
                    data={[
                        { label: 'Account', value: 'account' },
                        { label: 'System', value: 'general' },
                    ]}
                />
            </div>

            <div className={classes.navbarDiv}>{links}</div>

            <div className={classes.navbarFooter}>
                <a href="#" className={classes.navbarLink} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.navbarLinkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.navbarLink} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.navbarLinkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
};

export default CustomNavbar;
