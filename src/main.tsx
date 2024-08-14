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
// 0. Idenifier traverse fix (test on "callstacksimple")
// 1. Сделать парсинг кода в синхронную цепочку событий (бежать по примерам)
// 2. Сделать асинхронные события на базе синхронных (рентер, очереди)
// 3. Сделать визуализацию событий в UI
// 4. Сделать валидацию кода через в Editor https://github.com/ajaxorg/ace/wiki/Syntax-validation
// 5. Выложить
// 6. Сделать отдельную страничку с туториалом:
//    - когда вызывается каждая из тасок и почему
//    - добавить голос
//    - добавить live portrait
