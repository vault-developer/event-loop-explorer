import styles from './App.module.css'
import EventLoop from "./components/EventLoop/EventLoop.tsx";
import Editor from "./components/Editor/Editor.tsx";
import TasksQueue from "./components/TasksQueue/TasksQueue.tsx";
import Console from "./components/Console/Console.tsx";
import CallStack from "./components/Callstack/Callstack.tsx";
import MicroTasksQueue from "./components/MicroTasksQueue/MicroTasksQueue.tsx";
import RenderCallbacksQueue from "./components/RenderCallbacksQueue/RenderCallbacksQueue.tsx";
import WebApiQueue from "./components/WebApiQueue/WebApiQueue.tsx";

function App() {
  return (
    <div className={styles.layout}>

      <div className={styles.editor}>
        <Editor/>
      </div>
      <div className={styles.webApi}>
        <span>Web api</span>
        <WebApiQueue/>
      </div>
      <div className={styles.renderCallbacks}>
        <span>Render callbacks</span>
        <RenderCallbacksQueue/>
      </div>
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
      <div className={styles.microTasks}>
        <span>mTasks Queue</span>
        <MicroTasksQueue/>
      </div>
      <div className={styles.eventLoop}>
        <EventLoop/>
      </div>
    </div>
  )
}

export default App
