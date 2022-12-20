import { Socket } from "socket.io-client";
import { Game } from "./GameHandler";
import Router from "next/router";

export default class ClientGameHandler {

  private game: Game | null = null;

  constructor(private socket: Socket) {}

  requestNewGame() {
    this.socket.emit('new-game');
  }

  requestStartGame(teamNames: string[]) {
    this.socket.emit('start-game', { gameId: this.game?.id, teamNames })
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
    Router.push('/new-game');
    console.log("*** new game created", game);
  }

  onGameStarted(game: Game) {
    this.game = game;
    Router.push('/game');
    console.log("*** game created", game);
  }

}