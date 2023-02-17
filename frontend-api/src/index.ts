import "reflect-metadata";

import { config as dotenv } from "dotenv";
dotenv();

import { createExpressServer } from "routing-controllers";
import { WebSocketServer } from "ws";

import { CacheMiddleware } from "middleware/CacheMiddleware";
import { WebSocketService } from "services/WebSocketService";
import { CharacterController } from "controllers/CharacterController";
import { RankingController } from "controllers/RankingController";

// Create routing-controllers
const app = createExpressServer({
  controllers: [CharacterController, RankingController],
  middlewares: [CacheMiddleware],
  cors: true,
});
// Start listening
const server = app.listen(8080, () => {
  console.log("Server started on 8080");
  WebSocketService.listen();
});
// WebSockets
const wsServer = new WebSocketServer({ noServer: true });
server.on("upgrade", (request: any, socket: any, head: any) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    socket.on("message", (data: Buffer) => WebSocketService.message(socket, data));
    socket.send("connected");
  });
});
