// CustomNavBar.jsx: Splits the Navbar into 3 sections:
// Title, Scrollable Tabs Area, and Collapsible Dropdown Row
import { useState } from 'react';
import { Title, Tabs, ScrollArea, Collapse, Button, Group, Paper } from '@mantine/core';

// Custom styles
import { useStyles } from '@/Styles/navbarStyles';
import { useTabsStyles } from '@/Styles/tabsStyles';


const CustomNavBar = () => {
    const { classes } = useStyles();
    const { classes: tabClasses } = useTabsStyles();

    const [isDropdownOneOpen, setIsDropdownOneOpen] = useState(false);
    const [isDropdownTwoOpen, setIsDropdownTwoOpen] = useState(false);

    const [activeTab, setActiveTab] = useState('tab-1');
    const tabsData = [
        { value: 'tab-1', label: 'Tab 1' },
        { value: 'tab-2', label: 'Tab 2' },
        { value: 'tab-3', label: 'Tab 3' },
    ];

    return (
        <Paper className={classes.navbarContainer}>
            {/* Title */}
            <div className={classes.titleWrapper}>
                <Title order={5} className={classes.navbarTitle}>
                    Table of Contents
                </Title>
            </div>

            {/* Scrollable Tabs Area */}
            <div className={classes.tabsWrapper}>
                <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
                    <Tabs.List className={tabClasses.tabList}>
                        <Group gap="1">
                            {tabsData.map(tab => (
                                <Tabs.Tab
                                    key={tab.value}
                                    value={tab.value}
                                    className={`${tabClasses.tabItem} ${activeTab === tab.value ? tabClasses.activeTab : ''}`}
                                >
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Group>
                    </Tabs.List>

                    <ScrollArea className={classes.scrollArea}>
                        {tabsData.map(({ value, label }) => (
                            <Tabs.Panel key={value} value={value}>
                                <p style={{ whiteSpace: 'nowrap' }}>
                                    This is the content of the {label} tab.
                                    Here you can add as much content as needed.
                                </p>
                            </Tabs.Panel>
                        ))}
                    </ScrollArea>
                </Tabs>
            </div>

            {/* Collapsible Dropdown Row 1 */}
            <div className={classes.collapseSection}>
                <Button
                    onClick={() => setIsDropdownOneOpen(prev => !prev)}
                    variant="filled"
                    fullWidth
                    mt="md"
                    className={`${classes.collapseButton} ${isDropdownOneOpen ? classes.collapseButtonOpen : classes.collapseButtonClosed}`}
                >
                    Section 1
                </Button>
                <Collapse in={isDropdownOneOpen}>
                    <div className={classes.collapseContent}>
                        {/* Content of the dropdown */}
                        <ScrollArea className={classes.scrollArea}>
                            <p style={{ whiteSpace: 'nowrap' }}>
                                This is the dropdown content that can be expanded or collapsed. It will scroll if the content is too large for the space.
                            </p>
                        </ScrollArea>
                    </div>
                </Collapse>
            </div>

            {/* Collapsible Dropdown Row 2 */}
            <div className={classes.collapseSection}>
                <Button
                    onClick={() => setIsDropdownTwoOpen(prev => !prev)}
                    variant="filled"
                    fullWidth
                    mt="md"
                    className={`${classes.collapseButton} ${isDropdownTwoOpen ? classes.collapseButtonOpen : classes.collapseButtonClosed}`}
                >
                    Section 2
                </Button>
                <Collapse in={isDropdownTwoOpen}>
                    <div className={classes.collapseContent}>
                        {/* Content of the dropdown */}
                        <ScrollArea className={classes.scrollArea}>
                            <p style={{ whiteSpace: 'nowrap' }}>
                                This is the dropdown content that can be expanded or collapsed. It will scroll if the content is too large for the space.
                            </p>
                        </ScrollArea>
                    </div>
                </Collapse>
            </div>
        </Paper>
    );
}

export default CustomNavBar;