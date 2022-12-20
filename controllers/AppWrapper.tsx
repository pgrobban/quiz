import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import ClientGameHandler from "./ClientGameHandler";
import { Game } from "./GameHandler";
export interface IAppContext {
  gameHandler: ClientGameHandler;
}

const socket = io();
const gh = new ClientGameHandler(socket);
const AppContext = createContext<IAppContext>({ gameHandler: gh });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [gameHandler, setGameHandler] = useState<ClientGameHandler>(gh);

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      socket.on("connect", () => { gameHandler?.onConnected(); });
      socket.on("new-game-created", (game: Game) => { gameHandler?.onNewGameCreated(game); setGameHandler(gameHandler); });
      socket.on('game-started', (game: Game) => { gameHandler?.onGameStarted(game); setGameHandler(gameHandler); });
    };
    getSocket();
  }, []);

  return (
    <AppContext.Provider value={{ gameHandler }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
