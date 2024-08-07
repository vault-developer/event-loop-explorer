import styles from './CircleLabels.module.css';
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../../constants.ts";

interface Event {
  title: string;
  type: 'task' | 'microtask' | 'render';
  degree: number;
}

const events: Event[] = [
  {title: 'R', type: 'render', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.render - 10)) % 360},
  {title: 'T', type: 'task', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.task - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[0] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[1] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[2] - 10)) % 360},
  {title: 'MT', type: 'microtask', degree: (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[3] - 10)) % 360},
];

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