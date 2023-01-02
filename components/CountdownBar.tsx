import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function CountdownBar() {
  const [score, setScore] = useState(100);

  useEffect(() => {
    const i = setInterval(() => {
      if (score === 0) {
        clearInterval(i);
        return;
      }
      setScore(score-1);
    }, 100);

    return () => clearInterval(i);
  }, [score])

  return (
    <div className={styles.countdownBarContainer}>
      <div className={`${styles.countdownBarEllipse} ${styles.background}`}>
        <span className={styles.countdownBarText}>{score}</span>
      </div>

      <div className={styles.countdownLines} style={{ marginTop: 8-(4*(score-100)) }}>
        {
          new Array(score).fill(true).map((_, index) => <hr key={index} id={index === 0 ? styles.countdownBarTopLine : ''} />)
        }
      </div>
    </div>
  );
}
