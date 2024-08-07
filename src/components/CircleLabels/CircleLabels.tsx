import styles from './CircleLabels.module.css';
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../../constants.ts";

const entitiesOldDegree = {
  render: EVENT_LOOP_SECTORS_POSITION_DEGREE.render,
  task: EVENT_LOOP_SECTORS_POSITION_DEGREE.task,
  microtask0: EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[0],
  microtask1: EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[1],
  microtask2: EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[2],
  microtask3: EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[3],
};

const titles = {
  render: 'R',
  task: 'T',
  microtask0: 'MT',
  microtask1: 'MT',
  microtask2: 'MT',
  microtask3: 'MT',
};

const data = Object.entries(entitiesOldDegree).reduce((acc, [key, value]) => {
  const realRenderDegree = (360 - (value - 10)) % 360;
  const renderCos = Math.cos(realRenderDegree * Math.PI / 180);
  const renderSin = Math.sin(realRenderDegree * Math.PI / 180);
  acc.push({
    title: titles[key as keyof typeof titles],
    cos: renderCos,
    sin: renderSin,
  });
  return acc;
}, [] as Array<{ title: string, cos: number, sin: number }>);

function CircleLabels() {
  return (
    <div className={styles.circleLabels}>
      {data.map(({title, cos, sin}) => (
        <p style={{
          position: "absolute",
          left: `${300 + cos * (300 - 25)}px`,
          top: `${300 + sin * (300 - 25)}px`,
          margin: 0,
          transform: 'translate(-50%, -50%)',
        }}>{title}</p>
      ))}
    </div>
  );
}

export default CircleLabels;