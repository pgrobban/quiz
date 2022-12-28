import { Button } from "@mui/material";
import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import { QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  if (!activeGame) {
    return null;
  }

  const { questionStatus, round, currentQuestion } = activeGame;

  return (
    <>
      <main className={styles.main}>
        <h3>Hosting</h3>

        {!round && <RoundPicker />}
        {round && (
          <>
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <QuestionPicker />
            )}
            <>
              {currentQuestion && (
                <>
                  <h4>Question {currentQuestion.questionInRound}</h4>
                  <h2>{currentQuestion.question.questionText}</h2>

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

                  {questionStatus === QuestionStatus.inProgress && currentQuestion.orderedTeamsLeftToAnswer && (
                    <>
                      Requesting answer from {currentQuestion.orderedTeamsLeftToAnswer[0]}
                    </>
                  )}
                </>
              )}
            </>
          </>
        )}

        <ScoreList />
      </main>
    </>
  );
}

export default withReconnect(Game);
