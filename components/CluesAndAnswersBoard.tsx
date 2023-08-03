import { AcceptableAnswerInGame } from "../models/types";
import BaseGameBoard from "./BaseGameBoard";

interface Props {
  answersInGame: AcceptableAnswerInGame[];
  awardingPointsInProgress: boolean;
}

export default function CluesAndAnswersBoard(props: Props) {
  const { answersInGame, awardingPointsInProgress } = props;

  return (
    <BaseGameBoard>
      <div>
        {answersInGame.map((answer, index) => {
          const { clue, answerText, answered, points } = answer;
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
                  <span>{(awardingPointsInProgress || !answered) ? "" : points}</span>
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
                <span>{answered ? answerText : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseGameBoard>
  );
}
