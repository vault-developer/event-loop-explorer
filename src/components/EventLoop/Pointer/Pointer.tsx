import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";
import {useEventLoopAnimationState} from "../../../store/store.ts";
import {EVENT_LOOP_INNER_SECTOR_OFFSET} from "../../../constants.ts";
import {events} from "../EventLoop.data.ts";
import {EventInterface} from "../EventLoop.types.ts";

let angle = 100 - 10.5;

const stops = new Set(events.map(event => event.degree));
const typeByStop = events.reduce((acc, event) => {
  acc[event.degree] = event.type;
  return acc;
}, {} as Record<number, EventInterface['type']>);

function Pointer() {
  const setState = useEventLoopAnimationState(state => state.setState);
  const {enabled} = useEventLoopAnimationState(state => state.immutable);
  const mutable = useEventLoopAnimationState(state => state.mutable);

  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      if (!mutable.enabled) return;
      if (sectorInnerRef.current && sectorOuterRef.current) {
        const angleWithOffset = angle + EVENT_LOOP_INNER_SECTOR_OFFSET;
        if (stops.has(angleWithOffset)) {
          const type = typeByStop[angleWithOffset];
          if (mutable[type]) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setState(false, type);
          }
        }
        sectorInnerRef.current.style.transform = `rotate(${360 - angle + 10 - EVENT_LOOP_INNER_SECTOR_OFFSET}deg)`;
        sectorOuterRef.current.style.transform = `rotate(${360 - angle + 10}deg)`;
        angle -= 1;
        if (angleWithOffset < 0) angle += 360;
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