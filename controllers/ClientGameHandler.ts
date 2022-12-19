import { Game } from "./GameHandler";

export default class ClientGameHandler {

  private game: Game | null = null;

  constructor() {}

  getGameId() {
    console.log("***", this.game);
    if (!this.game) {
      throw new Error('No game in progress');
    }
    return this.game.id;
  }

  getTeamNamesAndPoints() {
    if (!this.game) {
      throw new Error('No game in progress');
    }
    return this.game.teamsAndPoints;
  }

  onConnected() {
    console.log("*** connected" );
  }

  onNewGameCreated(game: Game) {
    this.game = game;
    console.log("*** new game created", game);
  }

  onGameStarted(game: Game) {
    this.game = game;
    console.log("*** game created", game);
  }

}