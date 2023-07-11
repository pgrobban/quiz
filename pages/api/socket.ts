import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import GameHandler from '../../controllers/GameHandler'
import { QuestionStatus } from '../../models/types'

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    return res.end(); // socket is already running
  }
  const gameHandler = new GameHandler();
  const io = new Server(res.socket.server)
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('connect', () => console.log("*** client connected"));

    socket.on('new-game', () => {
      const game = gameHandler.createNewGame();
      socket.emit('new-game-created', game);
    });

    socket.once('start-game', ({ gameId, teamNames }) => {
      console.log("**** socket start game")
      const game = gameHandler.startGame(gameId, teamNames);
      socket.join(game.id);
      socket.emit('game-started', game);
    });

    socket.on('request-games', () => {
      const games = gameHandler.getGames();
      socket.emit('received-games', games);
    });

    socket.on('request-game', (gameId: string) => {
      const game = gameHandler.getGameById(gameId);
      socket.emit('received-game', game);
    });

    socket.on('request-host-join-game', (gameId) => {
      const game = gameHandler.requestHostJoinGame(gameId);
      socket.join(game.id);

      io.to(game.id).emit('host-joined-game', game);
    });

    socket.on('request-set-active-round', ({ gameId, gameRound }) => {
      const game = gameHandler.requestSetActiveRound(gameId, gameRound);
      io.to(game.id).emit('active-round-set', game);
    });

    socket.on('request-set-active-question', ({ gameId, questionText }) => {
      const game = gameHandler.requestSetActiveQuestion(gameId, questionText);
      io.to(game.id).emit('active-question-set', game);
    });

    socket.on('request-team-answer', (gameId) => {
      const game = gameHandler.requestTeamAnswer(gameId);
      io.to(game.id).emit('team-answer-requested', game);
    });

    socket.on('request-verification-of-answer', ({ gameId, answerText }) => {
      const game = gameHandler.requestVerificationOfAnswer(gameId, answerText);
      io.to(game.id).emit('answer-verified', game);
    });

    socket.on('request-adding-score', (gameId) => {
      const game = gameHandler.requestAddingOfScore(gameId);
      io.to(game.id).emit('added-score', game);
    });

    socket.on('request-continue-game', (gameId) => {
      console.log("*** in request continue game", gameId)
      const game = gameHandler.requestContinueGame(gameId);
      switch (game.questionStatus) {
        case QuestionStatus.waitingForTeamAnswer:
          io.to(game.id).emit('team-answer-requested', game);
        default:
          console.log("bla")
      }
    });
  });

  io.on('disconnect', () => {
    console.log("*** disconnected")
  })

  return res.end();
}

export default SocketHandler;