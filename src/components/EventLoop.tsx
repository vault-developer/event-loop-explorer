import CircleOuter from './CircleOuter/CircleOuter.tsx';
import Container from "./Container/Container.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";
import Sector from "./Sector/Sector.tsx";

function EventLoop() {

  return (
    <>
      <p>Event Loop</p>
      <Container>
        <CircleOuter/>
        <Sector/>
        <CircleInner/>
      </Container>
    </>
  );
}

export default EventLoop;