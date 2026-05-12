import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { PinnedItemsProvider } from './context/PinnedItemsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PinnedItemsProvider>
      <App />
    </PinnedItemsProvider>
  </StrictMode>,
);
