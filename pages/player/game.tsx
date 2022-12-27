import ScoreList from "../../components/ScoreList";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameStatus, QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const game = gameHandler.getActiveGame();
  if (!game) {
    const connectionStatus = gameHandler.getConnectionStatus();
    if (connectionStatus === "disconnected") {
      return <h3>Disconnected</h3>;
    } else if (connectionStatus === "reconnecting") {
      return <h3>Reconnecting...</h3>;
    }
    return;
  }

  const { gameStatus, questionStatus } = game;

  console.log("*** game", game);

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        {gameStatus === GameStatus.waitingForHost && (
          <h4>Waiting for host...</h4>
        )}
        {gameStatus === GameStatus.inProgress && (
          <>
            {questionStatus === QuestionStatus.waitingForRound && (
              <h4>Waiting for host to pick a round...</h4>
            )}
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <h4>Waiting for host to pick a question...</h4>
            )}
          </>
        )}

        <ScoreList />
      </main>
    </>
  );
}

export default Game;
