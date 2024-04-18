import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@/scss/main.scss";
import { Provider } from "react-redux";
import { store } from './redux/index.js';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      // eslint-disable-next-line no-undef
      basename={process.env.NODE_ENV === "production" ? "/portfolio/" : "/"}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
