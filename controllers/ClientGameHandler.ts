import { Socket } from "socket.io-client";
import Router from "next/router";
import { Game, GameRound } from "../models/types";

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';
export default class ClientGameHandler {

  private activeGame: Game | null = null;
  private connectionStatus: ConnectionStatus = 'connected';
  private hostReceivedGames: Game[] = [];
  private role: 'play' | 'host' | null = null;

  constructor(private socket: Socket) {}

  requestNewGame() {
    this.role = 'play';
    this.socket.emit('new-game');
  }

  requestStartGame(teamNames: string[]) {
    if (!this.activeGame || ['disconnected', 'reconnecting'].includes(this.connectionStatus)) {
      throw new Error('Requested start game while disconnected or no game in progress');
    }

    this.socket.emit('start-game', { gameId: this.activeGame.id, teamNames })
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

  requestSetActiveRound(gameRound: GameRound) {
    this.socket.emit('request-set-active-round', { gameId: this.activeGame?.id, gameRound });
  }

  requestSetActiveQuestion(questionText: string) {
    this.socket.emit('request-set-active-question', { gameId: this.activeGame?.id, questionText });
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  getActiveGame() {
    if (!this.activeGame) {
      if (typeof window === 'undefined') {
        return null; // server render
      }
      const storedGameId = localStorage.getItem('gameId');
      if (storedGameId) {
        this.connectionStatus = 'reconnecting';
        this.socket.emit('request-game', storedGameId);
        return null;
      }
      throw new Error('No game in progress');
    }
    return this.activeGame;
  }

  getHostReceivedGames() {
    return this.hostReceivedGames;
  }

  onConnected() {
    console.log("*** connected");
    this.connectionStatus = 'connected';
  }

  onDisconnected() {
    console.log("*** disconnected" );
    this.connectionStatus = 'disconnected';
  }

  onReceivedGame(game: Game) {
    this.activeGame = game;
  }

  onNewGameCreated(game: Game) {
    this.activeGame = game;
    localStorage.setItem('gameId', game.id);
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
    if (typeof window === 'undefined') {
      return null; // server render
    }

    this.activeGame = game;
    localStorage.setItem('gameId', game.id);

    if (this.role === 'host') {
      Router.push('/host/game');
    }
  }

  onActiveRoundSet(game: Game) {
    this.activeGame = game;
  }

  onActiveQuestionSet(game: Game) {
    this.activeGame = game;
  }

}