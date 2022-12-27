import { withRouter } from "next/router";
import ScoreList from "../../components/ScoreList";
import { useAppContext } from "../../controllers/AppWrapper";
import { QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";
import QuestionPicker from "./QuestionPicker";
import RoundPicker from "./RoundPicker";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  if (gameHandler.getConnectionStatus() === "disconnected") {
    return <h3>Disconnected</h3>
  }
  if (gameHandler.getConnectionStatus() === "reconnecting") {
    return <h3>Lost connection. Reconnecting...</h3>
  }

  const activeGame = gameHandler.getActiveGame();
  if (!activeGame) {
    return null;
  }

  const { questionStatus, round } = activeGame;
  console.log("*** game", activeGame);

  return (
    <>
      <main className={styles.main}>
        <h3>Hosting</h3>

        {
          !round && (
            <RoundPicker />
          )
        }
        {
          round && questionStatus === QuestionStatus.waitingForQuestion && (
            <QuestionPicker />
          )
        }

        <ScoreList />
      </main>
    </>
  );
}

export default withRouter(Game);
