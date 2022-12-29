import { v4 as uuid } from 'uuid';
import { AnswerStatus, Game, GameRound, GameStatus, NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER, QuestionStatus, TeamAndPoints } from '../models/types';
import questions from '../models/questions';
import { orderBy, shuffle } from 'lodash';
export default class GameHandler {

  private games: Game[];

  constructor() {
    this.games = [];
  }

  createNewGame() {
    const id = uuid();
    const game = { id, gameStatus: GameStatus.created };
    this.games.push(game);
    return game;
  }

  startGame(gameId: string, teamNames: string[]) {
    const game = this.getGameById(gameId);
    game.teamsAndPoints = teamNames.map((teamName) => ({
      teamName,
      points: 0
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
    game.round = gameRound;
    game.questionStatus = QuestionStatus.waitingForQuestion;
    return game;
  }

  requestSetActiveQuestion(gameId: string, questionText: string) {
    const game = this.getGameById(gameId);
    const { round } = game;
    if (!round) {
      throw new Error(`*** Tried to get round from active game ${gameId}`);
    }

    const questionModel = questions[round].find((question) => question.questionText === questionText);
    if (!questionModel) {
      throw new Error(`Tried to find question '${questionText}' in round ${round}`);
    }

    const questionWithAnswerStatuses = { ...questionModel, possibleAnswers: questionModel.possibleAnswers.map((answer) => ({ answerText: answer.answerText, points: answer.points, status: 'unanswered' as AnswerStatus })) };
    game.currentQuestion = {
      question: questionWithAnswerStatuses,
      questionInRound: game.currentQuestion ? (game.currentQuestion.questionInRound + 1) : 1,
      answeredTeams: []
    };
    game.questionStatus = QuestionStatus.receivedQuestion;
    return game;
  }

  requestTeamAnswer(gameId: string) {
    const game = this.getGameById(gameId);
    if (!game.currentQuestion || !game.teamsAndPoints || !game.questionStatus || ![QuestionStatus.receivedQuestion, QuestionStatus.waitingForTeamAnswer].includes(game.questionStatus)) {
      throw new Error('requestTeamAnswer Assertion error');
    }

    if (game.questionStatus === QuestionStatus.receivedQuestion) {
      game.currentQuestion.orderedTeamsLeftToAnswer = this.getOrderedTeamsToAnswer(game.teamsAndPoints, game.currentQuestion.questionInRound);
      game.currentQuestion.answeredTeams = [];
    } else {
      if (!game.currentQuestion.orderedTeamsLeftToAnswer) {
        throw new Error('requestTeamAnswer Assertion error');
      }

      game.currentQuestion.answeredTeams.push(game.currentQuestion.orderedTeamsLeftToAnswer[0])
      game.currentQuestion.orderedTeamsLeftToAnswer = game.currentQuestion.orderedTeamsLeftToAnswer.slice(1);
    }

    game.questionStatus = QuestionStatus.waitingForTeamAnswer;
    return game;
  }

  private getOrderedTeamsToAnswer(teamsAndPoints: TeamAndPoints[], questionInRound: number) {
    let orderedTeamsAndPoints;
    switch (questionInRound) {
      case 1:
        orderedTeamsAndPoints = shuffle(teamsAndPoints);
      case 2:
        orderedTeamsAndPoints = orderBy(teamsAndPoints, ['points'], ['asc']);
      case 3:
      default:
        orderedTeamsAndPoints = orderBy(teamsAndPoints, ['points'], ['desc']);
    }
    return orderedTeamsAndPoints.map((teamAndPoints) => teamAndPoints.teamName);
  }

  requestVerificationOfAnswer(gameId: string, answerText: string) {
    const game = this.getGameById(gameId);
    if (!game.currentQuestion || game.questionStatus !== QuestionStatus.waitingForTeamAnswer) {
      throw new Error('requestVerificationOfAnswer Assertion error');
    }

    game.questionStatus = QuestionStatus.awardingPoints;

    if (![NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER].includes(answerText)) {
      const foundPossibleAnswer = game.currentQuestion.question.possibleAnswers.find((possibleAnswer) => possibleAnswer.answerText === answerText);
      if (foundPossibleAnswer) {
        foundPossibleAnswer.status = 'answered';
      } else {
        throw new Error('requestVerificationOfAnswer Assertion error');
      }
    }
    return game;
  }

}