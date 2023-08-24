import { useEffect, useState, useRef, cloneElement, ReactElement } from "react";
import styles from "../styles/Home.module.css";
import classNames from "classnames";

const LINES_TO_ANIMATE_AFTER_COUNTDOWN = 5;
const COUNTDOWN_DELAY_MS = 100;
const lineIndexesToAnimateAfterCountdown = [1, 3, 6, 10, 15];

interface Props {
  to: number;
  callback: () => void;
}

export default function CountdownBar(props: Props) {
  const { to, callback } = props;
  const [value, setValue] = useState(100);
  const [countdownAnimationInProgress, setCountdownAnimationInProgress] =
    useState(false);
  const [
    remainingLinesAnimationInProgress,
    setRemainingLinesAnimationInProgress,
  ] = useState(false);
  const [remainingLinesToAnimate, setRemainingLinesToAnimate] = useState(0);
  const [linesOpacities, setLinesOpacities] = useState(new Array(100).fill(1));

  if (typeof to !== "number" || to > 100 || to < 0) {
    throw new Error(`Invalid value for to: ${to}`);
  }

  const isIncorrectAnswer = to === 100;
  const incorrectAnswerTextRef = useRef<HTMLSpanElement>(null);
  const topBarRef = useRef<HTMLHRElement>(null);

  // wait until animation has ended for accepted answers
  useEffect(() => {
    if (isIncorrectAnswer) {
      return;
    }

    const updateLinesInterval = setInterval(() => {
      setCountdownAnimationInProgress(true);

      if (value === to) {
        clearInterval(updateLinesInterval);
        setCountdownAnimationInProgress(false);
        setRemainingLinesAnimationInProgress(true);
        setRemainingLinesToAnimate(LINES_TO_ANIMATE_AFTER_COUNTDOWN);
        return;
      }
      if (!countdownAnimationInProgress) {
        setCountdownAnimationInProgress(true);
      }
      setValue(value - 1);
    }, COUNTDOWN_DELAY_MS);
    return () => clearInterval(updateLinesInterval);
  }, [value, to]);

  useEffect(() => {
    if (!remainingLinesAnimationInProgress) {
      return;
    }

    let lines = LINES_TO_ANIMATE_AFTER_COUNTDOWN;
    const updateRemainingLinesInterval = setInterval(() => {
      if (lines === 0) {
        setRemainingLinesAnimationInProgress(false);
        clearInterval(updateRemainingLinesInterval);
        return;
      } else {
        lines--;
        setRemainingLinesToAnimate(lines);
      }
    }, COUNTDOWN_DELAY_MS/2);
  }, [remainingLinesAnimationInProgress]);

  useEffect(() => {
    incorrectAnswerTextRef.current?.addEventListener("animationend", callback);
  });

  useEffect(() => {
    const opacities = [...linesOpacities];
    opacities[value - 1] = 1;

    for (let i = value; i < 100; i++) {
      opacities[i] = 0;
    }

    if (countdownAnimationInProgress) {
      for (let i = 0; i < lineIndexesToAnimateAfterCountdown.length; i++) {
        const lineIndexToAnimate =
          value + lineIndexesToAnimateAfterCountdown[i];
        if (opacities[lineIndexToAnimate] !== undefined) {
          opacities[lineIndexToAnimate] = 0.2*(lineIndexesToAnimateAfterCountdown.length-i);
        }
      }
    }

    if (remainingLinesToAnimate) {
      for (let i = 0; i < lineIndexesToAnimateAfterCountdown.length; i++) {
        const lineIndexToAnimate =
          value + lineIndexesToAnimateAfterCountdown[i];
        if (opacities[lineIndexToAnimate] !== undefined) {
          opacities[lineIndexToAnimate] += ((remainingLinesToAnimate-i)*0.2);
        }
      }
    }
    if (remainingLinesToAnimate === 1) {
      callback();
    }

    setLinesOpacities(opacities);
  }, [value, countdownAnimationInProgress, remainingLinesToAnimate]);

  return (
    <div className={styles.countdownBarContainer}>
      <div
        className={classNames(
          styles.countdownBarEllipse,
          styles.background,
          styles.countdownBarTextContainer
        )}
      >
        <span
          ref={incorrectAnswerTextRef}
          className={classNames(styles.countdownBarText, {
            [styles.incorrectAnswerText]: isIncorrectAnswer,
          })}
        >
          {isIncorrectAnswer ? "X" : value}
        </span>
      </div>

      <div
        className={classNames(styles.countdownLinesColumn, {
          [styles.incorrectAnswerLines]: isIncorrectAnswer,
        })}
        style={{
          marginTop: 8,
        }}
      >
        {linesOpacities.map((opacity, index) => {
          const isTopBar = index === value - 1;
          return (
            <hr
              key={index}
              id={isTopBar ? styles.countdownBarTopLine : ""}
              style={{ opacity }}
            />
          );
        })}
      </div>
    </div>
  );
}
