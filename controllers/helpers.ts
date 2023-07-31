import { AcceptableAnswerInGame, AcceptableOrGroupedAcceptableAnswers, Game, NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER, QuestionStatus, isGroupedAcceptableAnswers } from "../models/types";
import ClientGameHandler from "./ClientGameHandler";

export function findAcceptableAnswer(
  acceptableOrGroupedAcceptableAnswers: AcceptableOrGroupedAcceptableAnswers,
  answerText: string
): AcceptableAnswerInGame {
  let ret;

  if (isGroupedAcceptableAnswers(acceptableOrGroupedAcceptableAnswers)) {
    ret = Object.values(acceptableOrGroupedAcceptableAnswers)
      .flat()
      .find(
        (acceptableAnswer) => acceptableAnswer.answerText === answerText
      ) as AcceptableAnswerInGame;
  } else {
    ret = acceptableOrGroupedAcceptableAnswers.find(
      (acceptableAnswer) => acceptableAnswer.answerText === answerText
    ) as AcceptableAnswerInGame;
  }

  if (!ret) {
    throw new Error("findAcceptableAnswer Assertion error");
  }
  return ret;
}

export function getScoreFromLatestAnswer(game: Game) {
  if (game.questionStatus !== QuestionStatus.awardingPoints) {
    return 0;
  }

  if (!game.currentQuestion?.lastAnswer) {
    throw new Error('getScoreFromLatestAnswer assertion error');
  }

  switch (game.currentQuestion?.lastAnswer) {
    case NON_VERIFIED_ANSWER:
      return 0;
    case NO_OR_INVALID_ANSWER:
      return 100;
    default:
      return findAcceptableAnswer(game.currentQuestion.question.acceptableAnswers, game.currentQuestion.lastAnswer)?.points || 0;
  }
}
