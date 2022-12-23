import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import GameHandler from '../../controllers/GameHandler'

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
    return res.end(); // socket is already runing
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

    socket.on('start-game', ({ gameId, teamNames }) => {
      const game = gameHandler.startGame(gameId, teamNames);
      socket.join(game.id);
      socket.emit('game-started', game);
    });

    socket.on("request-games", () => {
      const games = gameHandler.requestGames();
      socket.emit('received-games', games);
    });

    socket.on("request-host-join-game", (gameId) => {
      const game = gameHandler.requestHostJoinGame(gameId);
      socket.join(game.id);
    
      io.to(game.id).emit('host-joined-game', game);
      console.log("** host-joined-game", gameId)
    });
  });

  io.on('disconnect', () => {
    console.log("*** disconnected")
  })

  return res.end();
}

export default SocketHandler;