import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { NotificationContextProvider } from './components/Notification';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </StrictMode>,
)
