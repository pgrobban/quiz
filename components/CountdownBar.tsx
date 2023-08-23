import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import classNames from "classnames";

interface Props {
  to: number;
  callback: () => void;
}

export default function CountdownBar(props: Props) {
  const { to, callback } = props;
  const [value, setValue] = useState(100);
  if (to > 100 || to < 0) {
    throw new Error('Invalid value for `')
  }

  const isIncorrectAnswer = to === 100;
  const incorrectAnswerTextRef = useRef<HTMLSpanElement>(null);

  // wait until animation has ended for correct answers
  useEffect(() => {
    if (isIncorrectAnswer) {
      return;
    }

    const updateLinesInterval = setInterval(() => {
      if (value === to) {
        clearInterval(updateLinesInterval);
        callback();
        return;
      }
        setValue(value-1);
    }, 100);

    return () => clearInterval(updateLinesInterval);
  }, [value, to, callback])

  // for incorrect answers
  useEffect(() => {
    incorrectAnswerTextRef.current?.addEventListener('animationend', callback);
  })

  return (
    <div className={styles.countdownBarContainer}>
      <div className={classNames(styles.countdownBarEllipse, styles.background, styles.countdownBarTextContainer)}>
        <span ref={incorrectAnswerTextRef} className={classNames(styles.countdownBarText, { [styles.incorrectAnswerText]: isIncorrectAnswer})}>{isIncorrectAnswer ? 'X' : value}</span>
      </div>

      <div className={classNames(styles.countdownLines, { [styles.incorrectAnswerLines] : isIncorrectAnswer })} style={{ marginTop: 8-(4*(value-100)) }}>
        {
          new Array(value).fill(true).map((_, index) => <hr key={index} id={index === 0 ? styles.countdownBarTopLine : ''} />)
        }
      </div>
    </div>
  );
}
