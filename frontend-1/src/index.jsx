// Register the service worker in the React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { Workbox } from 'workbox-window';
import { MantineProvider } from '@mantine/core';

import { GeoProvider } from './components/GeoContext.jsx';
import { ProjectProvider } from './components/Context/ProjectContext.jsx';

import 'leaflet/dist/leaflet.css';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');
    wb.register();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <ProjectProvider>
                    <GeoProvider>
                        <App />
                    </GeoProvider>
                </ProjectProvider>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>
);