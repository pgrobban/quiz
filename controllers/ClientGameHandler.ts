import { Socket } from "socket.io-client";
import Router from "next/router";
import { Game, GameRound } from "../models/types";

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'unknown';

export default class ClientGameHandler {

  private activeGame: Game | null = null;
  private connectionStatus: ConnectionStatus = 'connected';
  private hostReceivedGames: Game[] = [];
  private role: 'play' | 'host' | null = null;

  constructor(private socket: Socket) {
    console.log("*** creating socket")
    this.socket.on('added-score', () => this.requestContinueGame());
  }

  requestNewGame() {
    this.role = 'play';
    this.socket.emit('new-game');
  }

  requestStartGame(teamNames: string[]) {
    console.log("**** requesting start game")
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

  requestTeamAnswer() {
    this.socket.emit('request-team-answer', this.activeGame?.id);
  }

  requestVerificationOfAnswer(answerText: string) {
    this.socket.emit('request-verification-of-answer', { gameId: this.activeGame?.id, answerText });
  }

  requestAddingScore() {
    this.socket.emit('request-adding-score', this.activeGame?.id);
  }

  requestContinueGame() {
    console.log("*** request continue", this.activeGame?.id)
    this.socket.emit('request-continue-game', this.activeGame?.id);
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
    this.connectionStatus = 'connected';
  }

  onDisconnected() {
    this.connectionStatus = 'disconnected';
  }

  onReceivedGameAfterReconnect(game: Game) {
    this.activeGame = game;
    this.connectionStatus = 'connected';
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

  onTeamAnswerRequested(game: Game) {
    this.activeGame = game;
  }

  onAnswerVerified(game: Game) {
    this.activeGame = game;
  }

  onAddedScore(game: Game) {
    this.activeGame = game;
  }
}