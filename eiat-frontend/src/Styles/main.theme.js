// Holds the global theme configuration and AppShell component styles
export const theme = {
    colorScheme: 'light',
    colors: {
        gray: [
            '#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', 
            '#ced4da', '#adb5bd', '#6c757d', '#495057', 
            '#343a40', '#212529'
        ],
        blue: [
            '#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc', 
            '#4dabf7', '#339af0', '#228be6', '#1c7ed6', 
            '#1971c2', '#1864ab'
        ],
        green: [
            '#ebfbee', '#d3f9d8', '#b2f2bb', '#8ce99a', 
            '#69db7c', '#51cf66', '#40c057', '#37b24d', 
            '#2f9e44', '#2b8a3e'
        ],
        red: [
            '#fff5f5', '#ffe3e3', '#ffc9c9', '#ffa8a8', 
            '#ff8787', '#ff6b6b', '#fa5252', '#f03e3e', 
            '#e03131', '#c92a2a'
        ],
    },
    primaryColor: 'gray',
    spacing: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
    radius: { sm: 4, md: 8 },
    fontFamily: 'Inter, sans-serif',
    fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
    shadows: { sm: '0 1px 3px rgba(0, 0, 0, 0.1)', md: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    components: {
        Paper: {
            styles: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
    },
};
