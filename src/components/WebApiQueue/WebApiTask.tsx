import styles from "./WebApiQueue.module.css";
import {nodeFactory} from "../../utils/nodes/factory.ts";
import {NodeClass} from "../../utils/nodes/Node.abstract.ts";
import {Literal} from "acorn";
import {useEventLoopTime} from "../../store/store.ts";
import {useEffect, useRef, useState} from "react";

function WebApiTask({task}: { task: NodeClass }) {
  const serializedArgs = task.args?.map((arg) => nodeFactory({
    node: arg,
    context: task.context,
    params: task.params,
  }).serialize()).join(', ') ?? '';
  const serialized = `${task.serialize()}(${serializedArgs})`;
  const delay = ((task.args?.[1] as Literal).value ?? 0) as number;
  const mutable = useEventLoopTime(state => state.mutable);
  const finish = useRef(mutable.time + delay);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const checkProgress = () => {
      const remainingTime = finish.current - mutable.time;
      const progressPercentage = Math.trunc((remainingTime / delay) * 100);
      const newProgress = Math.max(0, Math.min(progressPercentage, 100));
      setProgress(newProgress);

      if (newProgress > 0) {
        setTimeout(checkProgress, 250);
      } else {
        // TODO: remove by id
        // push to stack queue
      }
    }
    checkProgress();
  }, []);

  return (
    <>
      <div key={serialized} className={styles.task}>
        <div>{serialized}</div>
        <div className={styles.counter}>{progress as number}</div>
      </div>
    </>

  )
}

export default WebApiTask;