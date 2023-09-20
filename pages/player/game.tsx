import { useState } from "react";
import CluesAndAnswersBoard from "../../components/CluesAndAnswersBoard";
import CountdownBar from "../../components/CountdownBar";
import PictureBoard from "../../components/PictureBoard";
import PossibleAnswersBoard from "../../components/PossibleAnswersBoard";
import PointsList from "../../components/PointsList";
import { useAppContext } from "../../controllers/AppWrapper";
import { NUMBER_OF_PASSES_FOR_ROUND } from "../../controllers/GameHandler";
import { getPointsFromLatestAnswer } from "../../controllers/helpers";
import {
  GameRound,
  GameStatus,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
  QuestionStatus,
} from "../../models/types";
import styles from "../../styles/Home.module.css";
import classNames from "classnames";
import HeadToHeadAnswers from "../../components/HeadToHeadAnswers";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;
  const [isAnimatingPoints, setIsAnimatingPoints] = useState<boolean>(false);

  const {
    gameStatus,
    questionStatus,
    currentQuestion,
    round,
    headToHeadEnabled,
  } = gameState || {};
  if (!gameState) {
    return null;
  }

  const {
    questionInRound,
    question,
    lastAnswer,
    orderedTeamsLeftToAnswer,
    pass,
    headToHeadAnswers,
  } = currentQuestion || {};
  const { questionText, explanation } = question || {};
  const numberOfPassesForRound = round ? NUMBER_OF_PASSES_FOR_ROUND[round] : 0;

  const countdownTo = getPointsFromLatestAnswer(gameState);

  const onFinishedAnimatingPoints = () => {
    setIsAnimatingPoints(false);
    gameHandler.requestAddingPoints();
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

  const currentTeamName = orderedTeamsLeftToAnswer?.[0];

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        <div style={{ display: "flex" }}>
          <div
            className={styles.mainFrame}
            style={{
              marginRight: 10,
              minHeight: 800,
              minWidth: 800,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {gameStatus === GameStatus.waitingForHost && (
              <h4>Waiting for host...</h4>
            )}
            {gameStatus === GameStatus.inProgress && questionStatus && (
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
                  QuestionStatus.receivedHeadToHeadAnswers,
                ].includes(questionStatus) &&
                  currentQuestion && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4>Question {questionInRound}</h4>
                      <h2>{questionText}</h2>
                      <p style={{ margin: 15 }}>
                        {explanation?.split("\n").map((explanationChunk) => (
                          <>
                            {explanationChunk}
                            <br />
                          </>
                        ))}
                      </p>
                      {!headToHeadEnabled && numberOfPassesForRound > 1 && (
                        <p>
                          Pass {pass}/{numberOfPassesForRound}
                        </p>
                      )}

                      {getGameBoard()}

                      {questionStatus === QuestionStatus.waitingForTeamAnswer &&
                        orderedTeamsLeftToAnswer && (
                          <>
                            {!headToHeadEnabled && (
                              <h4>
                                Waiting for answer from team {currentTeamName}
                              </h4>
                            )}
                            {headToHeadEnabled && (
                              <h4>
                                Waiting for 3 answers from team{" "}
                                {currentTeamName}
                              </h4>
                            )}
                          </>
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
                          </>
                        )}

                      {questionStatus ===
                        QuestionStatus.receivedHeadToHeadAnswers &&
                        headToHeadAnswers &&
                        currentTeamName && (
                          <HeadToHeadAnswers
                            answers={headToHeadAnswers}
                            teamName={currentTeamName}
                          />
                        )}
                    </div>
                  )}
              </>
            )}
          </div>

          <PointsList
            animate={isAnimatingPoints}
            callback={() => {
              console.log("*** callback");
              onFinishedAnimatingPoints();
            }}
          />

          <div style={{ width: 300 }}>
            {questionStatus === QuestionStatus.awardingPoints && (
              <CountdownBar
                to={countdownTo}
                callback={() => setIsAnimatingPoints(true)}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Game;
