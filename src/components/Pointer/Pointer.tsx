import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";
import {useEventLoopState} from "../../store/store.ts";
import {EVENT_LOOP_INNER_SECTOR_OFFSET, EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../../constants.ts";

let angle = 0;

function Pointer() {
  const setState = useEventLoopState(state => state.setState);
  const {enabled} = useEventLoopState(state => state.immutable);
  const mutable = useEventLoopState(state => state.mutable);

  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      if (!mutable.enabled) return;
      if (sectorInnerRef.current && sectorOuterRef.current) {
        const angleWithOffset = angle - EVENT_LOOP_INNER_SECTOR_OFFSET;
        if (mutable.render && angleWithOffset === EVENT_LOOP_SECTORS_POSITION_DEGREE.render) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          setState(false, 'render');
        }

        if (mutable.task && EVENT_LOOP_SECTORS_POSITION_DEGREE.task === angleWithOffset) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          setState(false, 'task');
        }

        if (mutable.microtask && EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks.includes(angleWithOffset)) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          setState(false, 'microtask');
        }

        sectorInnerRef.current.style.transform = `rotate(${angle-EVENT_LOOP_INNER_SECTOR_OFFSET}deg)`;
        sectorOuterRef.current.style.transform = `rotate(${angle}deg)`;
        angle += 0.5;
        if (angle > 360) angle-=360;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [enabled]);

  return (
    <>
      <div className={styles.sectorWithInnerBorder} ref={sectorInnerRef}/>
      <div className={styles.sectorWithOuterBorder} ref={sectorOuterRef}/>
    </>
  );
}

export default Pointer;