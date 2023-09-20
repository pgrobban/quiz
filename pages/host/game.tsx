import { Button, Table, TableCell, TableRow, TextField } from "@mui/material";
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
import { useState } from "react";
import { HEAD_TO_HEAD_ANSWERS_TO_SUBMIT } from "../../controllers/GameHandler";
import HeadToHeadAnswers from "../../components/HeadToHeadAnswers";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;

  if (!gameState) {
    return null;
  }

  const { questionStatus, round, currentQuestion, headToHeadEnabled } =
    gameState;
  const {
    questionInRound,
    question,
    orderedTeamsLeftToAnswer,
    headToHeadAnswers,
  } = currentQuestion || {};
  const { acceptableAnswers, explanation, questionText } = question || {};
  const [receivedHeadToHeadAnswers, setReceivedHeadToHeadAnswers] = useState([
    "",
    "",
    "",
  ]);

  const updateReceivedHeadToHeadAnswer = (index: number, newAnswer: string) => {
    setReceivedHeadToHeadAnswers(
      receivedHeadToHeadAnswers.map((answer, i) =>
        i === index ? newAnswer : answer
      )
    );
  };

  const getAcceptableAnswerButton = (answerText: string, answered: boolean) => (
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

  const getAcceptableAnswerButtons = (
    acceptableAnswers: AcceptableAnswerInGame[]
  ) =>
    acceptableAnswers.map((acceptableAnswer) => {
      const { answerText, answered } = acceptableAnswer;
      return getAcceptableAnswerButton(answerText, answered);
    });

  const flatAcceptableAnswers = (
    acceptableAnswers ? getFlatAcceptableAnswers(acceptableAnswers) : []
  ) as AcceptableAnswerInGame[];

  const currentTeamName = orderedTeamsLeftToAnswer?.[0];

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
                <div className={styles.mainFrame}>
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
                        {headToHeadEnabled && (
                          <div className={styles.mainFrame}>
                            <span>
                              Requesting {HEAD_TO_HEAD_ANSWERS_TO_SUBMIT}{" "}
                              answers from {currentTeamName}
                            </span>
                            {[...Array(HEAD_TO_HEAD_ANSWERS_TO_SUBMIT)].map(
                              (_, index) => (
                                <div key={index}>
                                  <TextField
                                    placeholder={`Answer ${index + 1}`}
                                    value={receivedHeadToHeadAnswers[index]}
                                    onChange={(e) =>
                                      updateReceivedHeadToHeadAnswer(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )
                            )}

                            <Button
                              variant="contained"
                              onClick={() =>
                                gameHandler.requestHeadToHeadAnswerSubmission(
                                  receivedHeadToHeadAnswers
                                )
                              }
                            >
                              Submit answers
                            </Button>
                          </div>
                        )}
                        {!headToHeadEnabled && (
                          <>
                            <span>
                              Requesting answer from {currentTeamName}
                            </span>
                            <h4>Verified accepted answers</h4>
                            <div>
                              {getAcceptableAnswerButtons(
                                flatAcceptableAnswers
                              )}
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
                        )}
                      </>
                    )}

                  {questionStatus &&
                    [
                      QuestionStatus.pointsAdded,
                      QuestionStatus.receivedHeadToHeadAnswers,
                    ].includes(questionStatus) && (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: 10 }}
                        onClick={() => gameHandler.requestContinueGame()}
                      >
                        Continue game
                      </Button>
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
                </div>
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
