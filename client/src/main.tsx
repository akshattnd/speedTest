import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "@/components/ui/sonner"

import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './services/Store.ts'
import QueryProvider from './services/queryProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider >
        <App />
        <Toaster />
      </QueryProvider>
    </Provider>
  </StrictMode>,
)
