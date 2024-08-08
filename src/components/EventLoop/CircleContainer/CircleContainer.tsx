import styles from './CircleContainer.module.css';
import {ReactNode} from "react";

interface ContainerProps {
  children: ReactNode;
}

function CircleContainer({children}: ContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default CircleContainer;