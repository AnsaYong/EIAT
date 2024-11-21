import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';
import './index.css';

import { GeoProvider } from './components/Context/GeoContext.jsx';
import { ProjectProvider } from './components/Context/ProjectContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ProjectProvider>
          <GeoProvider>
            <App />
          </GeoProvider>
        </ProjectProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
