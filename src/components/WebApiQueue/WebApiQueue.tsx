import {useEventListsState} from "../../store/store.ts";
import styles from "./WebApiQueue.module.css";
import WebApiTask from "./WebApiTask.tsx";

function WebApiQueue() {
  const tasks = useEventListsState(state => state.immutable.web_api);

  return (
    <div className={styles.tasksQueue}>
      {tasks.map(task => <WebApiTask task={task} key={task.serialize()}/>)}
    </div>
  );
}

export default WebApiQueue;