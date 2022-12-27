import { Button } from "@mui/material";
import { startCase } from "lodash";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameRound } from "../../models/types";

export default function RoundPicker() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;

  return (
    <>
      <h3>Pick a round</h3>

      {
        Object.values(GameRound).map((round) => (
          <Button key={round} color="primary" variant="contained" onClick={() => gameHandler.requestSetActiveRound(round)} style={{ margin: 10 }}>
            {startCase(round)}
          </Button>
        ))
      }
    </>
  )
}