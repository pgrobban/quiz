import { withRouter } from "next/router";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameStatus, QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const game = gameHandler.getActiveGame();
  const { teamsAndPoints, gameStatus, questionStatus } = game;
  const sortedTeamsAndPoints = teamsAndPoints?.sort(
    (teamA, teamB) => teamB.points - teamA.points
  );
  console.log("*** game", game);

  return (
    <>
      <main className={styles.main}>
        <h3>Hosting</h3>

        <div>
          <h4>Teams</h4>

          <ol>
            {sortedTeamsAndPoints?.map((teamNameAndPoint) => (
              <li key={teamNameAndPoint.teamName}>
                {teamNameAndPoint.teamName} {teamNameAndPoint.points} pts
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

export default withRouter(Game);
