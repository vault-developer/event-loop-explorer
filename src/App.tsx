import styles from './App.module.css'
import EventLoop from "./components/EventLoop/EventLoop.tsx";
import Editor from "./components/Editor/Editor.tsx";
import TasksQueue from "./components/TasksQueue/TasksQueue.tsx";
import Console from "./components/Console/Console.tsx";
import CallStack from "./components/Callstack/Callstack.tsx";

function App() {
  return (
    <div className={styles.layout}>

      <div className={styles.editor}>
        <Editor/>
      </div>
      <div className={styles.webApi}>Web api</div>
      <div className={styles.render}>Render callbacks</div>
      <div className={styles.callstack}>
        <span>CallStack</span>
        <CallStack/>
      </div>
      <div className={styles.console}>
        <span>Console</span>
        <Console/>
      </div>
      <div className={styles.tasks}>
        <span>Tasks Queue</span>
        <TasksQueue/>
      </div>
      <div className={styles.microTasks}>mTasks Queue</div>
      <div className={styles.eventLoop}>
        <EventLoop/>
      </div>
    </div>
  )
}

export default App
