import {useEventListsState} from "../../store/store.ts";
import styles from "./TasksQueue.module.css";

function TasksQueue() {
  const tasks = useEventListsState(state => state.immutable.task_queue);

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

export default TasksQueue;