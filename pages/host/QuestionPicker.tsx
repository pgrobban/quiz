import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { startCase } from "lodash";
import { useAppContext } from "../../controllers/AppWrapper";
import questions from "../../models/questions";

export default function QuestionPicker() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  if (!activeGame?.round) {
    return null;
  }

  const { round } = activeGame;
  return (
    <>
      <h3>Pick a question</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              {startCase(round)}
            </TableCell>
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
              <TableRow key={questionText}>
                <TableCell>{questionText}</TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      gameHandler.requestSetActiveQuestion(round, questionText)
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
    </>
  );
}
