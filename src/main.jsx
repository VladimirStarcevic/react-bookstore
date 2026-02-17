import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx'
import Fallback from './Fallback.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ErrorBoundary fallback={Fallback}>
          <QueryClientProvider client={queryClient}>
              <App />
          </QueryClientProvider>
      </ErrorBoundary>
  </StrictMode>,
)
