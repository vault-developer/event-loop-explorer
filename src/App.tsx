import './App.css'
import EventLoop from "./components/EventLoop.tsx";
import {useEventLoopState} from "./store/store.ts";

function App() {
  const setRender = useEventLoopState(state => state.setRender);
  return (
    <>
      <EventLoop/>
      <button onClick={() => setRender(true)} style={{marginTop: 250}}>active render</button>
    </>
    )

}

export default App
