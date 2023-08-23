import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import BaseGameBoard from "./BaseGameBoard";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

interface Props {
  game: Game;
}

export default function PossibleAnswersBoard(props: Props) {
  const { game } = props;
  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.possibleAnswers
  ) {
    throw new Error("PossibleAnswersBoard Assertion Error");
  }

  const [answerCache, setAnswerCache] = useState<string[]>([]);
  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { acceptableAnswers } = question;

  useEffect(() => {
    if (
      lastAnswer &&
      !answerCache.includes(lastAnswer) &&
      questionStatus !== QuestionStatus.awardingPoints
    ) {
      setAnswerCache([...answerCache, lastAnswer]);
    }
  }, [answerCache, lastAnswer, questionStatus]);

  if (isGroupedAcceptableAnswers(acceptableAnswers)) {
    throw new Error("Only support for non-grouped acceptable answers");
  }

  return (
    <BaseGameBoard>
      <div>
        {acceptableAnswers.map((answer) => {
          const { answerText, answered, points } = answer;

          const shouldShowPoints =
            answered || questionStatus === QuestionStatus.announcingResults;

          return (
            <div
              key={answerText}
              className={styles.possibleAnswersBoardContainer}
            >
              <div className={styles.possibleAnswersBoardAnswerContainer}>
                <span>{answerText}</span>
              </div>
              <div className={styles.possibleAnswersBoardPointsContainer}>
                <span>
                  {shouldShowPoints ? (points === 100 ? "X" : points) : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseGameBoard>
  );
}
