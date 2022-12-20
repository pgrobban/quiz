import { Button, TextField } from "@mui/material";
import styles from "../styles/Home.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";

function NewGame() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const [teamNames, setTeamNames] = useState(["", ""]);

  const updateTeamName = (index: number, newName: string) => {
    setTeamNames((teamNames) =>
      teamNames.map((teamName, i) => (i === index ? newName : teamName))
    );
  };

  const removeTeamName = (index: number) => {
    setTeamNames((teamNames) => teamNames.filter((_, i) => i !== index));
  };

  const addTeamName = () => {
    setTeamNames([...teamNames, ""]);
  };

  const startGame = () => {
    gameHandler.requestStartGame(teamNames);
  }

  return (
    <>
      <main className={styles.main}>
        <div>
        <h3>New game</h3>
        <h3>
          Enter team names <br />
          (at least two teams are required)
        </h3>
        <div>
          {teamNames.map((teamName, index) => {
            return (
              <div key={index}>
                <TextField
                  value={teamName}
                  onChange={(e) => updateTeamName(index, e.target.value)}
                  placeholder="Enter a team name..."
                  style={{ background: "white" }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={teamNames.length < 2}
                        onClick={() => removeTeamName(index)}
                      >
                        <PersonRemoveIcon />
                      </Button>
                    ),
                  }}
                />
              </div>
            );
          })}
        </div>

        <Button variant="contained">
          <PersonAddIcon onClick={() => addTeamName()} />
        </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={() => startGame()}>
            Start game
          </Button>
        </div>
      </main>
    </>
  );
}

export default NewGame;
