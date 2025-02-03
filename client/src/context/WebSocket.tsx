import { createContext, ReactNode, useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";

type WSContextType = {
  ws: Socket;
};

const url = import.meta.env.VITE_SERVER_URL || 8080;

export const WSContext = createContext<WSContextType | unknown>(null);

const ws = socketIOClient(url);

export const WSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();

  const createRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ users }: { users: string[] }) => {
    console.log({ users });
  };

  const returnUser = () => {
    navigate(`/`);
  };

  // listen to events coming from server
  useEffect(() => {
    const meId = uuidv4();

    const peer = new Peer(meId, {
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    });
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        })
        .then((stream) => {
          setStream(stream);
        });
    } catch (err) {
      console.error(err);
    }

    ws.on("create-room", createRoom);
    ws.on("get-users", getUsers);
    ws.on("return", returnUser);
  }, []);

  return (
    <WSContext.Provider value={{ ws, me, stream }}>
      {children}
    </WSContext.Provider>
  );
};
