import { Button } from "@mui/material";
import { startCase } from "lodash";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameRound } from "../../models/types";
import { ROUNDS_ALLOWED_IN_HEAD_TO_HEAD } from "../../controllers/GameHandler";
import questions from "../../models/questions";

export default function RoundPicker() {
  const appContext = useAppContext();
  const { gameHandler, gameState } = appContext;
  const { headToHeadEnabled } = gameState || {};

  return (
    <>
      <h3>Pick a round</h3>

      {Object.values(GameRound).map((round) => {
        if (
          (headToHeadEnabled &&
            !ROUNDS_ALLOWED_IN_HEAD_TO_HEAD.includes(round)) ||
          questions[round].length === 0
        ) {
          return null;
        }

        return (
          <Button
            key={round}
            color="primary"
            variant="contained"
            onClick={() => gameHandler.requestSetActiveRound(round)}
            style={{ margin: 10 }}
          >
            {startCase(round)}
          </Button>
        );
      })}
    </>
  );
}
