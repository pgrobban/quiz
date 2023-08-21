import { Game, GameRound, GameStatus, QuestionStatus, isGroupedAcceptableAnswers } from "../models/types";
import BaseGameBoard from "./BaseGameBoard";
import { useEffect, useState } from "react";
interface Props {
  game: Game;
}

export default function CluesAndAnswersBoard(props: Props) {
  const { game } = props;
  if (game.gameStatus !== GameStatus.inProgress || !game.currentQuestion?.question || game.round !== GameRound.cluesAndAnswers) {
    throw new Error("PictureBoard Assertion Error");
  }

  const [answerCache, setAnswerCache] = useState<string[]>([]);
  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { acceptableAnswers } = question;

  useEffect(() => {
    if (lastAnswer && !answerCache.includes(lastAnswer) && questionStatus !== QuestionStatus.awardingPoints) {
      setAnswerCache([...answerCache, lastAnswer]);
    }
  }, [answerCache, lastAnswer, questionStatus]);

  if (isGroupedAcceptableAnswers(acceptableAnswers)) {
    throw new Error("Only support for non-grouped acceptable answers");
  }

  return (
    <BaseGameBoard>
      <div>
        {acceptableAnswers.map((answer, index) => {
          const { clue, answerText, answered, points } = answer;
          const shouldShowAnswer = answered || (questionStatus === QuestionStatus.announcingResults);
          const shouldShowScore = answerCache.includes(answerText) || (questionStatus === QuestionStatus.announcingResults);

          return (
            <div
              key={index}
              style={{
                lineHeight: 1,
                height: 55,
                borderRadius: 50,
                border: "2px solid #F9F463",
                margin: "35px 10px 10px 10px",
                display: "flex",
                background:
                  "radial-gradient(ellipse at top, #660907, transparent), radial-gradient(ellipse at bottom, #200202, transparent)",
              }}
            >
              <div
                style={{
                  fontFamily: "Verdana",
                  textTransform: "uppercase",
                  color: "#FEFD3C",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  width: "70%",
                  paddingLeft: 15,
                  textAlign: "center",
                }}
              >
                <span>{clue}</span>
              </div>
              <div
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 75,
                  border: "3px solid #FAF7A0",
                  background: "#82264D",
                  margin: "-8px 0px 10px 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontFamily: "Arial Black",
                    color: "#FEFD1D",
                  }}
                >
                      <span>{shouldShowScore ? points : ''}</span>
                </div>
              </div>

              <div
                style={{
                  fontFamily: "Verdana",
                  fontSize: 18,
                  textTransform: "uppercase",
                  padding: 10,
                  color: "#FEFD3C",
                  width: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <span>{shouldShowAnswer ? answerText : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseGameBoard>
  );
}
