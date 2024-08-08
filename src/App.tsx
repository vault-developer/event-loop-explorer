import styles from './App.module.css'
import EventLoop from "./components/EventLoop/EventLoop.tsx";

function App() {
  return (
    <div className={styles.layout}>

      <div className={styles.editor}>Editor</div>
      <div className={styles.callstack}>CallStack</div>
      <div className={styles.console}>Console</div>
      <div>Web api</div>
      <div>Tasks Queue</div>
      <div>mTasks Queue</div>
      <div>Render steps</div>
      <div className={styles.eventLoop}>
        <EventLoop/>
      </div>
    </div>
  )
}

export default App
