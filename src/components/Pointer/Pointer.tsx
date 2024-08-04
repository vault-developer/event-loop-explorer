import styles from './Pointer.module.css';
import {useEffect, useRef, useState} from "react";

function Pointer() {
  const [angle, setAngle] = useState(0);
  const requestRef = useRef<number>();

  const animate = () => {
    setAngle((prevAngle) => (prevAngle + 0.5) % 360);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <>
      <div className={styles.pointerBase}/>
      <div
        className={styles.pointer}
        style={{
          background: `linear-gradient(${angle}deg, #1A2A38 50%, transparent 50%), linear-gradient(${angle + 170}deg, #1A2A38 50%, transparent 50%)`,
        }}
      />
    </>

  );
}

export default Pointer;