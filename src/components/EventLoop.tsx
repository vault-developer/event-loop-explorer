import { useEffect, useRef } from 'react';
import Circle from '../components/Circle/Circle';
import Point from '../components/Point/Point';
import styles from './EventLoop.module.css';

function EventLoop() {
  const pointRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let t = 0;

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      const point = pointRef.current;
      if (!container || !point) return;

      const containerWidth = container.offsetWidth - 50;
      const containerHeight = container.offsetHeight - 50;
      const r = containerHeight / 2;

      const x = r * Math.sin(t);
      const y = -r * Math.cos(t);

      point.style.left = `${containerWidth / 2 + x}px`;
      point.style.top = `${containerHeight / 2 + y}px`;

      t += 0.005;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <p>Event Loop</p>
      <div ref={containerRef} className={styles.container}>
        <Circle/>
        <Point ref={pointRef}/>
      </div>
    </>


  )
    ;
}

export default EventLoop;