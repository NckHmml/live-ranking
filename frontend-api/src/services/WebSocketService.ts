import Redis from "ioredis";
import { WebSocket } from "ws";

export class WebSocketService {
  private static channels: { [key: string]: Array<WebSocket> } = {};
  private static redisClient = new Redis("redis://localhost");

  public static listen() {
    this.redisClient.psubscribe("experience:*");
    this.redisClient.on("pmessage", this.roomListener);
  }

  public static message(socket: WebSocket, data: Buffer) {
    let message: IWebSocketMessage;
    try {
      message = JSON.parse(data.toString("utf-8"));
    } catch {
      return;
    }
    if (!Boolean(message.action)) return;

    switch (message.action) {
      case "subscribe": {
        const channels = message.channels ?? [];
        if (channels.length <= 0)
          return;

        for (const channel of channels!)
          this.subscribe(socket, channel);
      }
    }

  }

  private static subscribe(socket: WebSocket, channel: string) {
    if (!Boolean(this.channels[channel])) {
      this.channels[channel] = [socket];
    } else {
      this.channels[channel] = this.channels[channel].filter(x => x.readyState === WebSocket.OPEN).concat(socket);
    }
  }

  private static roomListener = (_pchannnel: string, channel: string, message: string) => {
    const clients = this.channels[channel]?.filter(x => x.readyState === WebSocket.OPEN) ?? [];
    for (const client of clients) {
      const data = JSON.stringify({
        channel,
        message,
      });
      client.send(data);
      console.log("message", message);
    }
  };
}

interface IWebSocketMessage {
  action: string;
  channels?: Array<string>;
}
