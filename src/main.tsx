import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


//TODO:
// ADD stop/pause button
// ADD microtask and task buttons
// ADD надписи на секторах
// вынести константу задержки в константы