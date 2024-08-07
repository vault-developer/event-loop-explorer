import styles from './CircleLabels.module.css';
import {events} from "../EventLoop.data.ts";

const enhancedEvents = events.map(event => {
  const cos = Math.cos(event.degree * Math.PI / 180);
  const sin = Math.sin(event.degree * Math.PI / 180);
  const leftOffset = 300 + cos * (300 - 25);
  const topOffset = 300 + sin * (300 - 25);
  return {
    ...event,
    leftOffset,
    topOffset,
  };
});

function CircleLabels() {
  return (
    <div className={styles.circleLabels}>
      {enhancedEvents.map(({title, leftOffset, topOffset}) => (
        <p style={{
          position: "absolute",
          left: `${leftOffset}px`,
          top: `${topOffset}px`,
          margin: 0,
          transform: 'translate(-50%, -50%)',
        }}>{title}</p>
      ))}
    </div>
  );
}

export default CircleLabels;