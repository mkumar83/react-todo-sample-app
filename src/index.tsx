// eslint-disable-next-line strict
import './index.css'
import * as log from 'loglevel'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

log.enableAll()

const domele = document.getElementById('root') as HTMLElement,
    root = ReactDOM.createRoot(domele)

root.render(
    <React.StrictMode>
        <App editId={-1} todoItems={[]} />
    </React.StrictMode>,
)

/*
 *  If you want to start measuring performance in your app, pass a function
 *  to log results (for example: reportWebVitals(console.log))
 *  or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */

reportWebVitals()
