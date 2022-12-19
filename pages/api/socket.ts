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
    console.log('*** Socket is already running')
  } else {
    console.log('*** Socket is initializing')
    const gameHandler = new GameHandler();
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('new-game', () => {
        console.log("*** new game")
        const game = gameHandler.createNewGame();
        socket.emit('new-game-created', game);
      });

      socket.on('game-start', ({ gameId, teamNames }) => {
        const game = gameHandler.startGame(gameId, teamNames);
        socket.emit('game-started', game);
      });
    });
  }
  res.end()
}

export default SocketHandler;