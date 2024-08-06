import CircleOuter from './CircleOuter/CircleOuter.tsx';
import CircleContainer from "./CircleContainer/CircleContainer.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";
import Pointer from "./Pointer/Pointer.tsx";
import {useEventLoopState} from "../store/store.ts";
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../constants.ts";
import Controls from "./Controls/Controls.tsx";

const {microtasks, task, render: renderDegree} = EVENT_LOOP_SECTORS_POSITION_DEGREE;

function EventLoop() {
  const render = useEventLoopState(state => state.immutable.render);
  const colorVarRender = render ? '--circle-enabled-render' : '--circle-disabled-render';

  return (
    <>
      <p>Event Loop</p>
      <CircleContainer>
        <CircleOuter/>

        <Sector colorVar='--circle-disabled-microtask' degree={microtasks[3]}/>
        <Sector colorVar={colorVarRender} degree={renderDegree}/>
        <Sector colorVar='--circle-disabled-microtask' degree={microtasks[0]}/>

        <Sector colorVar='--circle-disabled-microtask' degree={microtasks[1]}/>
        <Sector colorVar='--circle-disabled-task' degree={task}/>
        <Sector colorVar='--circle-disabled-microtask' degree={microtasks[2]}/>

        <Pointer/>
        <CircleInner/>
      </CircleContainer>
      <Controls/>
    </>
  );
}

export default EventLoop;