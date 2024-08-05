import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './state/store.jsx'

const root = ReactDOM.createRoot(document.getElementById('root')); 

// store.subscribe(()=>console.log(store.getState()));
root.render(
    <Provider store = {store}>
        <App />
    </Provider>
);
