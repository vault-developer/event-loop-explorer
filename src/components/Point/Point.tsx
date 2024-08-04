import { forwardRef } from 'react';
import styles from './Point.module.css';

const Point = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} className={styles.point}></div>;
});

export default Point;