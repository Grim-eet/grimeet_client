import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../socket/io";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  try {
    if (req.method === "POST") {
      const message = req.body;
      console.log(message);

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (res.socket) {
        res.socket.server.io.emit("message", message);
      }

      return res.status(201).json({ message: "Success" });
    } else {
      // POST 외의 다른 메소드에 대한 응답
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
