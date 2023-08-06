import { AcceptableOrGroupedAcceptableAnswersInGame, GroupedAcceptableAnswersInGame } from './../models/types';
import { orderBy, shuffle } from "lodash";
import { v4 as uuid } from "uuid";
import questions from "../models/questions";
import {
  AcceptableAnswerInGame,
  AcceptableOrGroupedAcceptableAnswers,
  Game,
  GameRound,
  GameStatus,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
  QuestionStatus,
  TeamAndPoints,
  isGroupedAcceptableAnswers,
} from "../models/types";
import { findAcceptableAnswer } from './helpers';

const NUMBER_OF_PASSES_FOR_ROUND: Record<GameRound, number> = {
  [GameRound.openEnded]: 3,
  [GameRound.cluesAndAnswers]: 1,
  [GameRound.fillInBlank]: 1,
  [GameRound.linkedCategories]: 1,
  [GameRound.partIdentification]: 1,
  [GameRound.possibleAnswers]: 1,
  [GameRound.pictureBoard]: 1
};

const NUMBER_OF_QUESTIONS_FOR_ROUND: Record<GameRound, number> = {
  [GameRound.openEnded]: 3,
  [GameRound.cluesAndAnswers]: 3,
  [GameRound.fillInBlank]: 3,
  [GameRound.linkedCategories]: 3,
  [GameRound.partIdentification]: 3,
  [GameRound.possibleAnswers]: 3,
};

export default class GameHandler {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  createNewGame(): Game {
    const id = uuid();
    const game = { id, gameStatus: GameStatus.created };
    this.games.push(game);
    return game;
  }

  startGame(gameId: string, teamNames: string[]) {
    const game = this.getGameById(gameId);
    game.teamsAndPoints = teamNames.map((teamName) => ({
      teamName,
      points: 0,
    }));
    game.gameStatus = GameStatus.waitingForHost;
    return game;
  }

  getGames() {
    return this.games;
  }

