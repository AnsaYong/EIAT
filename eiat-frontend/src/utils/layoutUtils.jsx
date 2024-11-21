// LayoutUtils.js
import React, { useMemo } from 'react';
import { Rnd } from 'react-rnd';
import { Paper } from '@mantine/core';
import { toolbarsConfig } from '@/components/Layouts/LayoutComponents/Toolbars/toolbarsConfig';

// Handles the rendering of the toolbars
export function Toolbars({ openToolbars, handleToolbarClose }) {
    return useMemo(() => (
        Object.entries(openToolbars).map(([toolBarName, isOpen], index) =>
            isOpen && (
                <Rnd
                    key={toolBarName}
                    bounds="window"
                    minWidth={300}
                    minHeight={75}
                    enableResizing={false}
                    style={{
                        zIndex: 1000 + index, // Ensures each Rnd has a higher z-index than other elements (adjust the number as needed)
                    }}
                >
                    <Paper>
                        {toolbarsConfig[toolBarName] 
                            ? React.createElement(toolbarsConfig[toolBarName], {
                                onClose: () => handleToolbarClose(toolBarName),
                            }) 
                            : <div>Toolbar not available</div>
                        }
                    </Paper>
                </Rnd>
            )
        )
    ), [openToolbars, handleToolbarClose]);
}