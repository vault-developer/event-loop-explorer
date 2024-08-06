import CircleOuter from './CircleOuter/CircleOuter.tsx';
import CircleContainer from "./CircleContainer/CircleContainer.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";
import Pointer from "./Pointer/Pointer.tsx";
import {useEventLoopState} from "../store/store.ts";
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../constants.ts";
import Controls from "./Controls/Controls.tsx";

function EventLoop() {
  const render = useEventLoopState(state => state.immutable.render);
  const colorVarRender = render ? '--circle-enabled-render' : '--circle-disabled-render';

  return (
    <>
      <p>Event Loop</p>
      <CircleContainer>
        <CircleOuter/>

        <Sector colorVar='--circle-disabled-microtask' degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.microtask4}/>
        <Sector colorVar={colorVarRender} degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.render}/>
        <Sector colorVar='--circle-disabled-microtask' degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.microtask1}/>

        <Sector colorVar='--circle-disabled-microtask' degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.microtask2}/>
        <Sector colorVar='--circle-disabled-task' degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.task}/>
        <Sector colorVar='--circle-disabled-microtask' degree={EVENT_LOOP_SECTORS_POSITION_DEGREE.microtask3}/>

        <Pointer/>
        <CircleInner/>
      </CircleContainer>
      <Controls/>
    </>
  );
}

export default EventLoop;