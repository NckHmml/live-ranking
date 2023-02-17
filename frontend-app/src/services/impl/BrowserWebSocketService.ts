import { Logger } from "helpers/Logger";
import { WebSocketService, WebSocketServiceCallback } from "services/WebSocketService";
import Container, { Service } from "typedi";

interface IWebSocketMessage {
  channel: string;
  message: string;
}

@Service()
export class BrowserWebSocketService extends WebSocketService {
  private loading: Promise<void>;
  private socket: WebSocket;
  private callbacks: { [key: string]: WebSocketServiceCallback } = {};

  private get logger(): Logger {
    return Container.get(Logger);
  }

  public constructor() {
    super();
    this.socket = new WebSocket(`ws://${process.env.REACT_APP_API}`);
    this.loading = new Promise<void>((resolve, _reject) => {
      this.socket.addEventListener("message", (event) => {
        if (event.data === "connected") {
          resolve();
        } else {
          this.handleMessage(event);
        }
      });
    }).then(() => this.logger.info("WebSocket connected"));
  }

  public async join(room: string, callback: WebSocketServiceCallback) {
    await this.loading;
    this.socket.send(JSON.stringify({
      action: "subscribe",
      channels: [room]
    }));
    this.callbacks[room] = callback;
  }

  private handleMessage(event: MessageEvent) {
    let json: IWebSocketMessage | undefined;
    try {
      json = JSON.parse(event.data);
    } catch { }

    if (!Boolean(json) || !Boolean(json!.channel) || !Boolean(this.callbacks[json!.channel])) return;
    json = json!;

    this.callbacks[json.channel](json.message);
  }
}
