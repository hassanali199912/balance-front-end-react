import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n.ts'
import App from './App.tsx'


import { store } from "./store/index.ts";
import { Provider as StoreProvider } from "react-redux";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
)
