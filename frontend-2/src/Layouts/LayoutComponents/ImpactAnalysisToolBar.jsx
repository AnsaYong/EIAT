// Impact Analysis toolbar: Provides a list of tools for impact analysis
// Wraps tools in a Group for Horizontal Alignment
import { Menu, Text, Button, Group } from '@mantine/core';
import PropTypes from 'prop-types';

// Custom styles
import { useToolbarStyles } from '@/Styles/toolbarStyles';

const toolsData = [
    {
        label: 'Impact 1',
        subTool: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { label: 'Sub Item 3', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 4', section: 'Sub Label 2' },
            { label: 'Sub Item 5', section: 'Sub Label 2' }
        ]
    },
    {
        label: 'Impact 2',
        subTool: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 3', section: 'Sub Label 2' }
        ]
    },
    {
        label: 'Impact 3',
        subTool: [
            { label: 'Sub Item 1', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 2', section: 'Sub Label 1' },
            { label: 'Sub Item 3', section: 'Sub Label 1' },
            { divider: true },
            { label: 'Sub Item 4', section: 'Sub Label 2' },
            { label: 'Sub Item 5', section: 'Sub Label 2' },
        ]
    }
    // TODO: Add more menu items
];

const ImpactAnalysisToolBar = ({ onClose }) => {
    const { classes } = useToolbarStyles();  // Use custom styles

    return (
        <div className={classes.toolbarContainer}>
            <div className={classes.toolbarTitle}>
                <Group className={classes.toolbarTitleGroup}>
                    Impact Analysis Toolbar
                    <Button onClick={onClose} className={classes.closeButton}>X</Button>
                </Group>
            </div>

            <Group className={classes.toolbarContent}>
                {toolsData.map((tool, index) => (
                    <Menu key={index} trigger="click" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Text>{tool.label}</Text>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {tool.subTool.map((item, subIndex) => (
                                item.divider ? (
                                    <Menu.Divider key={subIndex} />
                                ) : (
                                    <div key={subIndex}>
                                        {subIndex === 0 || tool.subTool[subIndex - 1]?.section !== item.section ? (
                                            <Menu.Label>{item.section}</Menu.Label>
                                        ) : null}
                                        <Menu.Item>{item.label}</Menu.Item>
                                    </div>
                                )
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                ))}
            </Group>
        </div>
    );
};

ImpactAnalysisToolBar.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ImpactAnalysisToolBar;