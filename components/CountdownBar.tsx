import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import classNames from "classnames";

interface Props {
  to: number;
  callback: () => void;
}

export default function CountdownBar(props: Props) {
  const { to, callback } = props;
  const [score, setScore] = useState(100);
  if (to > 100 || to < 0) {
    throw new Error('Invalid value for `')
  }

  const isIncorrectAnswer = to === 100;

  useEffect(() => {
    const updateLinesInterval = setInterval(() => {
      if (score === to) {
        clearInterval(updateLinesInterval);
        callback();
        return;
      }
        setScore(score-1);
    }, 100);

    return () => clearInterval(updateLinesInterval);
  }, [score, to, callback])

  return (
    <div className={styles.countdownBarContainer}>
      <div className={classNames(styles.countdownBarEllipse, styles.background, styles.countdownBarTextContainer)}>
        <span className={classNames(styles.countdownBarText, { [styles.incorrectAnswerText]: isIncorrectAnswer})}>{isIncorrectAnswer ? 'X' : score}</span>
      </div>

      <div className={classNames(styles.countdownLines, { [styles.incorrectAnswerLines] : isIncorrectAnswer })} style={{ marginTop: 8-(4*(score-100)) }}>
        {
          new Array(score).fill(true).map((_, index) => <hr key={index} id={index === 0 ? styles.countdownBarTopLine : ''} />)
        }
      </div>
    </div>
  );
}
