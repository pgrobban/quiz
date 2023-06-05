import CountdownBar from "../../components/CountdownBar";
import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameStatus, QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";
import { NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER } from "../../models/types";
import { useState } from "react";
import { getScoreFromLatestAnswer } from "../../controllers/helpers";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const game = gameHandler.getActiveGame();
  const [isAnimatingScore, setIsAnimatingScore] = useState<boolean>(false);
  const { gameStatus, questionStatus, currentQuestion } = game || {};
  if (!game) {
    return null;
  }


  const countdownTo = getScoreFromLatestAnswer(gameHandler);

  const onFinishedAnimatingScore = () => {
    setIsAnimatingScore(false);
    gameHandler.requestAddingScoreAndNextTeamAnswer();
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
              ].includes(questionStatus) &&
              currentQuestion && (
                <>
                  <h4>Question {currentQuestion.questionInRound}</h4>
                  <h2>{currentQuestion.question.questionText}</h2>

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
                        <CountdownBar to={countdownTo} callback={() => setIsAnimatingScore(true)} />
                      </>
                    )}
                </>
              )}
          </>
        )}

        <ScoreList animate={isAnimatingScore} callback={() => onFinishedAnimatingScore()} />
      </main>
    </>
  );
}

export default withReconnect(Game);
