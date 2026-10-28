// ============================================================
// KDU Asset Tracker – Entry Point
// ============================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

import { theme } from './theme';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position="top-right" zIndex={1000} />
        <DatesProvider settings={{ locale: 'en' }}>
          <App />
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
