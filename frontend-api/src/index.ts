import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { WebSocketServer } from "ws";

import { CharacterController } from "./controllers/CharacterController";
import { CacheMiddleware } from "./middleware/CacheMiddleware";
import { WebSocketService } from "./services/WebSocketService";

// Create routing-controllers
const app = createExpressServer({
  controllers: [CharacterController],
  middlewares: [CacheMiddleware],
});
// Start listening
const server = app.listen(8080, () => {
  console.log("Server started on 8080");
  WebSocketService.listen();
});
// Websockets
const wsServer = new WebSocketServer({ noServer: true });
server.on("upgrade", (request: any, socket: any, head: any) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    socket.on("message", (data: Buffer) => WebSocketService.message(socket, data));
    socket.send("connected");
  });
});
