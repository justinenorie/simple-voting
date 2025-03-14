import { Server } from "http";
import { WebSocketServer } from "ws";

const setupWebSocket = () => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("🔗 Client connected");

    ws.on("message", (message) => {
      console.log("📩 Received message:", message);
      ws.send(`✅ Server received: ${message}`);
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
  });

  return wss;
};

export default setupWebSocket;
