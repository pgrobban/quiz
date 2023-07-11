import { orderBy, shuffle } from "lodash";
import { v4 as uuid } from "uuid";
import questions from "../models/questions";
import {
  Game,
  GameRound,
  GameStatus,
  NON_VERIFIED_ANSWER,
  NO_OR_INVALID_ANSWER,
  QuestionStatus,
  TeamAndPoints,
} from "../models/types";

const NUMBER_OF_TURNS_FOR_ROUND: Record<GameRound, number> = {
  [GameRound.openEnded]: 3,
  [GameRound.cluesAndAnswers]: 3,
  [GameRound.fillInBlank]: 3,
  [GameRound.linkedCategories]: 3,
  [GameRound.partIdentification]: 3,
  [GameRound.possibleAnswers]: 3
}

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
      throw new Error("*** requstSetActiveRound Assertion error");
    }

    game.round = gameRound;
    game.questionStatus = QuestionStatus.waitingForQuestion;
    return game;
  }

  requestSetActiveQuestion(gameId: string, questionText: string) {
    console.log("*** requestSetActiveQuestion")
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
      possibleAnswers: questionModel.possibleAnswers.map((answer) => ({
        answerText: answer.answerText,
        points: answer.points,
        answered: false,
      })),
    };
    game.currentQuestion = {
      question: questionWithAnswerStatuses,
      questionInRound: game.currentQuestion
        ? game.currentQuestion.questionInRound + 1
        : 1,
      answeredTeams: [],
      turn: 0
    };
    game.questionStatus = QuestionStatus.receivedQuestion;
    this.requestSetTurnNumber(game.id);
    return this.requestTeamAnswer(game.id);
  }

  requestSetTurnNumber(gameId: string) {
    const game = this.getGameById(gameId);
    const { round, gameStatus } = game;
    if (gameStatus !== GameStatus.inProgress || !round || game.questionStatus !== QuestionStatus.receivedQuestion || !game.currentQuestion) {
      throw new Error("*** requestSetTurnNumber Assertion error");
    }

    game.currentQuestion.turn += 1;
    return game;
  }

  requestTeamAnswer(gameId: string) {
    const game = this.getGameById(gameId);
    console.log("*** in requestTeamAnswer", game)

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
      console.log("***", game)
      throw new Error("requestTeamAnswer Assertion error");
    }

    if (game.questionStatus === QuestionStatus.receivedQuestion) {
      game.currentQuestion.orderedTeamsLeftToAnswer =
        this.getOrderedTeamsToAnswer(
          game.teamsAndPoints,
          game.currentQuestion.turn
        );
      game.currentQuestion.answeredTeams = [];
      game.currentQuestion.lastAnswer = undefined;
    } else {
      if (!game.currentQuestion.orderedTeamsLeftToAnswer) {
        console.log("***", game)
        throw new Error("requestTeamAnswer Assertion error");
      }

      game.currentQuestion.answeredTeams.push(
        game.currentQuestion.orderedTeamsLeftToAnswer[0]
      );
      game.currentQuestion.orderedTeamsLeftToAnswer =
        game.currentQuestion.orderedTeamsLeftToAnswer.slice(1);
    }

    game.questionStatus = QuestionStatus.waitingForTeamAnswer;

    return game;
  }

  private getOrderedTeamsToAnswer(
    teamsAndPoints: TeamAndPoints[],
    turn: number
  ) {
    let orderedTeamsAndPoints;
    switch (turn) {
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
      const foundPossibleAnswer =
        game.currentQuestion.question.possibleAnswers.find(
          (possibleAnswer) => possibleAnswer.answerText === answerText
        );
      if (foundPossibleAnswer) {
        foundPossibleAnswer.answered = true;
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
      game.questionStatus !== QuestionStatus.awardingPoints
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
      const foundPossibleAnswer =
        game.currentQuestion.question.possibleAnswers.find(
          (possibleAnswer) => possibleAnswer.answerText === lastAnswer
        );
      if (!foundPossibleAnswer) {
        throw new Error("requestVerificationOfAnswer Assertion error");
      } else {
        t.points += foundPossibleAnswer.points;
      }
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

    if (game.currentQuestion.orderedTeamsLeftToAnswer.length > 0) {
      game.questionStatus = QuestionStatus.waitingForTeamAnswer;
      return this.requestTeamAnswer(gameId);
    }

    if (game.currentQuestion.turn < NUMBER_OF_TURNS_FOR_ROUND[game.round]) {
      this.requestSetTurnNumber(gameId);
      return this.requestTeamAnswer(gameId);
    }
    return game;
  }
}
