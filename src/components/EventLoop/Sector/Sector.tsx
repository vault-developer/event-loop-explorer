import styles from './Sector.module.css';

function Sector({degree, colorVar}: {degree: number, colorVar: string}) {
  return (
      <div
        className={styles.sector}
        style={{
          '--custom-sector-color': `var(${colorVar})`,
          transform: `rotate(${degree}deg)`
        } as React.CSSProperties}
      />
  );
}

export default Sector;