import {useEventListsState} from "../../store/store.ts";
import styles from "./WebApiQueue.module.css";
import {nodeFactory} from "../../utils/nodes/factory.ts";

function WebApiQueue() {
  const tasks = useEventListsState(state => state.immutable.web_api);

  return (
    <div className={styles.tasksQueue}>
      {tasks.map(task => {
        const serializedArgs = task.args?.map((arg) => nodeFactory({
          node: arg,
          context: task.context,
          params: task.params,
        }).serialize()).join(', ') ?? '';
        const serialized = `${task.serialize()}(${serializedArgs})`;

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