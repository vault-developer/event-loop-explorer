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
        <Sector/>
        <Pointer/>
        <CircleInner/>
      </Container>
    </>
  );
}

export default EventLoop;