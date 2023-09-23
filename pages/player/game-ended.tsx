import { useEffect } from "react";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";
import Image from "next/image";

function GameEnded() {
  const appContext = useAppContext();
  const { gameState, gameHandler } = appContext;

  useEffect(() => {
    gameHandler.getActiveGame();
  });

  const { gameStatus, winningTeamName } = gameState || {};

  if (gameStatus !== GameStatus.ended) {
    return null;
  }

  return (
    <>
      <main className={styles.main}>
        <div
          className={styles.mainFrame}
          style={{
            marginRight: 10,
            minHeight: 800,
            minWidth: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>Game ended</h5>
          <h2>Congratulations team {winningTeamName}!</h2>
          <h2>You have won the coveted Pointless trophy!</h2>
          <Image src="/images/trophy.png" alt="trophy" height={584} width={768} />
          <h4>Thank you for playing!</h4>
        </div>
      </main>
    </>
  );
}

export default GameEnded;
