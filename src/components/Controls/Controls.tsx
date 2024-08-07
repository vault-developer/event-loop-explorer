import {useEventLoopState} from "../../store/store.ts";

function Controls() {
  const setState = useEventLoopState(state => state.setState);
  const mutable = useEventLoopState(state => state.mutable);
  return (
    <div style={{marginTop: 250, display: "flex", justifyContent: 'space-around'}}>
      <button onClick={() => setState(!mutable.enabled, 'enabled')}>run/stop</button>
      <button onClick={() => setState(true, 'render')}>active render</button>
      <button onClick={() => setState(true, 'task')}>activate task</button>
      <button onClick={() => setState(true, 'microtask')}>activate microtask</button>
    </div>
  );
}

export default Controls;