  getGameById(gameId: string) {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error(`*** Didn't find game with id ${gameId}`);
    }
    return game;
  }

  requestHostJoinGame(gameId: string) {
    const game = this.getGameById(gameId);
    game.gameStatus = GameStatus.inProgress;
    game.questionStatus = QuestionStatus.waitingForRound;
    return game;
  }

  requestSetActiveRound(gameId: string, gameRound: GameRound) {
    const game = this.getGameById(gameId);
    if (game.gameStatus !== GameStatus.inProgress) {
      throw new Error("*** requestSetActiveRound Assertion error");
    }

    game.round = gameRound;
    game.questionStatus = QuestionStatus.waitingForQuestion;
    return game;
  }

  private getAcceptableAnswersInGame(
    acceptableAnswers: AcceptableOrGroupedAcceptableAnswers
  ): AcceptableOrGroupedAcceptableAnswersInGame {
    if (isGroupedAcceptableAnswers(acceptableAnswers)) {
      const result: GroupedAcceptableAnswersInGame = {};
      Object.keys(acceptableAnswers).forEach((key) => {
        result[key] = acceptableAnswers[key].map((acceptableAnswer) => ({
          ...acceptableAnswer,
          answered: false,
        }));
      })
      return result;
    }
    return acceptableAnswers.map((acceptableAnswer) => ({
      ...acceptableAnswer,
      answered: false,
    }));
  }

  requestSetActiveQuestion(gameId: string, questionText: string) {
    console.log("*** requestSetActiveQuestion");
    const game = this.getGameById(gameId);
    const { round, gameStatus } = game;
    if (gameStatus !== GameStatus.inProgress || !round) {
      throw new Error("*** requestSetActiveQuestion Assertion error");
    }

    if (!round) {
      throw new Error(`*** Tried to get round from active game ${gameId}`);
    }

    const questionModel = questions[round].find(
      (question) => question.questionText === questionText
    );
    if (!questionModel) {
      throw new Error(
        `Tried to find question '${questionText}' in round ${round}`
      );
    }

    const questionWithAnswerStatuses = {
      ...questionModel,
      acceptableAnswers: this.getAcceptableAnswersInGame(
        questionModel.acceptableAnswers
      ),
    };
    game.currentQuestion = {
      question: questionWithAnswerStatuses,
      questionInRound: game.currentQuestion
        ? game.currentQuestion.questionInRound + 1
        : 1,
      answeredTeams: [],
      pass: 0,
    };
    game.questionStatus = QuestionStatus.receivedQuestion;
    this.requestSetTurnNumber(game.id);
    return this.requestTeamAnswer(game.id);
  }

  requestSetTurnNumber(gameId: string) {
    const game = this.getGameById(gameId);
    const { round, gameStatus } = game;
    if (
      gameStatus !== GameStatus.inProgress ||
      !round ||
      game.questionStatus !== QuestionStatus.receivedQuestion ||
      !game.currentQuestion
    ) {
      throw new Error("*** requestSetTurnNumber Assertion error");
    }

    game.currentQuestion.pass++;
    console.log("*** after requestSetTurnNumber", game);
    return game;
  }

  requestTeamAnswer(gameId: string) {
    const game = this.getGameById(gameId);
    console.log("*** in requestTeamAnswer", game);

    if (
      !game.currentQuestion ||
      !game.teamsAndPoints ||
      !game.questionStatus ||
      game.gameStatus !== GameStatus.inProgress ||
      ![
        QuestionStatus.receivedQuestion,
        QuestionStatus.waitingForTeamAnswer,
      ].includes(game.questionStatus)
    ) {
      console.log("***", game);
      throw new Error("requestTeamAnswer Assertion error");
    }

    if (
      game.questionStatus === QuestionStatus.receivedQuestion &&
      (!game.currentQuestion.lastAnswer ||
        game.currentQuestion.orderedTeamsLeftToAnswer?.length === 0)
    ) {
      game.currentQuestion.orderedTeamsLeftToAnswer =
        this.getOrderedTeamsToAnswer(
          game.teamsAndPoints,
          game.currentQuestion.pass
        );
      game.currentQuestion.answeredTeams = [];
      game.currentQuestion.lastAnswer = undefined;
    } else {
      if (!game.currentQuestion.orderedTeamsLeftToAnswer) {
        console.log("***", game);
        throw new Error("requestTeamAnswer Assertion error");
      }
    }

    game.questionStatus = QuestionStatus.waitingForTeamAnswer;

    console.log("*** after requestTeamAnswer", game);
    return game;
  }

  private getOrderedTeamsToAnswer(
    teamsAndPoints: TeamAndPoints[],
    pass: number
  ) {
    let orderedTeamsAndPoints;
    switch (pass) {
      case 1:
        orderedTeamsAndPoints = shuffle(teamsAndPoints);
      case 2:
        orderedTeamsAndPoints = orderBy(teamsAndPoints, ["points"], ["asc"]);
      case 3:
      default:
        orderedTeamsAndPoints = orderBy(teamsAndPoints, ["points"], ["desc"]);
    }
    return orderedTeamsAndPoints.map((teamAndPoints) => teamAndPoints.teamName);
  }

  requestVerificationOfAnswer(gameId: string, answerText: string) {
    const game = this.getGameById(gameId);
    if (
      !game.currentQuestion ||
      game.questionStatus !== QuestionStatus.waitingForTeamAnswer
    ) {
      console.log(game);
      throw new Error("requestVerificationOfAnswer Assertion error");
    }

    game.questionStatus = QuestionStatus.awardingPoints;

    if (![NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER].includes(answerText)) {
      const foundAcceptableAnswer = findAcceptableAnswer(
        game.currentQuestion.question.acceptableAnswers,
        answerText
      );
      if (foundAcceptableAnswer) {
        foundAcceptableAnswer.answered = true;
      } else {
        console.log(game);
        throw new Error("requestVerificationOfAnswer Assertion error");
      }
    }

    game.currentQuestion.lastAnswer = answerText;
    return game;
  }

  requestAddingOfScore(gameId: string) {
    const game = this.getGameById(gameId);
    if (
      !game.currentQuestion ||
      !game.currentQuestion?.orderedTeamsLeftToAnswer ||
      !game.teamsAndPoints ||
      game.questionStatus !== QuestionStatus.awardingPoints ||
      !game.currentQuestion.lastAnswer
    ) {
      console.log(game);
      throw new Error("requestAddingOfScore Assertion error");
    }

    const teamToAwardPoints = game.currentQuestion.orderedTeamsLeftToAnswer[0];
    const t = game.teamsAndPoints.find(
      (team) => team.teamName === teamToAwardPoints
    );
    if (!t) {
      console.log(game);
      throw new Error("requestAddingOfScore Assertion error");
    }

    const lastAnswer = game.currentQuestion.lastAnswer;
    if (lastAnswer === NO_OR_INVALID_ANSWER) {
      t.points += 100;
    } else if (lastAnswer === NON_VERIFIED_ANSWER) {
      // nothing
    } else {
      const foundAcceptableAnswer = findAcceptableAnswer(
        game.currentQuestion.question.acceptableAnswers,
        lastAnswer
      );
      t.points += foundAcceptableAnswer.points;
    }

    game.questionStatus = QuestionStatus.pointsAdded;
    return game;
  }

  requestContinueGame(gameId: string) {
    const game = this.getGameById(gameId);
    if (
      !game.currentQuestion ||
      !game.round ||
      !game.currentQuestion?.orderedTeamsLeftToAnswer ||
      !game.teamsAndPoints ||
      game.questionStatus !== QuestionStatus.pointsAdded
    ) {
      console.log(game);
      throw new Error("requestContinueGame Assertion error");
    }

    game.currentQuestion.answeredTeams.push(
      game.currentQuestion.orderedTeamsLeftToAnswer[0]
    );
    game.currentQuestion.orderedTeamsLeftToAnswer =
      game.currentQuestion.orderedTeamsLeftToAnswer.slice(1);

    if (game.currentQuestion.orderedTeamsLeftToAnswer.length > 0) {
      game.questionStatus = QuestionStatus.receivedQuestion;
      return this.requestTeamAnswer(gameId);
    }

    if (game.currentQuestion.pass < NUMBER_OF_PASSES_FOR_ROUND[game.round]) {
      game.questionStatus = QuestionStatus.receivedQuestion;
      this.requestSetTurnNumber(gameId);
      return this.requestTeamAnswer(gameId);
    }

    game.currentQuestion.questionInRound++;
    if (
      game.currentQuestion.questionInRound <
      NUMBER_OF_QUESTIONS_FOR_ROUND[game.round]
    ) {
      game.questionStatus = QuestionStatus.waitingForQuestion;
    }
    return game;
  }
}
