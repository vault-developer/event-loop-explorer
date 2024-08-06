import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";
import {useEventLoopMutatedState, useEventLoopState} from "../../store/store.ts";
import {EVENT_LOOP_INNER_SECTOR_OFFSET, EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../../constants.ts";

const renderSectorPosition = EVENT_LOOP_SECTORS_POSITION_DEGREE.render + EVENT_LOOP_INNER_SECTOR_OFFSET;

function Pointer() {
  const eventLoopMutatedState = useEventLoopMutatedState(state => state);
  const setRender = useEventLoopState(state => state.setRender);

  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);
  let angle = 0;

  useEffect(() => {
    const animate = async () => {
      if (sectorInnerRef.current && sectorOuterRef.current) {
        if (eventLoopMutatedState.render && angle === renderSectorPosition) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          setRender(false);
        }

        sectorInnerRef.current.style.transform = `rotate(${angle-EVENT_LOOP_INNER_SECTOR_OFFSET}deg)`;
        sectorOuterRef.current.style.transform = `rotate(${angle}deg)`;
        angle += 0.5;
        if (angle > 360) angle-=360;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <div className={styles.sectorWithInnerBorder} ref={sectorInnerRef}/>
      <div className={styles.sectorWithOuterBorder} ref={sectorOuterRef}/>
    </>

  );
}

export default Pointer;