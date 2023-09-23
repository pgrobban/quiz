import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";
import { getPointsFromLatestAnswer } from "../controllers/helpers";
import { QuestionStatus } from "../models/types";
import styles from "../styles/Home.module.css";
import classNames from "classnames";

interface Props {
  headToHeadEnabled: boolean;
  animate: boolean;
  callback?: () => void;
}

export default function PointsList(props: Props) {
  const { headToHeadEnabled, animate, callback } = props;
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;

  useEffect(() => {
    gameHandler.getActiveGame();
  });

  const pointsToAdd = gameState ? getPointsFromLatestAnswer(gameState) : 0;
  const [pointsLeftToAdd, setPointsLeftToAdd] = useState(
    animate ? pointsToAdd : 0
  );

  if (!gameState) {
    return null;
  }

  const { teamsAndPoints, questionStatus, currentQuestion } = gameState;
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

    const teamAndPointsElementToTransition = document.querySelector(
      `#team-points-${currentTeamAnswering}`
    );
    if (callback) {
      teamAndPointsElementToTransition?.addEventListener(
        "animationend",
        callback
      );
    }

    const i = setInterval(() => {
      if (pointsLeftToAdd === 0) {
        clearInterval(i);

        if (callback) {
          setTimeout(() => {
            teamAndPointsElementToTransition?.removeEventListener(
              "animationend",
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

  const sortedTeamsAndPoints = teamsAndPoints?.sort(
    (teamA, teamB) => teamA.points - teamB.points
  );

  return (
    <div className={styles.mainFrame} style={{ minWidth: 400 }}>
      {headToHeadEnabled && (
        <p>
          Head to head enabled <br /> Get a pointless answer to win
        </p>
      )}

      <Table>
        <TableBody>
          {sortedTeamsAndPoints?.map((teamNameAndPoint, index) => {
            const { teamName, points } = teamNameAndPoint;
            const isTeamAnswering = currentTeamAnswering === teamName;
            const animateThisTeamRow =
              questionStatus === QuestionStatus.awardingPoints &&
              isTeamAnswering &&
              animate;

            return (
              <TableRow
                key={teamName}
                id={`team-points-${teamName}`}
                className={classNames({
                  [styles.animatedSize]: animateThisTeamRow,
                })}
                style={{
                  ...(isTeamAnswering && {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }),
                }}
              >
                <TableCell width={20}>{index + 1}.</TableCell>
                <TableCell>{teamName}</TableCell>
                <TableCell
                  width={150}
                  style={{ fontSize: animateThisTeamRow ? "unset" : undefined }}
                >
                  {animateThisTeamRow
                    ? points + (pointsToAdd - pointsLeftToAdd)
                    : points}{" "}
                  pts
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
