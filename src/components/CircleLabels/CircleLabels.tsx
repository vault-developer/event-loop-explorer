import styles from './CircleLabels.module.css';
import {EVENT_LOOP_SECTORS_POSITION_DEGREE} from "../../constants.ts";

function CircleLabels() {
  const realRenderDegree = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.render - 10)) % 360;
  const renderCos = Math.cos(realRenderDegree * Math.PI / 180);
  const renderSin = Math.sin(realRenderDegree * Math.PI / 180);

  const realRenderTask = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.task - 10)) % 360;
  const taskCos = Math.cos(realRenderTask * Math.PI / 180);
  const taskSin = Math.sin(realRenderTask * Math.PI / 180);

  const realRenderMicroTask0 = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[0] - 10)) % 360;
  const microTaskCos0 = Math.cos(realRenderMicroTask0 * Math.PI / 180);
  const microTaskSin0 = Math.sin(realRenderMicroTask0 * Math.PI / 180);

  const realRenderMicroTask1 = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[1] - 10)) % 360;
  const microTaskCos1 = Math.cos(realRenderMicroTask1 * Math.PI / 180);
  const microTaskSin1 = Math.sin(realRenderMicroTask1 * Math.PI / 180);

  const realRenderMicroTask2 = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[2] - 10)) % 360;
  const microTaskCos2 = Math.cos(realRenderMicroTask2 * Math.PI / 180);
  const microTaskSin2 = Math.sin(realRenderMicroTask2 * Math.PI / 180);

  const realRenderMicroTask3 = (360 - (EVENT_LOOP_SECTORS_POSITION_DEGREE.microtasks[3] - 10)) % 360;
  const microTaskCos3 = Math.cos(realRenderMicroTask3 * Math.PI / 180);
  const microTaskSin3 = Math.sin(realRenderMicroTask3 * Math.PI / 180);

  return (
    <div className={styles.circleLabels}>
      <p style={{
        position: "absolute",
        left: `${300 + renderCos * (300 - 25)}px`,
        top: `${300 + renderSin * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>R</p>
      <p style={{
        position: "absolute",
        left: `${300 + taskCos * (300 - 25)}px`,
        top: `${300 + taskSin * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>T</p>
      <p style={{
        position: "absolute",
        left: `${300 + microTaskCos0 * (300 - 25)}px`,
        top: `${300 + microTaskSin0 * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>M</p>
      <p style={{
        position: "absolute",
        left: `${300 + microTaskCos1 * (300 - 25)}px`,
        top: `${300 + microTaskSin1 * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>M</p>
      <p style={{
        position: "absolute",
        left: `${300 + microTaskCos2 * (300 - 25)}px`,
        top: `${300 + microTaskSin2 * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>M</p>
      <p style={{
        position: "absolute",
        left: `${300 + microTaskCos3 * (300 - 25)}px`,
        top: `${300 + microTaskSin3 * (300 - 25)}px`,
        margin: 0,
        transform: 'translate(-50%, -50%)',
      }}>M</p>

    </div>
  );
}

export default CircleLabels;