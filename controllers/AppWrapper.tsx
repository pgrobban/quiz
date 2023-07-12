import { cloneDeep } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Game } from "../models/types";
import ClientGameHandler from "./ClientGameHandler";
export interface IAppContext {
  gameHandler: ClientGameHandler;
  gameState: Game | null;
}

const socket = io();
const gh = new ClientGameHandler(socket);
export const AppContext = createContext<IAppContext>({ gameHandler: gh, gameState: null });

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameHandler, _] = useState<ClientGameHandler>(gh);
  const [gameState, setGameState] = useState<Game | null>(null);

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      socket.on("connect", () => {
        gameHandler.onConnected();
      });
      socket.on("disconnect", () => {
        gameHandler.onDisconnected();
      });

      socket.on("new-game-created", (game: Game) => {
        gameHandler.onNewGameCreated(game);
        setGameState(game);
      });
      socket.on("game-started", (game: Game) => {
        gameHandler.onGameStarted(game);
        setGameState(game);
      });
      socket.on("received-games", (games: Game[]) => {
        gameHandler.onHostReceivedGames(games);
      });
      socket.on("received-game", (game: Game) => {
        gameHandler.onReceivedGame(game);
        setGameState(game);
      });
      socket.on("host-joined-game", (game: Game) => {
        gameHandler.onHostJoinedGame(game);
        setGameState(game);
      });
      socket.on("active-round-set", (game: Game) => {
        gameHandler.onActiveRoundSet(game);
        setGameState(game);
      });
      socket.on("active-question-set", (game: Game) => {
        gameHandler.onActiveQuestionSet(game);
        setGameState(game);
      });
      socket.on("team-answer-requested", (game: Game) => {
        gameHandler.onTeamAnswerRequested(game);
        setGameState(game);
      });
      socket.on("answer-verified", (game: Game) => {
        gameHandler.onAnswerVerified(game);
        setGameState(game);
      });
      socket.on("added-score", (game: Game) => {
        gameHandler.onAddedScore(game);
        setGameState(game);
      });
    };
    getSocket();
    return () => {
      socket.removeAllListeners();
    }
  }, [gameHandler]);

  return (
    <AppContext.Provider value={{ gameHandler, gameState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
