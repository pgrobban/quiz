import { useState } from "react";
import CluesAndAnswersBoard from "../../components/CluesAndAnswersBoard";
import CountdownBar from "../../components/CountdownBar";
import PictureBoard from "../../components/PictureBoard";
import PossibleAnswersBoard from "../../components/PossibleAnswersBoard";
import ScoreList from "../../components/ScoreList";
import { useAppContext } from "../../controllers/AppWrapper";
import { NUMBER_OF_PASSES_FOR_ROUND } from "../../controllers/GameHandler";
import { getScoreFromLatestAnswer } from "../../controllers/helpers";
import {
  GameRound,
  GameStatus,
  NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER,
  QuestionStatus
} from "../../models/types";
import styles from "../../styles/Home.module.css";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;
  const [isAnimatingScore, setIsAnimatingScore] = useState<boolean>(false);

  const { gameStatus, questionStatus, currentQuestion, round } =
    gameState || {};
  if (!gameState) {
    return null;
  }

  const { questionInRound, question, lastAnswer, orderedTeamsLeftToAnswer } = currentQuestion || {};
  const { questionText, explanation } = question || {};

  const countdownTo = getScoreFromLatestAnswer(gameState);

  const onFinishedAnimatingScore = () => {
    setIsAnimatingScore(false);
    gameHandler.requestAddingScore();
  };

  const getGameBoard = () => {
    switch (gameState.round) {
      case GameRound.cluesAndAnswers:
        return <CluesAndAnswersBoard game={gameState} />;
      case GameRound.possibleAnswers:
        return <PossibleAnswersBoard game={gameState} />;
      case GameRound.pictureBoard:
        return <PictureBoard game={gameState} />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        {gameStatus === GameStatus.waitingForHost && (
          <h4>Waiting for host...</h4>
        )}
        {gameStatus === GameStatus.inProgress && questionStatus && round && (
          <>
            {questionStatus === QuestionStatus.waitingForRound && (
              <h4>Waiting for host to pick a round...</h4>
            )}
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <h4>Waiting for host to pick a question...</h4>
            )}
            {[
              QuestionStatus.receivedQuestion,
              QuestionStatus.waitingForTeamAnswer,
              QuestionStatus.announcingResults,
              QuestionStatus.awardingPoints,
              QuestionStatus.pointsAdded,
            ].includes(questionStatus) &&
              currentQuestion && (
                <>
                  <h4>Question {questionInRound}</h4>
                  <h2>{questionText}</h2>
                  <p>{explanation}</p>
                  {NUMBER_OF_PASSES_FOR_ROUND[round] > 0 && <p>Pass </p>}

                  {getGameBoard()}

                  {questionStatus === QuestionStatus.waitingForTeamAnswer &&
                    orderedTeamsLeftToAnswer && (
                      <h4>
                        Waiting for answer from team{" "}
                        {orderedTeamsLeftToAnswer[0]}
                      </h4>
                    )}

                  {questionStatus === QuestionStatus.awardingPoints &&
                    currentQuestion.lastAnswer && (
                      <>
                        <h4>
                          Checking answer...{" "}
                          {lastAnswer &&
                            ![
                              NON_VERIFIED_ANSWER,
                              NO_OR_INVALID_ANSWER,
                            ].includes(lastAnswer)}
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
