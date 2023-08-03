import classnames from "classnames";
import { QuestionInGame, isGroupedAcceptableAnswers } from "../models/types";
import styles from "../styles/Home.module.css";
import BaseGameBoard from "./BaseGameBoard";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
  questionInGame: QuestionInGame;
}

export default function PictureBoard({ questionInGame }: Props) {
  const { questionText, acceptableAnswers } = questionInGame;
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
                {answered && (
                  <>
                    <div className={styles.pictureBoardAnswerText}>
                      {answerText}
                    </div>
                    <div className={styles.pictureBoardPointsContainer}>
                      <span>{points}</span>
                    </div>
                  </>
                )}
                {!answered && (
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
