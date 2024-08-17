import {useEventListsState} from "../../store/store.ts";
import styles from "./Console.module.css";

function Console() {
  const tasks = useEventListsState(state => state.console);

  return (
    <div className={styles.logQueue}>
      {tasks.map(log => {
        return (
          <div key={log} className={styles.log}>
            {log}
          </div>
        )
      })}
    </div>
  );
}

export default Console;