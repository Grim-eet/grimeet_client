import { NextApiRequest, NextApiResponse } from "next";
// import { NextApiResponseServerIO } from "../";
import { Socket } from "net";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === "POST") {
    const message = req.body;
    console.log(message);
    if (res.socket) res.socket.server.io.emit("message", message);
    res.status(201).json(message);
  }
}
