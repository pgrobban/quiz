import { Button, Table, TableCell, TableRow, TextField } from "@mui/material";
import PointsList from "../../components/PointsList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import {
  AcceptableAnswerInGame,
  GameRound,
  QuestionStatus,
} from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";
import { sortBy } from "lodash";
import CheckIcon from "@mui/icons-material/Check";
import { getFlatAcceptableAnswers } from "../../controllers/helpers";
import React, { useState } from "react";
import {
  HEAD_TO_HEAD_ANSWERS_TO_SUBMIT,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
} from "../../controllers/GameHandler";
import HeadToHeadAnswers from "../../components/HeadToHeadAnswers";

function Game() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;
  const { questionStatus, round, currentQuestion, headToHeadEnabled } =
    gameState || {};
  const {
    questionInRound,
    question,
    orderedTeamsLeftToAnswer,
    headToHeadInfo,
  } = currentQuestion || {};
  const { headToHeadAnswers } = headToHeadInfo || {};

  const { acceptableAnswers, explanation, questionText } = question || {};
  const [receivedHeadToHeadAnswers, setReceivedHeadToHeadAnswers] = useState([
    "",
    "",
    "",
  ]);

  if (!gameState) {
    return null;
  }

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
      onClick={() =>
        headToHeadEnabled
          ? updateReceivedHeadToHeadAnswer(
              receivedHeadToHeadAnswers.indexOf(""),
              answerText
            )
          : gameHandler.requestVerificationOfAnswer(answerText)
      }
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
                  <p>
                    {explanation?.split("\n").map((part, index) => (
                      <React.Fragment key={index}>
                        {part}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>

                  {questionStatus === QuestionStatus.receivedQuestion && (
                    <div style={{ marginTop: 15 }}>
                      {round === GameRound.pictureBoard && (
                        <p style={{ color: "#ddd" }}>
                          Remember to show the pictures on the players' screen!
                        </p>
                      )}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => gameHandler.requestTeamAnswer()}
                      >
                        Request first team answer
                      </Button>
                    </div>
                  )}

                  {questionStatus === QuestionStatus.waitingForTeamAnswer &&
                    orderedTeamsLeftToAnswer &&
                    acceptableAnswers && (
                      <>
                        {headToHeadEnabled && !headToHeadAnswers && (
                          <div className={styles.mainFrame}>
                            <p>
                              Requesting {HEAD_TO_HEAD_ANSWERS_TO_SUBMIT}{" "}
                              answers from {currentTeamName}
                            </p>
                            <p>Remember to sort by least confident</p>
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
                            <div>
                              {getAcceptableAnswerButtons(
                                flatAcceptableAnswers
                              )}
                            </div>
                            <div style={{ marginTop: 50, marginLeft: 10 }}>
                              <Button
                                variant="contained"
                                disabled={receivedHeadToHeadAnswers.some(
                                  (answer) => !answer
                                )}
                                onClick={() =>
                                  gameHandler.requestHeadToHeadAnswerSubmission(
                                    receivedHeadToHeadAnswers
                                  )
                                }
                              >
                                Submit answers
                              </Button>
                            </div>
                          </div>
                        )}
                        {headToHeadEnabled && headToHeadAnswers && (
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: 10 }}
                            onClick={() => gameHandler.requestContinueGame()}
                          >
                            Continue game
                          </Button>
                        )}
                        {!headToHeadEnabled && (
                          <>
                            <p style={{ marginTop: 10 }}>
                              Requesting answer from {currentTeamName}
                            </p>
                            <h4>Verified accepted answers</h4>
                            <div>
                              {getAcceptableAnswerButtons(
                                flatAcceptableAnswers
                              )}
                            </div>
                            <div style={{ marginTop: 20 }}>
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
                            </div>
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
                          onClick={() =>
                            headToHeadEnabled
                              ? gameHandler.requestEndGame()
                              : gameHandler.requestEndQuestion()
                          }
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

        <PointsList animate headToHeadEnabled={!!headToHeadEnabled} />
      </main>
    </>
  );
}

export default withReconnect(Game);
