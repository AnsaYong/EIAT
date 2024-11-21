import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from '@/App.jsx';
import { MantineProvider } from '@mantine/core';
import { MantineEmotionProvider } from '@mantine/emotion';
import '@mantine/core/styles.css';
import { theme } from './Styles/main.theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <MantineEmotionProvider>
          <App />
        </MantineEmotionProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
