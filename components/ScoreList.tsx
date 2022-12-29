import { useAppContext } from "../controllers/AppWrapper";
import { QuestionStatus } from "../models/types";

export default function ScoreList() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();

  if (!activeGame) {
    return null;
  }

  const { teamsAndPoints, questionStatus, currentQuestion } = activeGame;
  const sortedTeamsAndPoints = teamsAndPoints?.sort(
    (teamA, teamB) => teamB.points - teamA.points
  );

  const currentTeamAnswering = questionStatus === QuestionStatus.waitingForTeamAnswer && currentQuestion?.orderedTeamsLeftToAnswer?.[0];

  return (
    <div>
      <h4>Teams</h4>

      <ol>
        {sortedTeamsAndPoints?.map((teamNameAndPoint) => {
          const { teamName, points } = teamNameAndPoint;
          const isTeamAnswering = currentTeamAnswering === teamName; 
          return <li key={teamName} style={{ ...isTeamAnswering && { color: 'red' }}}>
            {teamName} {points} pts
          </li>
})}
      </ol>
    </div>
  );
}
