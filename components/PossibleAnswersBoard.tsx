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

export default function PossibleAnswersBoard(props: Props) {
  const { game } = props;
  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.possibleAnswers
  ) {
    throw new Error("PossibleAnswersBoard Assertion Error");
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
          const { answerText, answered, points } = answer;

          const shouldShowPoints =
            (answered &&
              ((lastAnswer === answerText &&
                questionStatus !== QuestionStatus.awardingPoints) ||
                lastAnswer !== answerText)) ||
            questionStatus === QuestionStatus.announcingResults;

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
