import CircleOuter from './CircleOuter/CircleOuter.tsx';
import CircleContainer from "./CircleContainer/CircleContainer.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";
import Pointer from "./Pointer/Pointer.tsx";
import {useEventLoopAnimationState} from "../../store/store.ts";
import Controls from "./Controls/Controls.tsx";
import CircleLabels from "./CircleLabels/CircleLabels.tsx";
import {events} from "./EventLoop.data.ts";

function EventLoop() {
  const immutable = useEventLoopAnimationState(state => state.immutable);
  return (
    <>
      <p style={{marginBottom: 50}}>Event Loop</p>
      <CircleContainer>
        <CircleOuter/>

        {events.map(({degree, type}) => {
          const enabled = immutable[type] ? 'enabled' : 'disabled';
          const colorVar = `--circle-${enabled}-${type}`;
          return (
            <Sector
              key={degree}
              colorVar={colorVar}
              degree={360 - degree + 10}/>
          )
        })}

        <Pointer/>
        <CircleInner/>
        <CircleLabels/>
      </CircleContainer>
      <Controls/>
    </>
  );
}

export default EventLoop;