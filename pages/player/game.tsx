import CountdownBar from "../../components/CountdownBar";
import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import {
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../../models/types";
import styles from "../../styles/Home.module.css";
import { NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER } from "../../models/types";
import { useState } from "react";
import { getScoreFromLatestAnswer } from "../../controllers/helpers";
import CluesAndAnswersBoard from "../../components/CluesAndAnswersBoard";
import PossibleAnswersBoard from "../../components/PossibleAnswersBoard";
import PictureBoard from "../../components/PictureBoard";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;
  const [isAnimatingScore, setIsAnimatingScore] = useState<boolean>(false);

  const { gameStatus, questionStatus, currentQuestion, round } = gameState || {};
  if (!gameState) {
    return null;
  }

  const { acceptableAnswers } = currentQuestion?.question || {};
  const awardingPointsInProgress = questionStatus === QuestionStatus.awardingPoints;

  const countdownTo = getScoreFromLatestAnswer(gameState);

  const onFinishedAnimatingScore = () => {
    setIsAnimatingScore(false);
    gameHandler.requestAddingScore();
  };

  const getGameBoard = () => {

    switch (gameState.round) {
      case GameRound.cluesAndAnswers:
        return <CluesAndAnswersBoard game={gameState} />
      case GameRound.possibleAnswers:
        return <PossibleAnswersBoard game={gameState} />;
      case GameRound.pictureBoard:
        return <PictureBoard game={gameState} />;
      default:
        return null;
    }
  }
  

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        {gameStatus === GameStatus.waitingForHost && (
          <h4>Waiting for host...</h4>
        )}
        {gameStatus === GameStatus.inProgress && (
          <>
            {questionStatus === QuestionStatus.waitingForRound && (
              <h4>Waiting for host to pick a round...</h4>
            )}
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <h4>Waiting for host to pick a question...</h4>
            )}
            {questionStatus &&
              [
                QuestionStatus.receivedQuestion,
                QuestionStatus.waitingForTeamAnswer,
                QuestionStatus.announcingResults,
                QuestionStatus.awardingPoints,
                QuestionStatus.pointsAdded,
              ].includes(questionStatus) &&
              currentQuestion && (
                <>
                  <h4>Question {currentQuestion.questionInRound}</h4>
                  <h2>{currentQuestion.question.questionText}</h2>
                  <p>{currentQuestion.question.explanation}</p>

                  {getGameBoard()}

                  {questionStatus === QuestionStatus.waitingForTeamAnswer &&
                    currentQuestion.orderedTeamsLeftToAnswer && (
                      <h4>
                        Waiting for answer from team{" "}
                        {currentQuestion.orderedTeamsLeftToAnswer[0]}
                      </h4>
                    )}

                  {questionStatus === QuestionStatus.awardingPoints &&
                    currentQuestion.lastAnswer && (
                      <>
                        <h4>
                          Checking answer...{" "}
                          {![
                            NON_VERIFIED_ANSWER,
                            NO_OR_INVALID_ANSWER,
                          ].includes(currentQuestion.lastAnswer) &&
                            currentQuestion.lastAnswer}
                        </h4>
                        <CountdownBar
                          to={countdownTo}
                          callback={() => setIsAnimatingScore(true)}
                        />
                      </>
                    )}
                </>
              )}
          </>
        )}

        <ScoreList
          animate={isAnimatingScore}
          callback={() => onFinishedAnimatingScore()}
        />
      </main>
    </>
  );
}

export default Game;
