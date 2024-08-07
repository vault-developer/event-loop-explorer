import CircleOuter from './CircleOuter/CircleOuter.tsx';
import CircleContainer from "./CircleContainer/CircleContainer.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";
import Pointer from "./Pointer/Pointer.tsx";
import {useEventLoopState} from "../store/store.ts";
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../constants.ts";
import Controls from "./Controls/Controls.tsx";
import CircleLabels from "./CircleLabels/CircleLabels.tsx";

const {
  microtasks: microtaskDegrees,
  task: taskDegree,
  render: renderDegree
} = EVENT_LOOP_SECTORS_POSITION_DEGREE;

function EventLoop() {
  const {render, task, microtask} = useEventLoopState(state => state.immutable);
  const colorVarRender = render ? '--circle-enabled-render' : '--circle-disabled-render';
  const colorVarTask = task ? '--circle-enabled-task' : '--circle-disabled-task';
  const colorVarMicrotask = microtask ? '--circle-enabled-microtask' : '--circle-disabled-microtask';

  return (
    <>
      <p>Event Loop</p>
      <CircleContainer>
        <CircleOuter/>

        <Sector colorVar={colorVarMicrotask} degree={microtaskDegrees[3]}/>
        <Sector colorVar={colorVarRender} degree={renderDegree}/>
        <Sector colorVar={colorVarMicrotask} degree={microtaskDegrees[0]}/>

        <Sector colorVar={colorVarMicrotask} degree={microtaskDegrees[1]}/>
        <Sector colorVar={colorVarTask} degree={taskDegree}/>
        <Sector colorVar={colorVarMicrotask} degree={microtaskDegrees[2]}/>

        <Pointer/>
        <CircleInner/>
        <CircleLabels/>
      </CircleContainer>
      <Controls/>
    </>
  );
}

export default EventLoop;