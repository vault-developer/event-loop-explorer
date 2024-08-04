import CircleOuter from './CircleOuter/CircleOuter.tsx';
import Container from "./Container/Container.tsx";
import CircleInner from "./CircleInner/CircleInner.tsx";

function EventLoop() {

  return (
    <>
      <p>Event Loop</p>
      <Container>
        <CircleOuter/>
        <CircleInner/>
      </Container>
    </>
  );
}

export default EventLoop;