import { useAppContext } from "../controllers/AppWrapper";

export default function ScoreList() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();

  if (!activeGame) {
    return null;
  }

  const { teamsAndPoints } = activeGame;
  const sortedTeamsAndPoints = teamsAndPoints?.sort(
    (teamA, teamB) => teamB.points - teamA.points
  );

  return (
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
  );
}
