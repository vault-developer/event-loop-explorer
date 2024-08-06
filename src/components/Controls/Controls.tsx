import {useEventLoopState} from "../../store/store.ts";

function Controls() {
  const setRender = useEventLoopState(state => state.setRender);
  const setEnabled = useEventLoopState(state => state.setEnabled);
  const setTask = useEventLoopState(state => state.setTask);
  const setMicroTask = useEventLoopState(state => state.setMicrotask);
  const mutable = useEventLoopState(state => state.mutable);
  return (
    <div style={{marginTop: 250, display: "flex", justifyContent: 'space-around'}}>
      <button onClick={() => setEnabled(!mutable.enabled)}>run/stop</button>
      <button onClick={() => setRender(true)}>active render</button>
      <button onClick={() => setTask(true)}>activate task</button>
      <button onClick={() => setMicroTask(true)}>activate microtask</button>
    </div>
  );
}

export default Controls;