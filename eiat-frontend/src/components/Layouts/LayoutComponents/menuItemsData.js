// Menu items data for the main menu bar of the application
export const menuData = [
    {
        label: 'File',
        subMenu: [
            { label: 'New Project', command: 'newProject' },
            { label: 'Load Project', command: 'loadProject' },
            { divider: true },
            { label: 'Save Project', command: 'saveProject' },
            { divider: true },
            {
                label: 'Export',
                subMenu: [
                    { label: 'Export Report (PDF)', command: 'exportPDF' },
                    { label: 'Export Data (CSV)', command: 'exportCSV' },
                    { label: 'Export Map (Shapefile)', command: 'exportShapefile' }
                ]
            },
            {
                label: 'Import',
                subMenu: [
                    { label: 'Spatial Data', command: 'importSpatialData' },
                    { label: 'Environmental Models', command: 'importModels' },
                    { label: 'Baseline Data', command: 'importBaselineData' }
                ]
            },
            { divider: true },
            { label: 'Close', command: 'closeProject' }
        ]
    },
    {
        label: 'Edit',
        subMenu: [
            { label: 'Undo', command: 'undo' },
            { label: 'Redo', command: 'redo' }
        ]
    },
    {
        label: 'View',
        subMenu: [
            { label: 'Toggle Sidebar', command: 'toggleSidebar' },  // Toggle visibility of the sidebar containing the main steps
            { label: 'Toggle Toolbar', command: 'toggleToolbar' },  // Show or hide additional toolbars for specialized actions (e.g., data analysis, visualization)
            { label: 'Layers', command: 'toggleLayers' },  // Manage visibility of geospatial layers (maps, overlays)
            { label: 'Fullscreen Map', command: 'toggleMapLayers' },    // Open the geospatial map in full-screen mode for detailed examination
            { label: 'Reset Layout', command: 'resetLayout' },  // Reset the layout to default if users customize it too much.
        ]
    },
    {
        label: 'Data Management',
        subMenu: [
            { label: 'Baseline Data', command: 'baselineData' },  // Access data entry forms for gathering baseline environmental data (e.g., environmental, social, economic)
            { label: 'Monitoring Data', command: 'monitoringData' },  // Import or enter monitoring data for comparison and analysis
            { label: 'Spatial Data', command: 'spatialData'}  // Manage geospatial data layers (import, edit, view)
        ]
    },
    {
        label: 'Analysis Tools',
        subMenu: [
            { label: 'Spatial Analyses', toolbar: 'GeoSpatialToolBar' },
            { label: 'Impact Prediction', toolbar: 'ImpactAnalysisToolBar' },    // Run simulations and predictions based on project data
            { label: 'Alternative Evaluation', toolbar: 'alternativeEvaluation' },   // Compare different project alternatives and their impacts
            { divider: true },
            { label: 'Risk Assessment', toolbar: 'riskAssessment' }, // Evaluate environmental risks based on likelihood and severity
            { divider: true },
            { label: 'Mitigation Measures', toolbar: 'mitigationMeasures' },  // Apply and manage mitigation strategies for identified impacts
            { label: 'Cumulative Effects Analysis', toolbar: 'cumulativeEffects' },  // Assess the combined effects of multiple impacts over time
            { label: 'Data Visualization', toolbar: 'DataVisualizationToolBar' },
        ]
    },
    {
        label: 'Reporting',
        subMenu: [
            { label: 'Generate Summary Report', command: 'generateSummaryReport' },  // Create a summary report of the analysis and findings
            { label: 'Detailed Report', command: 'generateDetailedReport' },  // Generate a full detailed EIA report including all substeps, data, and maps
            { divider: true },
            { label: 'Draft Report', command: 'saveDraftReport' },  // Save a draft version of the report for review and editing
            { label: 'Final Report', command: 'saveFinalReport' },  // Save the final version of the report for submission and publication
        ]
    },
    {
        label: 'Collaboration',
        subMenu: [
            { label: 'Share Project', command: 'shareProject' },  // Share the project with other team members or stakeholders
            { label: 'Review Project', command: 'reviewProject' },  // Allow others to review and comment on the project
            { divider: true },
            { label: 'Comments', command: 'viewComments' },  // Enable feedback or comments on specific parts of the project
            { label: 'Notifications', command: 'viewNotifications' },  // Check for updates, messages, and notifications from the team
        ]
    },
    {
        label: 'Help',
        subMenu: [
            { label: 'User Guide', command: 'userGuide' },
            { label: 'Tutorials', command: 'tutorials' },
            { divider: true },
            { label: 'Documentation', command: 'documentation' },
            { label: 'FAQs', command: 'faqs' },
            { divider: true },
            { label: 'Contact Support', command: 'contactSupport' },
        ]
    },
];
