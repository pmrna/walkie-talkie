import { useContext, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { WSContext } from "../context/WebSocket";
import LeaveButton from "../components/LeaveButton";
import AudioPlayer from "../components/AudioPlayer";

// should differentiate room creator to other users (in the future)

function Room() {
  const { id } = useParams();
  const { ws, me, stream } = useContext(WSContext);
  // const [muted, setMuted] = useState(false);

  useEffect(() => {
    // DO NOT FORGET that when we are passing parameters, make sure that it is the same in the backend.
    if (me) ws.emit("join-room", { roomId: id, userId: me._id });
  }, [ws, id, me]);

  // useEffect(() => {
  //   const dev = navigator.mediaDevices.getUserMedia({
  //     video: false,
  //     audio: {},
  //   });

  //   console.log(dev);
  // }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id || "");
      alert("Room ID copied to clipboard!");
    } catch (error) {
      console.error("failed to copy room ID", error);
    }
  };

  // const handleMute = async () => {};

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-10">
        <button
          onClick={handleCopy}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Room ID: {id}
        </button>

        <div className="flex flex-row gap-5">
          <div className="w-64 h-64 border rounded-sm p-3 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row justify-between items-center">
              {/* mask uuid to a word/nickname */}
              {/* also, ellipsis if randomly generated nickname is long  */}
              <p className="text-sm font-medium">Capybara</p>
              {/* indicator if user is speaking. only show when speaking */}
              <AudioPlayer stream={stream} />
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-end items-center">
            <button className="text-gray-800 text-center text-xl">
              <FaMicrophone />
            </button>
            <LeaveButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
