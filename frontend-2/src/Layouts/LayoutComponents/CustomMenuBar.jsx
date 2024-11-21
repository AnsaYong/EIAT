// Menu bar component with custom menu items and user actions
import { Menu, Text, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import PropTypes from 'prop-types';

// Custom styles
import { useMenubarStyles } from '@/Styles/menubarStyles';

const menuData = [
    {
        label: 'Menu Item 1',
        subMenu: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { label: 'Sub Item 3', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 4', section: 'Sub Label 2' },
            { label: 'Sub Item 5', section: 'Sub Label 2' }
        ]
    },
    {
        label: 'Menu Item 2',
        subMenu: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 3', section: 'Sub Label 2' }
        ]
    },
    {
        label: 'Menu Item 3',
        subMenu: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { label: 'Sub Item 3', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 4', section: 'Sub Label 2' },
            { label: 'Sub Item 5', section: 'Sub Label 2' },
        ]
    },
    {
        label: 'Toolbars',
        subMenu: [
            { label: 'Data Visualization', action: 'DataVisualizationToolBar' },
            { label: 'Impact Analysis', action: 'ImpactAnalysisToolBar' },
            { label: 'Geo Spatial', action: 'GeoSpatialToolBar' }
        ]
    }
    // TODO: Add more menu items
];

const CustomMenuBar = ({ onSelectToolBar }) => {
    const { classes } = useMenubarStyles();
    const [burgerOpened, { open, close }] = useDisclosure(false);

    const burgerClicked = () => {
        // Toggle the burger state
        burgerOpened ? close() : open();
    };

    return (
        <header className={classes.menubarContainer}>
            <Group justify="space-between" align="center" className={classes.menubarItems}>
                {/* Menu items */}
                <Group gap={10} wrap="wrap">
                    {menuData.map((menu, index) => (
                        <Menu key={index} trigger="click" openDelay={100} closeDelay={400}>
                            <Menu.Target>
                                <Text>{menu.label}</Text>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {menu.subMenu.map((item, subIndex) => (
                                    item.divider ? (
                                        <Menu.Divider key={subIndex} />
                                    ) : (
                                        <div key={subIndex}>
                                            {subIndex === 0 || menu.subMenu[subIndex - 1]?.section !== item.section ? (
                                                <Menu.Label>{item.section}</Menu.Label>
                                            ) : null}
                                            <Menu.Item
                                                onClick={() => item.action ? onSelectToolBar(item.action) : null}
                                            >
                                                {item.label}
                                            </Menu.Item>
                                        </div>
                                    )
                                ))}
                            </Menu.Dropdown>
                        </Menu>
                    ))}
                </Group>

                {/* User actions */}
                <Group gap={10} visibleFrom="sm">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                </Group>
                <Burger opened={burgerOpened} onClick={burgerClicked} hiddenFrom="sm" />
            </Group>
        </header>
    );
};

CustomMenuBar.propTypes = {
    onSelectToolBar: PropTypes.func,
};

export default CustomMenuBar;
