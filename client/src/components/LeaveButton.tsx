import { useContext } from "react";
import { WSContext } from "../context/WebSocket";

const LeaveButton = () => {
  const { ws } = useContext(WSContext);

  const leaveRoom = () => {
    ws.emit("leave-room");
  };

  return (
    <button
      onClick={leaveRoom}
      className="bg-gray-400 hover:bg-red-500 rounded-sm p-1 shadow-sm"
    >
      Leave
    </button>
  );
};

export default LeaveButton;
