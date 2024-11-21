// StepLayout.jsx
import { useState } from 'react';
import PropType from 'prop-types';
import { Tabs, ScrollArea, Paper, Group } from '@mantine/core';
import { useTabsStyles } from '@/Styles/tabsStyles';

const StepLayout = ({ tabs, defaultTab, children }) => {
    const { classes: tabClasses } = useTabsStyles();
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <Paper padding="md">
            <Tabs value={activeTab} onChange={setActiveTab} variant="outline" inverted>
                <ScrollArea
                    scrollbarSize="1.25rem"
                    style={{ height: 'calc(100vh - 100px)' }}
                    styles={{ thumb: { borderRadius: '20px' } }}
                >
                    {children.map((ChildComponent, index) => (
                        <Tabs.Panel key={tabs[index].value} value={tabs[index].value}>
                            <ChildComponent />
                        </Tabs.Panel>
                    ))}
                </ScrollArea>

                <Tabs.List className={tabClasses.tabList}>
                    <Group gap="1">
                        {tabs.map((tab) => (
                            <Tabs.Tab key={tab.value} value={tab.value} className={tabClasses.tabItem}>
                                {tab.label}
                            </Tabs.Tab>
                        ))}
                    </Group>
                </Tabs.List>
            </Tabs>
        </Paper>
    );
};

StepLayout.propTypes = {
    tabs: PropType.arrayOf(PropType.shape({
        value: PropType.string.isRequired,
        label: PropType.string.isRequired,
    })).isRequired,
    defaultTab: PropType.string.isRequired,
    children: PropType.arrayOf(PropType.elementType).isRequired,
};

export default StepLayout;
