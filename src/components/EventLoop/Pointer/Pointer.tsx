import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";
import {useEventLoopAnimationState, useEventLoopTime} from "../../../store/store.ts";
import {EVENT_LOOP_INNER_SECTOR_OFFSET} from "../../../constants.ts";
import {events} from "../EventLoop.data.ts";
import {EventInterface} from "../EventLoop.types.ts";
import {useProcessEvent} from "../useProcessEvent.ts";

const RENDER_DELAY_MS = 720;

let angle = 100 - 10.5;
let timeFromLastRender = 0;

const stops = new Set(events.map(event => event.degree));
const typeByStop = events.reduce((acc, event) => {
  acc[event.degree] = event.type;
  return acc;
}, {} as Record<number, EventInterface['type']>);

function Pointer() {
  const setState = useEventLoopAnimationState(state => state.setState);
  const {enabled, paused} = useEventLoopAnimationState(state => state.immutable);
  const mutable = useEventLoopAnimationState(state => state.mutable);
  const incrementTime = useEventLoopTime(state => state.increment);
  const processEvent = useProcessEvent();

  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      if (mutable.paused) return;
      if (!mutable.enabled) {
        angle = 100 - 10.5;
        timeFromLastRender = 0;
        if (sectorInnerRef.current && sectorOuterRef.current) {
          sectorInnerRef.current.style.transform = `rotate(${360 - angle + 10 - EVENT_LOOP_INNER_SECTOR_OFFSET}deg)`;
          sectorOuterRef.current.style.transform = `rotate(${360 - angle + 10}deg)`;
        }
        return;
      }
      if (sectorInnerRef.current && sectorOuterRef.current) {
        const angleWithOffset = angle + EVENT_LOOP_INNER_SECTOR_OFFSET;
        if (stops.has(angleWithOffset)) {
          const type = typeByStop[angleWithOffset];
          if (mutable[type]) {
            await processEvent(type);
          }
        }
        sectorInnerRef.current.style.transform = `rotate(${360 - angle + 10 - EVENT_LOOP_INNER_SECTOR_OFFSET}deg)`;
        sectorOuterRef.current.style.transform = `rotate(${360 - angle + 10}deg)`;
        angle -= 1;
        timeFromLastRender += 1;
        incrementTime();
        if (angleWithOffset < 0) angle += 360;
        if (timeFromLastRender >= RENDER_DELAY_MS) {
          setState(true, 'render');
          timeFromLastRender = 0;
        }
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [enabled, paused]);

  return (
    <>
      <div className={styles.sectorWithInnerBorder} ref={sectorInnerRef}/>
      <div className={styles.sectorWithOuterBorder} ref={sectorOuterRef}/>
    </>
  );
}

export default Pointer;