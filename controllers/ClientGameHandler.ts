import { Socket } from "socket.io-client";
import Router from "next/router";
import { Game, GameRound } from "../models/types";

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'unknown';

export default class ClientGameHandler {

  private activeGame: Game | null = null;
  private connectionStatus: ConnectionStatus = 'connected';
  private hostReceivedGames: Game[] = [];
  private role: 'play' | 'host' | null = null;

  constructor(private socket: Socket) { }

  requestNewGame() {
    this.role = 'play';
    this.socket.emit('request-new-game');
  }

  requestEndGame() {
    this.socket.emit('request-end-game', this.activeGame?.id);
  }

  requestStartGame(teamNames: string[]) {
    if (!this.activeGame) {
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

  requestUndoRoundSelection() {
    this.socket.emit('request-undo-active-round', this.activeGame?.id);
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

  requestAddingPoints() {
    this.socket.emit('request-adding-points', this.activeGame?.id);
  }

  requestContinueGame() {
    this.socket.emit('request-continue-game', this.activeGame?.id);
  }

  requestEndQuestion() {
    this.socket.emit('request-end-question', this.activeGame?.id);
  }

  requestEnableHeadToHead() {
    this.socket.emit('request-enable-head-to-head', this.activeGame?.id);
  }

  requestHeadToHeadAnswerSubmission(answerTexts: string[]) {
    this.socket.emit('request-head-to-head-answers-submission', { gameId: this.activeGame?.id, answerTexts });
  }

  requestPictureBoardNextSlide() {
    this.socket.emit('request-picture-board-next-slide', this.activeGame?.id);
  }

  requestPictureBoardPreviousSlide() {
    this.socket.emit('request-picture-board-previous-slide', this.activeGame?.id);
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

  onReceivedGame(game: Game) {
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
    } else {
      this.socket.emit('request-game', game.id);
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

  onAddedPoints(game: Game) {
    this.activeGame = game;
  }

  onActiveRoundUndone(game: Game) {
    this.activeGame = game;
  }

  onQuestionEnded(game: Game) {
    this.activeGame = game;
  }

  onHeadToHeadEnabled(game: Game) {
    this.activeGame = game;
  }

  onHeadToHeadAnswersSubmitted(game: Game) {
    this.activeGame = game;
  }

  onGameEnded(game: Game) {
    this.activeGame = game;
    Router.push('/player/game-ended');
  }

  onPictureBoardSlideUpdated(game: Game) {
    this.activeGame = game;
  }
}