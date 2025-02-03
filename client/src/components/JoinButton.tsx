import { useContext } from "react";
import { WSContext } from "../context/WebSocket";

const JoinButton = () => {
  const { ws } = useContext(WSContext);

  const joinRoom = () => {
    ws.emit("join-room");
  };

  return <button onClick={joinRoom}>Join Room</button>;
};

export default JoinButton;
