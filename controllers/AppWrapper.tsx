import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io";
import io from "socket.io-client";
import ClientGameHandler from "./ClientGameHandler";
import { Game } from "./GameHandler";

export interface IAppContext {
  socket: Socket | null;
  gameHandler: ClientGameHandler;
}

const gameHandler = new ClientGameHandler();
const AppContext = createContext<IAppContext>({ socket: null, gameHandler });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [, updateState] = useState();

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");
      const s = io();
      s.on("connect", gameHandler.onConnected);
      s.on("new-game-created", (game: Game) => { gameHandler.onNewGameCreated(game); updateState(undefined); });
      s.on('game-started', (game) => { gameHandler.onGameStarted(game); updateState(undefined); });
      setSocket(s);
    };
    getSocket();
    console.log("*** should only get here once")
  }, []);

  return (
    <AppContext.Provider value={{ socket, gameHandler }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
