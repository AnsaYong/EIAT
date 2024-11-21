// MainContent.jsx
import { useState } from 'react';
import { Tabs, ScrollArea, Group } from '@mantine/core';
import PropTypes from 'prop-types';

// Styles
import { useTabsStyles } from '@/Styles/tabsStyles';

// Tab configuration
const tabItems = [
    { value: 'tab-1', label: 'Tab 1' },
    { value: 'tab-2', label: 'Tab 2' },
    { value: 'tab-3', label: 'Tab 3' },
];

const tabData =  {
    'tab-1': Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
    'tab-2': Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
    'tab-3': Array.from({ length: 80 }, (_, i) => `Item ${i + 1}`),
};

// TabPanel Component
const TabPanel = ({ value, items }) => (
    <Tabs.Panel value={value}>
        <ScrollArea
            scrollbarSize="1.25rem"
            style={{ height: 'calc(100vh - 100px)' }}
            styles={{ thumb: { borderRadius: '0px' } }}
        >
            <ul style={{ minWidth: '1000px' }}>
                {items.map(item => <li key={item}>{item}</li>)}
            </ul>
        </ScrollArea>
    </Tabs.Panel>
);

const MainContent = () => {
    const { classes: tabClasses } = useTabsStyles();
    // Tabs in main area
    const [activeTab, setActiveTab] = useState('tab-1');

    return (
        <div>
            <Tabs value={activeTab} onChange={setActiveTab} variant="outline" inverted>
                    {tabItems.map(({ value }) => (
                        <TabPanel key={value} value={value} items={tabData[value]} />
                    ))}
                    <Tabs.List className={tabClasses.tabList}>
                        <Group gap="1">
                            {tabItems.map(tab => (
                                <Tabs.Tab key={tab.value} value={tab.value} className={tabClasses.tabItem}>
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Group>
                    </Tabs.List>
                </Tabs>
        </div>
    )
}


TabPanel.propTypes = {
    value: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainContent;