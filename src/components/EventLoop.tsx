import CircleOuter from './CircleOuter/CircleOuter.tsx';
import Container from "./Container/Container.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";
import Pointer from "./Pointer/Pointer.tsx";

function EventLoop() {

  return (
    <>
      <p>Event Loop</p>
      <Container>
        <CircleOuter/>
        <Sector colorVar='--circle-disabled-microtask' degree={340}/>
        <Sector colorVar='--circle-disabled-render' degree={10}/>
        <Sector colorVar='--circle-disabled-microtask' degree={40}/>

        <Sector colorVar='--circle-disabled-microtask' degree={220}/>
        <Sector colorVar='--circle-disabled-task' degree={190}/>
        <Sector colorVar='--circle-disabled-microtask' degree={160}/>
        <Pointer/>
        <CircleInner/>
      </Container>
    </>
  );
}

export default EventLoop;