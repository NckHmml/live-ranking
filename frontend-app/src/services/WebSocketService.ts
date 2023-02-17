export abstract class WebSocketService {
  public abstract join(room: string, callback: WebSocketServiceCallback): void;
}

export type WebSocketServiceCallback = (message: string) => void;
