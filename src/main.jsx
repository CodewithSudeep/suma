import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import BasicDataLayer from './context/Basic/DataLayer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BasicDataLayer> */}
    <App />
    {/* </BasicDataLayer> */}
  </React.StrictMode>
)
