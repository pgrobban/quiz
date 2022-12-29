import { Button } from "@mui/material";
import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import { NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER, QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  if (!activeGame) {
    return null;
  }

  const { questionStatus, round, currentQuestion } = activeGame;
  console.log("*** game", activeGame)

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
                    currentQuestion.orderedTeamsLeftToAnswer && (
                      <>
                        Requesting answer from{" "}
                        {currentQuestion.orderedTeamsLeftToAnswer[0]}
                        <>
                          <h4>Verified accepted answers</h4>
                          <div>
                            {currentQuestion.question.possibleAnswers.map(
                              (possibleAnswer) => {
                                const { answerText, points } = possibleAnswer;
                                return (
                                  <Button
                                    key={answerText}
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: 10 }}
                                    onClick={() => gameHandler.requestVerificationOfAnswer(answerText)}
                                  >
                                    {answerText}
                                    <br />({points} pts)
                                  </Button>
                                );
                              }
                            )}
                          </div>

                          <Button
                            variant="contained"
                            color="warning"
                            style={{ margin: 10 }}
                            onClick={() => gameHandler.requestVerificationOfAnswer(NON_VERIFIED_ANSWER)}
                          >
                            Accept a non-verified answer
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            style={{ margin: 10 }}
                            onClick={() => gameHandler.requestVerificationOfAnswer(NO_OR_INVALID_ANSWER)}
                          >
                            Invalid or no answer (100 pts)
                          </Button>
                        </>
                      </>
                    )}
                </>
              )}
            </>
          </>
        )}

        <ScoreList />
      </main>
    </>
  );
}

export default withReconnect(Game);
