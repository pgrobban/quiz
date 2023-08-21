import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import BaseGameBoard from "./BaseGameBoard";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  game: Game;
}

export default function CluesAndAnswersBoard(props: Props) {
  const { game } = props;
  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.cluesAndAnswers
  ) {
    throw new Error("PictureBoard Assertion Error");
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
          const { clue, answerText, answered, points } = answer;
          const shouldShowAnswer =
            answered || questionStatus === QuestionStatus.announcingResults;
          const shouldShowScore =
            answerCache.includes(answerText) ||
            questionStatus === QuestionStatus.announcingResults;

          return (
            <div
              key={answerText}
              className={styles.cluesAndAnswersBoardContainer}
            >
              <div className={styles.cluesAndAnswersBoardClueContainer}>
                <span>{clue}</span>
              </div>
              <div className={styles.cluesAndAnswersBoardScoreContainer}>
                <span>{shouldShowScore ? points : ""}</span>
              </div>

              <div className={styles.cluesAndAnswersBoardAnswerContainer}>
                <span>{shouldShowAnswer ? answerText : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseGameBoard>
  );
}
