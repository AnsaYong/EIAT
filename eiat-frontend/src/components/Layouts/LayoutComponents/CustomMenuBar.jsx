// Menu bar component with custom menu items and user actions
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Text, Group, ActionIcon } from '@mantine/core';
import PropTypes from 'prop-types';
import { IconChevronRight, IconUser, IconSettings, IconLogout } from '@tabler/icons-react';

// Custom styles
import { useMenubarStyles } from '@/Styles/menubarStyles';

// Menu items
import { menuData } from './menuItemsData';

// State management
import { openLoadProjectModal } from '@/redux/modals/modalSlice';


const CustomMenuBar = ({ onSelectToolBar }) => {
    const { classes } = useMenubarStyles();
    const [openMenu, setOpenMenu] = useState(null); // For actions specific to this component
    const dispatch = useDispatch(); // For external actions required in this component

    const handleMenuHover = (menuLabel) => {
        // Open menu on hover if any menu is open
        if (openMenu) {
            setOpenMenu(menuLabel);
        }
    };

    const handleMenuClick = (menuLabel) => {
        // Close menu on click if any menu is open, Open menu otherwise
        setOpenMenu(openMenu === menuLabel ? null : menuLabel);
    };

    const handleMenuItemClick = (item) => {
        if (item.command === 'loadProject') {
            console.log('Opening Load Project Modal');
            dispatch(openLoadProjectModal());
        }
        if (item.command) {
            console.log(`Command: ${item.command}`);
        } else if (item.toolbar) {
            onSelectToolBar(item.toolbar);
        }
    };

    const renderSubMenu = useMemo(() => (items) => {
        return items.map((item, subIndex) => (
            item.divider ? (
                <Menu.Divider key={subIndex} />
            ) : item.subMenu ? (
                <Menu.Item key={item.label + subIndex} rightSection={<IconChevronRight size={14} />}>
                    <Menu trigger="hover" openDelay={100} closeDelay={100}>
                        <Menu.Target>
                            <Text>{item.label}</Text>
                        </Menu.Target>
                        <Menu.Dropdown className={classes.menuDropdown}>
                            {renderSubMenu(item.subMenu)}
                        </Menu.Dropdown>
                    </Menu>
                </Menu.Item>
            ) : (
                <Menu.Item key={item.label + subIndex} onClick={() => handleMenuItemClick(item)}>
                    {item.label}
                </Menu.Item>
            )
        ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu]);

    return (
        <header className={classes.menubarContainer}>
            <Group justify="space-between" align="center" className={classes.menubarItems}>
                <Group gap={5}>
                    {menuData.map((menu) => (
                        <Menu
                            key={menu.label}
                            trigger={openMenu ? 'hover' : 'click'}
                            openDelay={100}
                            closeDelay={100}
                            opened={openMenu === menu.label}
                            onOpen={() => handleMenuHover(menu.label)}
                            onClose={() => setOpenMenu(null)}
                        >
                            <Menu.Target>
                                <Text
                                    className={classes.menubarItem}
                                    onClick={() => handleMenuClick(menu.label)}
                                >
                                    {menu.label}
                                </Text>
                            </Menu.Target>
                            <Menu.Dropdown className={classes.menuDropdown}>
                                {renderSubMenu(menu.subMenu)}
                            </Menu.Dropdown>
                        </Menu>
                    ))}
                </Group>

                {/* User actions on the right with icons */}
                <Group className={classes.menubarActions}>
                    <div className={classes.actionButton}>
                        <ActionIcon>
                            <IconUser size={16} />
                        </ActionIcon>
                    </div>
                    <div className={classes.actionButton}>
                        <ActionIcon>
                            <IconSettings size={16} />
                        </ActionIcon>
                    </div>
                    <div className={classes.actionButton}>
                        <ActionIcon>
                            <IconLogout size={16} />
                        </ActionIcon>
                    </div>
                </Group>
            </Group>
        </header>
    );
};

CustomMenuBar.propTypes = {
    onSelectToolBar: PropTypes.func.isRequired,
};

export default CustomMenuBar;
