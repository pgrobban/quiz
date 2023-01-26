import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  to: number;
  callback: () => void;
}

export default function CountdownBar(props: Props) {
  const { to, callback } = props;
  const [score, setScore] = useState(100);

  useEffect(() => {
    const i = setInterval(() => {
      if (score === to) {
        clearInterval(i);
        callback();
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
