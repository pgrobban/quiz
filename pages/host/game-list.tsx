import { Button, TableCell, TableRow, TextField } from "@mui/material";
import styles from "../../styles/Home.module.css";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useEffect, useState } from "react";
import { useAppContext } from "../../controllers/AppWrapper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { Game, GameStatus } from "../../models/types";
import { startCase } from 'lodash';

type RequestGameStatus = "requesting" | "done";

function NewGame() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;

  const [requestGamesStatus, setRequestGameStatus] =
    useState<RequestGameStatus>("requesting");
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const refreshGamesInterval = setInterval(() => {
      gameHandler.requestGames();
      setGames(gameHandler.getHostReceivedGames());
      setRequestGameStatus("done");
    }, 2000);
    return () => {
      clearInterval(refreshGamesInterval);
    };
  }, []);

  const onJoinGame = (gameId: string) => {
    gameHandler.requestHostJoinGame(gameId);
  }

  return (
    <>
      <main className={styles.main}>
        {requestGamesStatus === "requesting" && (
          <h3>Requesting games from server...</h3>
        )}
        {requestGamesStatus === "done" && (
          <div>
            <h3>Game list</h3>

            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Game ID</TableCell>
                    <TableCell>Team names</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Join</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games.map((game) => {
                    const { id, teamsAndPoints, gameStatus } = game;
                    const teams = (teamsAndPoints || []).map(
                      (t) => t.teamName
                    );
                    const canHost = game.gameStatus === GameStatus.waitingForHost;
                    const resolvedGameStatus = startCase(gameStatus);

                    return (
                      <TableRow key={id}>
                        <TableCell>{id.substring(0, 8)}...</TableCell>
                        <TableCell>{teams.join(", ")}</TableCell>
                        <TableCell>{resolvedGameStatus}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={!canHost}
                            onClick={() => onJoinGame(id)}
                          >
                            <RecordVoiceOverIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default NewGame;