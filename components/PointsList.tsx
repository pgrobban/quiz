import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";
import { getPointsFromLatestAnswer } from "../controllers/helpers";
import { QuestionStatus } from "../models/types";
import styles from "../styles/Home.module.css";

interface Props {
  animate: boolean;
  callback?: () => void;
}

export default function PointsList(props: Props) {
  const { animate, callback } = props;
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const activeGame = gameHandler.getActiveGame();
  const { teamsAndPoints, questionStatus, currentQuestion } = activeGame || {};

  const pointsToAdd = activeGame ? getPointsFromLatestAnswer(activeGame) : 0;
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

    const teamAndPointsElementToTransition = document.querySelector(
      `#team-points-${currentTeamAnswering}`
    );
    if (callback) {
      teamAndPointsElementToTransition?.addEventListener(
        "webkitTransitionEnd",
        callback
      );
    }

    const i = setInterval(() => {
      if (pointsLeftToAdd === 0) {
        clearInterval(i);

        if (callback) {
          setTimeout(() => {
            teamAndPointsElementToTransition?.removeEventListener(
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
    (teamA, teamB) => teamA.points - teamB.points
  );

  if (!activeGame) {
    return null;
  }

  return (
    <div>
      <Typography align="center">Points</Typography>

      <Table>
        <TableBody>
          {sortedTeamsAndPoints?.map((teamNameAndPoint, index) => {
            const { teamName, points } = teamNameAndPoint;
            const isTeamAnswering = currentTeamAnswering === teamName;
            const animateThisTeamRow = isTeamAnswering && animate;

            return (
              <TableRow
                key={teamName}
                id={`team-points-${teamName}`}
                className={
                  animateThisTeamRow ? styles.animateSize : ""
                }
                style={{ ...(isTeamAnswering && { backgroundColor: 'rgba(255, 255, 255, 0.15)' }) }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{teamName}</TableCell>
                <TableCell>
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
