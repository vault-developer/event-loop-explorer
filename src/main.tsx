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
// add examples (multiple things)
// ACE syntax validation via webworker https://github.com/ajaxorg/ace/wiki/Syntax-validation
// add AST parser
// generate an array of events based on parser
// add UI to visualise events
