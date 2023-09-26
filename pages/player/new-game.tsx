import { Button, TextField } from "@mui/material";
import styles from "../../styles/Home.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useEffect, useState } from "react";
import { useAppContext } from "../../controllers/AppWrapper";

function NewGame() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const [teamNames, setTeamNames] = useState(["", ""]);

  useEffect(() => {
    gameHandler.getActiveGame();
  }, [gameHandler]);

  const updateTeamName = (index: number, newName: string) => {
    setTeamNames(
      teamNames.map((teamName, i) => (i === index ? newName : teamName))
    );
  };

  const removeTeamName = (index: number) => {
    setTeamNames((teamNames) => teamNames.filter((_, i) => i !== index));
  };

  const addTeamName = () => {
    setTeamNames([...teamNames, ""]);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainFrame} style={{ width: 500 }}>
          <h3>New game</h3>
          <h4>
            Enter team names <br />
            (at least two teams are required)
          </h4>
          <div>
            {teamNames.map((teamName, index) => {
              return (
                <div key={index}>
                  <TextField
                    value={teamName}
                    onChange={(e) => updateTeamName(index, e.target.value)}
                    placeholder="Enter a team name..."
                    variant="filled"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={teamNames.length <= 2}
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

          <Button
            variant="contained"
            style={{ marginTop: 15 }}
            onClick={() => addTeamName()}
          >
            <PersonAddIcon />
          </Button>
        </div>
        <Button
          className={styles.menuButton}
          variant="contained"
          onClick={() => gameHandler.requestStartGame(teamNames)}
        >
          Start game
        </Button>
      </main>
    </>
  );
}

export default NewGame;
