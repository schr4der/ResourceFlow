// Index.js

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='261989909969-cjm0iipa6ljj516ui4fg4ismtr190urq.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </GoogleOAuthProvider>
)