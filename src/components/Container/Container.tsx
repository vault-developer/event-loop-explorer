import styles from './Container.module.css';
import {ReactNode} from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({children}: ContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default Container;