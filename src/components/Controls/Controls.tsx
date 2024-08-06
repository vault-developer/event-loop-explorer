import {useEventLoopState} from "../../store/store.ts";

function Controls() {
  const setRender = useEventLoopState(state => state.setRender);
  const setEnabled = useEventLoopState(state => state.setEnabled);
  const mutable = useEventLoopState(state => state.mutable);
  return (
    <div style={{marginTop: 250}}>
      <button onClick={() => setRender(true)}>active render</button>
      <button onClick={() => setEnabled(!mutable.enabled)}>run/stop</button>
    </div>
  );
}

export default Controls;