// Holds the global theme configuration and AppShell component styles
export const theme = {
    colorScheme: 'light',
    colors: {
        gray: [
            '#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', 
            '#ced4da', '#adb5bd', '#6c757d', '#495057', 
            '#343a40', '#212529'
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
