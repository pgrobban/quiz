import { v4 as uuid } from 'uuid';
import { Game, GameRound, GameStatus, QuestionStatus } from '../models/types';

export default class GameHandler {

  private games: Game[];

  constructor () {
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

}