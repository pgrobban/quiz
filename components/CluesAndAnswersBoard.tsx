import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import BaseGameBoard from "./BaseGameBoard";
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
    throw new Error("CluesAndAnswersBoard Assertion Error");
  }

  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { acceptableAnswers } = question;

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
          const shouldShowPoints =
            (answered &&
              ((lastAnswer === answerText &&
                questionStatus !== QuestionStatus.awardingPoints) ||
                lastAnswer !== answerText)) ||
            questionStatus === QuestionStatus.announcingResults;

          return (
            <div
              key={answerText}
              className={styles.cluesAndAnswersBoardContainer}
            >
              <div className={styles.cluesAndAnswersBoardClueContainer}>
                <span>{clue}</span>
              </div>
              <div className={styles.cluesAndAnswersBoardPointsContainer}>
                <span>{shouldShowPoints ? points : ""}</span>
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
