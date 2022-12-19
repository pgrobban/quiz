import { Button, TextField } from "@mui/material";
import styles from "../styles/Home.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";
import Router, { withRouter } from "next/router";

function Game() {
  const appContext = useAppContext();
  const { socket, gameHandler } = appContext;

  const teamNamesAndPoints = gameHandler.getTeamNamesAndPoints();
  const sortedTeamsAndPoints = teamNamesAndPoints?.sort((teamA, teamB) => teamB.points - teamA.points);

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        <div>Waiting for question</div>
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
