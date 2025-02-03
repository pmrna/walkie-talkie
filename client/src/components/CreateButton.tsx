import { useContext } from "react";
import { WSContext } from "../context/WebSocket";

const CreateButton = () => {
  const { ws } = useContext(WSContext);

  const createRoom = () => {
    ws.emit("create-room");
  };

  return (
    <button
      onClick={createRoom}
      className="text-gray-700 hover:text-lg hover:text-gray-950 active:text-gray-950"
    >
      Create Room
    </button>
  );
};

export default CreateButton;
