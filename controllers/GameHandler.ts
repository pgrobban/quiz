import { v4 as uuid } from 'uuid';
import { Game, GameStatus, QuestionStatus } from '../models/types';

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
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error(`*** Didn't find game with id ${gameId}`);
    }
    game.teamsAndPoints = teamNames.map((teamName) => ({
      teamName,
      points: 0
    }));
    game.gameStatus = GameStatus.waitingForHost;
    return game;
  }

  requestGames() {
    return this.games;
  }

  requestHostJoinGame(gameId: string) {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error(`*** Didn't find game with id ${gameId}`);
    }
    game.gameStatus = GameStatus.inProgress;
    game.questionStatus = QuestionStatus.waitingForQuestion;
    return game;
  }

}