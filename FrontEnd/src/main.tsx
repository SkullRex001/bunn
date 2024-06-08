import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  QueryClient , QueryClientProvider
  
} from '@tanstack/react-query'

const queryClinet = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClinet}>
    <App />
    </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
