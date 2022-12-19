import { v4 as uuid } from 'uuid';

enum GameStatus {
  created = 'created',
  started = 'started',
  inProgress = 'in_progress',
  ended = 'ended'
}

export interface Game {
  id: string;
  status: GameStatus;
  teamsAndPoints?: {
    teamName: string;
    points: number;
  }[];
}

export default class GameHandler {

  private games: Game[];

  constructor () {
    this.games = [];
  }

  createNewGame() {
    const id = uuid();
    const game = { id, status: GameStatus.created };
    this.games.push(game);
    return game;
  }

  startGame(gameId: string, teamNames: string[]) {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      console.error("*** Didn't find game with id", gameId);
      return;
    }
    game.teamsAndPoints = teamNames.map((teamName) => ({
      teamName,
      points: 0
    }));
    game.status = GameStatus.started;
    return game;
  }

}