import {useEventListsState} from "../../store/store.ts";
import styles from "./RenderCallbacksQueue.module.css";

function RenderCallbacksQueue() {
  const callbacks = useEventListsState(state => state.immutable.render_callbacks);

  return (
    <div className={styles.callbackQueue}>
      {callbacks.map(callback => {
        const serialized = callback.serialize();
        return (
          <div key={serialized} className={styles.callback}>
            {serialized}
          </div>
        )
      })}
    </div>
  );
}

export default RenderCallbacksQueue;