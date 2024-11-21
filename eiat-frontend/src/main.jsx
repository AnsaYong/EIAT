import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { MantineEmotionProvider } from '@mantine/emotion';
import { Provider } from 'react-redux';
import { theme } from '@/Styles/main.theme';  // Custom theme
import { store, persistor } from './redux/store';

import '@mantine/core/styles.css'

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
)
