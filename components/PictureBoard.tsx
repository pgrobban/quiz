import classnames from "classnames";
import { Game, GameStatus, QuestionStatus, isGroupedAcceptableAnswers } from "../models/types";
import styles from "../styles/Home.module.css";
import BaseGameBoard from "./BaseGameBoard";
import { useEffect, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
  game: Game;
}

export default function PictureBoard(props: Props) {
  const { game } = props;
  if (game.gameStatus !== GameStatus.inProgress || !game.currentQuestion?.question) {
    throw new Error('Can only show PictureBoard of a game in progress and that has an active question.');
  }

  const [answerCache, setAnswerCache] = useState<string[]>([]);
  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { questionText, acceptableAnswers } = question;

  useEffect(() => {
    if (lastAnswer && !answerCache.includes(lastAnswer) && questionStatus !== QuestionStatus.awardingPoints) {
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
          const shouldShowAnswer = answered || (questionStatus === QuestionStatus.announcingResults);
          const shouldShowScore = answerCache.includes(answerText) || (questionStatus === QuestionStatus.announcingResults);

          return (
            <div key={index}>
              <div
                className={classnames(
                  styles.pictureBoardContainer,
                  styles.pictureBoardPictureContainer
                )}
                style={{
                  backgroundImage: `url('/images/${clue}')`,
                }}
              />
              <div className={styles.pictureBoardAnswerContainer}>
                {shouldShowAnswer && (
                  <>
                    <div className={styles.pictureBoardAnswerText}>
                      {answerText}
                    </div>
                    <div className={styles.pictureBoardPointsContainer}>
                      <span>{shouldShowScore ? points : ''}</span>
                    </div>
                  </>
                )}
                {!answered && questionStatus !== QuestionStatus.announcingResults && (
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
