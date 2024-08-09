import styles from './App.module.css'
import EventLoop from "./components/EventLoop/EventLoop.tsx";
import Editor from "./components/Editor.tsx";

function App() {
  return (
    <div className={styles.layout}>

      <div className={styles.editor}>
        <Editor/>
      </div>
      <div className={styles.webApi}>Web api</div>
      <div className={styles.render}>Render steps</div>
      <div className={styles.callstack}>CallStack</div>
      <div className={styles.console}>Console</div>


      <div className={styles.tasks}>Tasks Queue</div>
      <div className={styles.microTasks}>mTasks Queue</div>
      <div className={styles.eventLoop}>
        <EventLoop/>
      </div>
    </div>
  )
}

export default App
