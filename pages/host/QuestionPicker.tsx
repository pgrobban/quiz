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
import { getFlatAcceptableAnswers } from "../../controllers/helpers";
import styles from "../../styles/Home.module.css";

export default function QuestionPicker() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  if (!activeGame?.round) {
    return null;
  }

  const { round } = activeGame;
  return (
    <main className={styles.mainFrame}>
      <h3>Pick a question</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              {startCase(round)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tags</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Acceptable answers</TableCell>
            <TableCell>Pointless answers</TableCell>
            <TableCell align="right">Pick</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions[round].map((question) => {
            const { tags, questionText, acceptableAnswers } = question;
            const flatAcceptableAnswers =
              getFlatAcceptableAnswers(acceptableAnswers);
            const pointlessAnswers = flatAcceptableAnswers.filter(
              (acceptableAnswer) => acceptableAnswer.points === 0
            );
            return (
              <TableRow key={questionText}>
                <TableCell>{tags?.sort().join(", ") || ""}</TableCell>
                <TableCell>{questionText}</TableCell>
                <TableCell>{flatAcceptableAnswers.length}</TableCell>
                <TableCell>{pointlessAnswers.length}</TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      gameHandler.requestSetActiveQuestion(questionText)
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

      <Button
        variant="contained"
        onClick={() => gameHandler.requestUndoRoundSelection()}
      >
        Back to round selection
      </Button>
    </main>
  );
}
