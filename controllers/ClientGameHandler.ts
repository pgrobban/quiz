import { Socket } from "socket.io-client";
import Router from "next/router";
import { Game, GameRound } from "../models/types";

export default class ClientGameHandler {

  private activeGame: Game | null = null;
  private hostReceivedGames: Game[] = [];
  private role: 'play' | 'host' | null = null;

  constructor(private socket: Socket) {}

  requestNewGame() {
    this.role = 'play';
    this.socket.emit('new-game');
  }

  requestStartGame(teamNames: string[]) {
    this.socket.emit('start-game', { gameId: this.activeGame?.id, teamNames })
  }

  requestToBeHost() {
    this.role = 'host';
    Router.push('/host/game-list');
  }

  requestGames() {
    this.socket.emit('request-games');
  }

  requestHostJoinGame(gameId: string) {
    this.socket.emit('request-host-join-game', gameId);
  }

  requestSetActiveQuestion(gameRound: GameRound, questionText: string) {
    this.socket.emit('request-set-active-question', {
      gameRound,
      questionText
    });
  }

  getActiveGame() {
    if (!this.activeGame) {
      throw new Error('No game in progress');
    }
    return this.activeGame;
  }

  getHostReceivedGames() {
    return this.hostReceivedGames;
  }

  onConnected() {
    console.log("*** connected" );
  }

  onDisconnected() {
    console.log("*** disconnected" );
  }

  onNewGameCreated(game: Game) {
    this.activeGame = game;
    Router.push('/player/new-game');
  }

  onGameStarted(game: Game) {
    this.activeGame = game;
    Router.push('/player/game');
  }

  onHostReceivedGames(games: Game[]) {
    this.hostReceivedGames = games;
  }

  onHostJoinedGame(game: Game) {
    this.activeGame = game;

    if (this.role === 'host') {
      Router.push('/host/game');
    }
  }

}