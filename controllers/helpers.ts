import { AcceptableOrGroupedAcceptableAnswers, Game, NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER, QuestionStatus, isGroupedAcceptableAnswers } from "../models/types";
import { AcceptableAnswerInGame, AcceptableOrGroupedAcceptableAnswersInGame } from './../models/types';

export function getFlatAcceptableAnswers(acceptableOrGroupedAnswers: AcceptableOrGroupedAcceptableAnswers) {
  if (isGroupedAcceptableAnswers(acceptableOrGroupedAnswers)) {
    return Object.values(acceptableOrGroupedAnswers).flat();
  }
  return acceptableOrGroupedAnswers;
}

export function findAcceptableAnswer(
  acceptableOrGroupedAcceptableAnswers: AcceptableOrGroupedAcceptableAnswersInGame,
  answerText: string
): AcceptableAnswerInGame {
  let ret: AcceptableAnswerInGame;

  if (isGroupedAcceptableAnswers(acceptableOrGroupedAcceptableAnswers)) {
    ret = Object.values(acceptableOrGroupedAcceptableAnswers)
      .flat()
      .find(
        (acceptableAnswer) => acceptableAnswer.answerText === answerText
      )!;
  } else {
    ret = acceptableOrGroupedAcceptableAnswers.find(
      (acceptableAnswer) => acceptableAnswer.answerText === answerText
    )!;
  }

  if (!ret) {
    throw new Error("findAcceptableAnswer Assertion error");
  }
  return ret;
}

export function markAnswerAsAccepted(
  acceptableOrGroupedAcceptableAnswersInGame: AcceptableOrGroupedAcceptableAnswersInGame,
  answerText: string
) {

  if (isGroupedAcceptableAnswers(acceptableOrGroupedAcceptableAnswersInGame)) {
    const groupedAcceptableAnswersInGame = acceptableOrGroupedAcceptableAnswersInGame;
    Object.keys(groupedAcceptableAnswersInGame).forEach((key) => {
      groupedAcceptableAnswersInGame[key].find((acceptableAnswerInGame) => {
        if (acceptableAnswerInGame.answerText === answerText) {
          acceptableAnswerInGame.answered = true;
        }
        return true;
      });
    })
  } else {
    const acceptableAnswerInGame = acceptableOrGroupedAcceptableAnswersInGame.find(
      (acceptableAnswerInGame) => acceptableAnswerInGame.answerText === answerText
    );
    acceptableAnswerInGame!.answered = true;
  }
}

export function getPointsFromLatestAnswer(game: Game) {
  if (game.questionStatus !== QuestionStatus.awardingPoints) {
    return 0;
  }

  if (!game.currentQuestion?.lastAnswer) {
    throw new Error('getPointsFromLatestAnswer assertion error');
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
