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
export const AppContext = createContext<IAppContext>({ gameHandler: gh });

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameHandler, setGameHandler] = useState<ClientGameHandler>(gh);

  useEffect(() => {
    const getSocket = async () => {
      await fetch("/api/socket");

      socket.on("connect", () => {
        gameHandler.onConnected();
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("disconnect", () => {
        gameHandler.onDisconnected();
        setGameHandler(cloneDeep(gameHandler));
      });

      socket.on("new-game-created", (game: Game) => {
        gameHandler.onNewGameCreated(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("game-started", (game: Game) => {
        gameHandler.onGameStarted(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("received-games", (games: Game[]) => {
        gameHandler.onHostReceivedGames(games);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("received-game", (game: Game) => {
        gameHandler.onReceivedGameAfterReconnect(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.once("host-joined-game", (game: Game) => {
        gameHandler.onHostJoinedGame(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("active-round-set", (game: Game) => {
        gameHandler.onActiveRoundSet(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("active-question-set", (game: Game) => {
        gameHandler.onActiveQuestionSet(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("team-answer-requested", (game: Game) => {
        gameHandler.onTeamAnswerRequested(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("answer-verified", (game: Game) => {
        gameHandler.onAnswerVerified(game);
        setGameHandler(cloneDeep(gameHandler));
      });
      socket.on("added-score", (game: Game) => {
        gameHandler.onAddedScore(game);
        setGameHandler(cloneDeep(gameHandler));
        socket.emit('request-continue-game');
      });
    };
    getSocket();
  }, [gameHandler]);

  return (
    <AppContext.Provider value={{ gameHandler }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
