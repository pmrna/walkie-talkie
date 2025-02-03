import express from "express";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const rooms: Record<string, string[]> = {};

interface RoomParams {
  roomId: string;
  userId: string;
}

const cleanupRoom = (roomId: string) => {
  if (!rooms[roomId] || rooms[roomId].length === 0) {
    delete rooms[roomId];
    console.log(`Room ${roomId} has been deleted`);
  }
};

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("create-room", () => {
    // handle generation of room (uuid)
    const roomId = uuidv4();
    rooms[roomId] = [];
    socket.emit("create-room", { roomId });

    console.log(`User has created a room: ${roomId}`);
  });

  socket.on("join-room", ({ roomId, userId }: RoomParams) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    console.log(`User ${userId} has joined room ${roomId}`);
    rooms[roomId].push(userId);
    socket.join(roomId);

    io.to(roomId).emit("get-users", {
      roomId,
      users: rooms[roomId],
    });

    // socket.data is empty by default so we fill it up to make room params which we can access outside of this function.

    socket.data.roomId = roomId;
    socket.data.userId = userId;
  });

  // for using leave button
  socket.on("leave-room", () => {
    const { roomId, userId } = socket.data;

    if (!roomId || !userId) return;

    // user manually leaving
    console.log(`User ${userId} has left the room`);
    socket.leave(roomId);

    // remove user from room user list
    rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
    io.to(roomId).emit("user-disconnected", userId);

    // send event to client to return user to home page
    socket.emit("return");

    cleanupRoom(roomId);
  });

  // for refreshing page
  socket.on("disconnect", () => {
    const { roomId, userId } = socket.data;

    if (!roomId || !userId) return;

    console.log(`User ${userId} has disconnected`);
    rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
    io.to(roomId).emit("user-disconnected", userId);

    cleanupRoom(roomId);
  });

  // how the fuck do I emit sound??
});

server.listen(port, () => {
  console.log(`Listening to the server on port:${port}`);
});
