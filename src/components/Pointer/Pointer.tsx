import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";

function Pointer() {
  const sectorInnerRef = useRef<HTMLDivElement>(null);
  const sectorOuterRef = useRef<HTMLDivElement>(null);
  let angle = 0;

  useEffect(() => {
    const animate = () => {
      if (sectorInnerRef.current && sectorOuterRef.current) {
        sectorInnerRef.current.style.transform = `rotate(${angle-0.5}deg)`;
        sectorOuterRef.current.style.transform = `rotate(${angle}deg)`;
        angle += 0.5 % 360;
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