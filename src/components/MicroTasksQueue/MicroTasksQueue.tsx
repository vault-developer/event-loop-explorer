import {useEventListsState} from "../../store/store.ts";
import styles from "./MicroTasksQueue.module.css";

function MicroTasksQueue() {
  const tasks = useEventListsState(state => state.immutable.microtask_queue);

  return (
    <div className={styles.microTasksQueue}>
      {tasks.map(task => {
        const serialized = task.serialize();
        return (
          <div key={serialized} className={styles.microtask}>
            {serialized}
          </div>
        )
      })}
    </div>
  );
}

export default MicroTasksQueue;