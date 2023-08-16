import { useEffect, useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";
import { getScoreFromLatestAnswer } from "../controllers/helpers";
import { QuestionStatus } from "../models/types";
import styles from "../styles/Home.module.css";

interface Props {
  animate: boolean;
  callback?: () => void;
}

export default function ScoreList(props: Props) {
  const { animate, callback } = props;
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  const { teamsAndPoints, questionStatus, currentQuestion } = activeGame || {};

  const pointsToAdd = activeGame ? getScoreFromLatestAnswer(activeGame) : 0;
  const [pointsLeftToAdd, setPointsLeftToAdd] = useState(
    animate ? pointsToAdd : 0
  );

  const currentTeamAnswering =
    (questionStatus &&
      [
        QuestionStatus.waitingForTeamAnswer,
        QuestionStatus.awardingPoints,
      ].includes(questionStatus) &&
      currentQuestion?.orderedTeamsLeftToAnswer?.[0]) ||
    null;

  useEffect(() => {
    if (!animate) {
      return;
    }

    const teamAndScoreElementToTransition = document.querySelector(
      `#team-score-${currentTeamAnswering}`
    );
    if (callback) {
      teamAndScoreElementToTransition?.addEventListener(
        "webkitTransitionEnd",
        callback
      );
    }

    const i = setInterval(() => {
      if (pointsLeftToAdd === 0) {
        clearInterval(i);

        if (callback) {
          setTimeout(() => {
            teamAndScoreElementToTransition?.removeEventListener(
              "webkitTransitionEnd",
              callback
            );
          }, 5000);
        }
        return;
      }
      setPointsLeftToAdd(pointsLeftToAdd - 1);
    }, 50);

    return () => clearInterval(i);
  }, [animate, currentTeamAnswering, pointsLeftToAdd, callback]);

  if (!activeGame) {
    return null;
  }

  const sortedTeamsAndPoints = teamsAndPoints?.sort(
    (teamA, teamB) => teamB.points - teamA.points
  );

  if (!activeGame) {
    return null;
  }

  return (
    <div>
      <h4>Teams</h4>

      <ol>
        {sortedTeamsAndPoints?.map((teamNameAndPoint) => {
          const { teamName, points } = teamNameAndPoint;
          const isTeamAnswering = currentTeamAnswering === teamName;
          const animateThisTeamNameAndScore = isTeamAnswering && animate;

          return (
            <li
              key={teamName}
              id={`team-score-${teamName}`}
              className={animateThisTeamNameAndScore ? styles.animateSize : ""}
              style={{ ...(isTeamAnswering && { color: "red" }) }}
            >
              {teamName}{" "}
              {animateThisTeamNameAndScore
                ? points + (pointsToAdd - pointsLeftToAdd)
                : points}{" "}
              pts
            </li>
          );
        })}
      </ol>
    </div>
  );
}
