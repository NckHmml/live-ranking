import { WebSocketService, WebSocketServiceCallback } from "services/WebSocketService";

export class ServerWebSocketService extends WebSocketService {
  public join(_id: string, _callback: WebSocketServiceCallback): void {
    // No websocket logic on the server side, logically
    return;
  }
}
