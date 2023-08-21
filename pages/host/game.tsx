import { Button } from "@mui/material";
import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import {
  AcceptableAnswerInGame,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;

  if (!gameState) {
    return null;
  }

  const { questionStatus, round, currentQuestion } = gameState;
  const { acceptableAnswers } = currentQuestion?.question || {};

  function getAcceptableAnswerButton(
    answerText: string,
    points: number,
    answered: boolean
  ) {
    return (
      <Button
        key={answerText}
        variant="contained"
        color="primary"
        style={{ margin: 10 }}
        onClick={() => gameHandler.requestVerificationOfAnswer(answerText)}
        disabled={answered}
      >
        {answerText}
        <br />({points} pts)
      </Button>
    );
  }

  function getAcceptableAnswerButtons(
    acceptableAnswers: AcceptableAnswerInGame[]
  ) {
    return acceptableAnswers.map((acceptableAnswer) => {
      const { answerText, points, answered } = acceptableAnswer;
      return getAcceptableAnswerButton(answerText, points, answered);
    });
  }

  return (
    <>
      <main className={styles.main}>
        <h3>Hosting</h3>

        {!round && <RoundPicker />}
        {round && (
          <>
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <QuestionPicker />
            )}
            <>
              {currentQuestion && (
                <>
                  <h4>Question {currentQuestion.questionInRound}</h4>
                  <h2>{currentQuestion.question.questionText}</h2>

                  {questionStatus === QuestionStatus.receivedQuestion && (
                    <>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => gameHandler.requestTeamAnswer()}
                      >
                        Request first team answer
                      </Button>
                    </>
                  )}

                  {questionStatus === QuestionStatus.waitingForTeamAnswer &&
                    currentQuestion.orderedTeamsLeftToAnswer &&
                    acceptableAnswers && (
                      <>
                        Requesting answer from{" "}
                        {currentQuestion.orderedTeamsLeftToAnswer[0]}
                        <>
                          <h4>Verified accepted answers</h4>
                          <div>
                            {isGroupedAcceptableAnswers(acceptableAnswers) && (
                              <>
                                {Object.keys(acceptableAnswers).map((key) => {
                                  return (
                                    <>
                                      <h3>{key}</h3>
                                      {getAcceptableAnswerButtons(
                                        acceptableAnswers[key]
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            )}
                            {!isGroupedAcceptableAnswers(acceptableAnswers) &&
                              getAcceptableAnswerButtons(acceptableAnswers)}
                          </div>

                          <Button
                            variant="contained"
                            color="warning"
                            style={{ margin: 10 }}
                            onClick={() =>
                              gameHandler.requestVerificationOfAnswer(
                                NON_VERIFIED_ANSWER
                              )
                            }
                          >
                            Accept a non-verified answer
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            style={{ margin: 10 }}
                            onClick={() =>
                              gameHandler.requestVerificationOfAnswer(
                                NO_OR_INVALID_ANSWER
                              )
                            }
                          >
                            Invalid or no answer (100 pts)
                          </Button>
                        </>
                      </>
                    )}

                  {questionStatus === QuestionStatus.pointsAdded && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: 10 }}
                      onClick={() => gameHandler.requestContinueGame()}
                    >
                      Continue game
                    </Button>
                  )}

                  {questionStatus === QuestionStatus.announcingResults && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: 10 }}
                      onClick={() => gameHandler.requestEndQuestion()}
                    >
                      End question
                    </Button>
                  )}
                </>
              )}
            </>
          </>
        )}

        <ScoreList animate />
      </main>
    </>
  );
}

export default withReconnect(Game);
