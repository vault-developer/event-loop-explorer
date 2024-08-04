import styles from './Pointer.module.css';
import {useEffect, useRef} from "react";

function Pointer() {
  const sectorRef = useRef<HTMLDivElement>(null);
  let angle = 0;

  useEffect(() => {
    const animate = () => {
      if (sectorRef.current) {
        sectorRef.current.style.transform = `rotate(${angle}deg)`;
        angle += 0.5 % 360; // Adjust this value to change the speed
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
      <div className={styles.sector} ref={sectorRef}/>
  );
}

export default Pointer;