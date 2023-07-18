import { AnswersInGame } from "../models/types";

interface Props {
  answersInGame: AnswersInGame;
}

export default function CluesAndAnswersBoard({ answersInGame }: Props) {
  const baseRadius = 850;

  return (
    <div
      style={{
        height: baseRadius - 150,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: baseRadius,
          height: baseRadius,
          borderRadius: baseRadius,
          border: "2px solid #641C3B",
          overflow: "hidden",
          position: 'relative',
          top: -60
        }}
      >
        <div
          style={{
            width: baseRadius - 2,
            height: baseRadius - 2,
            borderRadius: baseRadius - 2,
            border: "2px solid #69312E",
          }}
        >
          <div
            style={{
              width: baseRadius - 4,
              height: baseRadius - 4,
              borderRadius: baseRadius - 4,
              border: "2px solid #D9474E",
              background: "radial-gradient(#2D1823,#5D3640,#D9474E)",
            }}
          >
            <div
              style={{
                width: 620,
                height: 620,
                borderRadius: 50,
                border: "2px solid #9D191F",
                position: "relative",
                left: 110,
                top: 110,
              }}
            >
              <div
                style={{
                  width: 618,
                  height: 618,
                  borderRadius: 48,
                  border: "2px solid #4F3635",
                  backgroundImage: 'url(../images/clues-and-answers.avif)',
                  backgroundSize: 'cover'
                }}
              >
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
                        display: 'flex',
                        background:
                          "radial-gradient(ellipse at top, #660907, transparent), radial-gradient(ellipse at bottom, #200202, transparent)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Verdana",
                          textTransform: "uppercase",
                          color: "#FEFD3C",
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'column',
                          position: "relative",
                          width: '70%',
                          paddingLeft: 15,
                          textAlign: 'center',
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'column',
                          textAlign: 'center'
                        }}
                      >
                        <div
                          style={{
                            fontSize: 28,
                            fontFamily: "Arial Black",
                            color: "#FEFD1D"
                          }}
                        >
                          <span>{answered ? points : ""}</span>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          flexDirection: 'column',
                          textAlign: 'center'
                        }}
                      >
                        <span>{answered ? answerText : ""}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
