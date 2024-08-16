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
// 1. Сделать асинхронные события на базе синхронных (рентер, очереди)
// 2. Сделать визуализацию событий в UI
// 3. Сделать валидацию кода через в Editor https://github.com/ajaxorg/ace/wiki/Syntax-validation
// 4. Описать limitations
// 5. Попросить review
// 6. Выложить
// 7. Сделать отдельную страничку с туториалом:
//    - когда вызывается каждая из тасок и почему
//    - добавить голос
//    - добавить live portrait
