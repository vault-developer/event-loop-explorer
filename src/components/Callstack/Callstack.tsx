import {useEventListsState} from "../../store/store.ts";
import styles from "./Callstack.module.css";

function CallStack() {
  const tasks = useEventListsState(state => state.immutable.callstack);

  return (
    <div className={styles.stack}>
      {tasks.map(stack => {
        return (
          <div key={stack} className={styles.stackElement}>
            {stack}
          </div>
        )
      })}
    </div>
  );
}

export default CallStack;