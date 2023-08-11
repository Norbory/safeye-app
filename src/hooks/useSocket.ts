import React, { useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../config";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = () => {
    const socket = io(BASE_URL);
    setSocket(socket);
  };

  const disconnect = () => {
    socket?.disconnect();
    setSocket(null);
  };

  return { socket, connect, disconnect };
};
