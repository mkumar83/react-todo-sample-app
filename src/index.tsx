import React from 'react'
import ReactDOM from 'react-dom/client'
/* eslint-disable sort-imports */
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const domele = document.getElementById('root') as HTMLElement,
    root = ReactDOM.createRoot(domele)

/* eslint-disable function-paren-newline */
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

/*
 *  If you want to start measuring performance in your app, pass a function
 *  to log results (for example: reportWebVitals(console.log))
 *  or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */

reportWebVitals()
