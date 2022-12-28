import Router from "next/router";
import { ComponentType, useEffect, useState } from "react";
import { useAppContext } from "../controllers/AppWrapper";
import { ConnectionStatus } from "../controllers/ClientGameHandler";

export default function withReconnect<ChildProps extends {}>(
  Child: ComponentType<ChildProps>
): ComponentType<ChildProps> {
  return (props: ChildProps) => {
    const appContext = useAppContext();
    const { gameHandler } = appContext;
    const [status, setStatus] = useState<ConnectionStatus>("unknown");
    const connectionStatus = gameHandler.getConnectionStatus();

    useEffect(() => {
      try {
        const activeGame = gameHandler.getActiveGame();
        if (!activeGame) {
          if (connectionStatus === "disconnected") {
            setStatus("disconnected");
          } else if (connectionStatus === "reconnecting") {
            setStatus("reconnecting");
          } else if (connectionStatus === "connected") {
            setStatus("connected");
          }
        }
      } catch (e) {
        Router.push("/index");
      }
    }, [gameHandler]);

    switch (status) {
      case "connected":
        return <Child {...props} />;
      case "disconnected":
        return <h2>Disconnected</h2>;
      case "reconnecting":
        return <h2>Reconnecting...</h2>;
      case "unknown":
      default:
        return null;
    }
  };
}
