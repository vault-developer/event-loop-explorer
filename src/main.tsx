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
// ADD надписи на секторах
// вынести константу задержки в константы
// if editor is not working, make just constructor to select order of commands