import classnames from "classnames";
import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import styles from "../styles/Home.module.css";
import BaseGameBoard from "./BaseGameBoard";
import { useEffect, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
  game: Game;
}

export default function PictureBoard(props: Props) {
  const { game } = props;
  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.pictureBoard
  ) {
    throw new Error("PictureBoard Assertion Error");
  }

  const [answerCache, setAnswerCache] = useState<string[]>([]);
  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { questionText, acceptableAnswers } = question;

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
      <div className={styles.pictureBoard}>
        <div
          className={classnames(
            styles.pictureBoardContainer,
            styles.pictureBoardQuestionText
          )}
        >
          {questionText}
        </div>
        {acceptableAnswers.map((acceptableAnswer, index) => {
          const { points, answerText, clue, answered } = acceptableAnswer;
          const shouldShowAnswer =
            answered || questionStatus === QuestionStatus.announcingResults;
          const shouldShowPoints =
            answerCache.includes(answerText) ||
            questionStatus === QuestionStatus.announcingResults;
          const imageUrl = `/images/${clue}`;

          return (
            <div key={index}>
              <a href={imageUrl}>
                <div
                  className={classnames(
                    styles.pictureBoardContainer,
                    styles.pictureBoardPictureContainer
                  )}
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                />
              </a>
              <div className={styles.pictureBoardAnswerContainer}>
                {shouldShowAnswer && (
                  <>
                    <div className={styles.pictureBoardAnswerText}>
                      {answerText}
                    </div>
                    <div className={styles.pictureBoardPointsContainer}>
                      <span>{shouldShowPoints ? points : ""}</span>
                    </div>
                  </>
                )}
                {!answered &&
                  questionStatus !== QuestionStatus.announcingResults && (
                    <div style={{ margin: "0 auto" }}>{alphabet[index]}</div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </BaseGameBoard>
  );
}
