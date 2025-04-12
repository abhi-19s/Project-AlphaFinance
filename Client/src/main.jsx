import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js'; // Destructure persistor from store.js
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
