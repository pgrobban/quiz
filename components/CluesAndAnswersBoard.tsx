import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { QuestionInGame } from "../models/types";

interface Props {
  question: QuestionInGame;
}

export default function CluesAndAnswersBoard({ question }: Props) {
  const baseRadius = 800;

  return (
    <div style={{ height: baseRadius-100, marginTop: -50, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          width: baseRadius,
          height: baseRadius,
          borderRadius: baseRadius,
          border: "2px solid #641C3B",
          overflow: 'hidden'
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
                width: 575,
                height: 575,
                borderRadius: 50,
                border: "2px solid #9D191F",
                position: "relative",
                left: 110,
                top: 110,
              }}
            >
              <div
                style={{
                  width: 573,
                  height: 573,
                  borderRadius: 48,
                  border: "2px solid #4F3635",
                  background:
                    "radial-gradient(ellipse at top, #070450, transparent), radial-gradient(ellipse at bottom, #C9374B, transparent)",
                }}
              >
                <div
                  style={{
                    height: 50,
                    borderRadius: 50,
                    border: "2px solid #F9F463",
                    margin: "40px 10px 10px 10px",
                    background:
                      "radial-gradient(ellipse at top, #660907, transparent), radial-gradient(ellipse at bottom, #200202, transparent)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#FEFD3C",
                      display: 'inline-block',
                      position: "relative",
                      width: 310,
                      paddingLeft: 15
                    }}
                  >
                    <span>Blah blah</span>
                  </div>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 75,
                      border: "3px solid #FAF7A0",
                      background: "#82264D",
                      display: 'inline-block',
                      margin: "-8px 10px 10px 10px"
                    }}
                  >
                    <div style={{ fontSize: 28, fontFamily: 'Arial Black', textAlign: 'center', marginTop: 5, color: '#FEFD1D' }}>
                      <span>25</span>
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: 18,
                      textTransform: "uppercase",
                      padding: 10,
                      color: "#FEFD3C",
                      display: 'inline-block',
                      width: 150
                    }}
                  >
                    <span>Blah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
