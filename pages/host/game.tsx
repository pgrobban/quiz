import { Button, Table, TableCell, TableRow } from "@mui/material";
import PointsList from "../../components/PointsList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import {
  AcceptableAnswerInGame,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
  QuestionStatus,
} from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";
import { sortBy } from "lodash";
import CheckIcon from "@mui/icons-material/Check";
import { getFlatAcceptableAnswers } from "../../controllers/helpers";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;

  if (!gameState) {
    return null;
  }

  const { questionStatus, round, currentQuestion, headToHeadEnabled } =
    gameState;
  const { questionInRound, question, orderedTeamsLeftToAnswer } =
    currentQuestion || {};
  const { acceptableAnswers, explanation, questionText } = question || {};

  function getAcceptableAnswerButton(answerText: string, answered: boolean) {
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
      </Button>
    );
  }

  function getAcceptableAnswerButtons(
    acceptableAnswers: AcceptableAnswerInGame[]
  ) {
    return acceptableAnswers.map((acceptableAnswer) => {
      const { answerText, answered } = acceptableAnswer;
      return getAcceptableAnswerButton(answerText, answered);
    });
  }

  const flatAcceptableAnswers = (
    acceptableAnswers ? getFlatAcceptableAnswers(acceptableAnswers) : []
  ) as AcceptableAnswerInGame[];

  return (
    <>
      <main className={styles.main}>
        <h3>Hosting</h3>

        {!round && (
          <div>
            <RoundPicker />

            {!headToHeadEnabled && (
              <Button
                onClick={() => gameHandler.requestEnableHeadToHead()}
                color="secondary"
                variant="contained"
              >
                Enable head to head
              </Button>
            )}
          </div>
        )}
        {round && (
          <>
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <QuestionPicker />
            )}
            <>
              {currentQuestion && (
                <>
                  <h4>Question {questionInRound}</h4>
                  <h2>{questionText}</h2>
                  <p>{explanation}</p>

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
                    orderedTeamsLeftToAnswer &&
                    acceptableAnswers && (
                      <>
                        Requesting answer from {orderedTeamsLeftToAnswer[0]}
                        <>
                          <h4>Verified accepted answers</h4>
                          <div>
                            {getAcceptableAnswerButtons(flatAcceptableAnswers)}
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

                  {questionStatus === QuestionStatus.announcingResults &&
                    acceptableAnswers && (
                      <>
                        <h3>Acceptable answers</h3>

                        <Table
                          className={styles.mainFrame}
                          style={{ width: 600 }}
                        >
                          {sortBy(flatAcceptableAnswers, "points").map(
                            (acceptableAnswer) => {
                              const { answerText, points, answered } =
                                acceptableAnswer;
                              return (
                                <TableRow key={answerText}>
                                  <TableCell>{answerText}</TableCell>
                                  <TableCell>{points}</TableCell>
                                  <TableCell>
                                    {answered && <CheckIcon />}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </Table>

                        <Button
                          variant="contained"
                          color="primary"
                          style={{ margin: 10 }}
                          onClick={() => gameHandler.requestEndQuestion()}
                        >
                          End question
                        </Button>
                      </>
                    )}
                </>
              )}
            </>
          </>
        )}

        <PointsList animate />
      </main>
    </>
  );
}

export default withReconnect(Game);
