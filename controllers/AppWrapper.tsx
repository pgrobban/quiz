import { cloneDeep } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Game } from "../models/types";
import ClientGameHandler from "./ClientGameHandler";
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

      socket.on("connect", () => { gameHandler.onConnected(); });
      socket.on("disconnect", () => { gameHandler.onDisconnected(); });

      socket.on("new-game-created", (game: Game) => { gameHandler.onNewGameCreated(game); setGameHandler(cloneDeep(gameHandler)); });
      socket.on('game-started', (game: Game) => { gameHandler.onGameStarted(game); setGameHandler(cloneDeep(gameHandler)); });
      socket.on('received-games', (games: Game[]) => { gameHandler.onHostReceivedGames(games); setGameHandler(cloneDeep(gameHandler));  });
      socket.on('host-joined-game', (game: Game) => { gameHandler.onHostJoinedGame(game); setGameHandler(cloneDeep(gameHandler)); });
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
