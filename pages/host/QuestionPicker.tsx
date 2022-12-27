import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { startCase } from "lodash";
import { withRouter } from "next/router";
import { AppContext } from "../../controllers/AppWrapper";
import questions from "../../models/questions";
import { GameRound } from "../../models/types";

function QuestionPicker() {
  return (
    <AppContext.Consumer>
      {({ gameHandler }) => (
        <>
          {Object.values(GameRound).map((round) => (
            <Table key={round}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>{startCase(round)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Pick</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions[round].map((question) => {
                  const { questionText } = question;
                  return (
                    <TableRow>
                      <TableCell>{questionText}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() =>
                            gameHandler.requestSetActiveQuestion(
                              round,
                              questionText
                            )
                          }
                        >
                          Pick
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ))}
        </>
      )}
    </AppContext.Consumer>
  );
}

export default withRouter(QuestionPicker);
