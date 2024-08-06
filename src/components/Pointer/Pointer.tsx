import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";
import {useEventLoopMutatedState, useEventLoopState} from "../../store/store.ts";

function Pointer() {
  const eventLoopMutatedState = useEventLoopMutatedState(state => state);
  const setRender = useEventLoopState(state => state.setRender);

  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);
  let angle = 0;

  useEffect(() => {
    const animate = async () => {
      if (sectorInnerRef.current && sectorOuterRef.current) {
        if (eventLoopMutatedState.render && angle === 10.5) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          setRender(false);
        }

        sectorInnerRef.current.style.transform = `rotate(${angle-0.5}deg)`;
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