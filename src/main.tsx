import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/cart/cartReducers'; 
import AuthProvider from './utils/AuthProvider.tsx'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
      
    </Provider>
  </React.StrictMode>
)
