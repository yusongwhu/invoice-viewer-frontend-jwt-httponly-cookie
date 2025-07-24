import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './i18n'; // 👈 initialize translations

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </StrictMode>,
)
