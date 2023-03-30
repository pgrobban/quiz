import { NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER, QuestionStatus } from "../models/types";
import ClientGameHandler from "./ClientGameHandler";

export function getScoreFromLatestAnswer(gameHandler: ClientGameHandler) {
  const game = gameHandler.getActiveGame();
  if (game?.questionStatus !== QuestionStatus.awardingPoints) {
    return 0;
  }

  switch (game.currentQuestion?.lastAnswer) {
    case NON_VERIFIED_ANSWER:
      return 0;
    case NO_OR_INVALID_ANSWER:
      return 100;
    default:
      return game.currentQuestion?.question.possibleAnswers.find((answer) => answer.answerText === game.currentQuestion?.lastAnswer)?.points || 0;
  }
}
