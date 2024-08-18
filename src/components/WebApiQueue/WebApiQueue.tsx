import {useEventListsState} from "../../store/store.ts";
import styles from "./WebApiQueue.module.css";

function WebApiQueue() {
  const tasks = useEventListsState(state => state.immutable.web_api);

  return (
    <div className={styles.tasksQueue}>
      {tasks.map(task => {
        const serialized = task.serialize();
        return (
          <div key={serialized} className={styles.task}>
            {serialized}
          </div>
        )
      })}
    </div>
  );
}

export default WebApiQueue;