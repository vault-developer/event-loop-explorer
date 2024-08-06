import './App.css'
import EventLoop from "./components/EventLoop.tsx";
import {useEventLoopState} from "./store/store.ts";

function App() {
  const setRender = useEventLoopState(state => state.setRender);
  const setEnabled = useEventLoopState(state => state.setEnabled);
  const mutable = useEventLoopState(state => state.mutable);
  return (
    <>
      <EventLoop/>
      <button onClick={() => setRender(true)} style={{marginTop: 250}}>active render</button>
      <button onClick={() => setEnabled(!mutable.enabled)}>run/stop</button>
    </>
    )

}

export default App
