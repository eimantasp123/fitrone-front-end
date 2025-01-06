/**
 * WebSocketClient Singleton Class
 */
class WebSocketClient {
  private static instance: WebSocketClient; // Singleton instance
  private socket: WebSocket | null = null; // WebSocket connection
  private listeners: Map<string, (data: unknown) => void> = new Map(); // Event listeners
  private reconnectAttempts: number = 0; // Track reconnection attempts
  private maxReconnectAttempts: number = 5; // Maximum number of retries
  private shouldReconnect = true; // Flag to control reconnection
  private reconnectTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }

    return WebSocketClient.instance;
  }

  // Publick: Initialize WebSocket connection
  public connect(url: string) {
    if (this.socket) {
      return;
    }

    this.shouldReconnect = true;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Dispatch the event to the appropriate listeners
      this.listeners.forEach((callBack, type) => {
        if (data.type === type) {
          callBack(data);
        }
      });
    };

    this.socket.onclose = () => {
      this.socket = null;
      if (
        this.shouldReconnect &&
        this.reconnectAttempts < this.maxReconnectAttempts
      ) {
        this.reconnectAttempts++;
        this.reconnectTimeout = setTimeout(() => this.connect(url), 3000);
      }
    };
  }

  // Public: Add an event listener for specific message types
  public addEventListener(type: string, callBack: (data: unknown) => void) {
    this.listeners.set(type, callBack);
  }

  // Public: Remove an event listener for specific message types
  public removeEventListener(type: string) {
    this.listeners.delete(type);
  }

  // Public: Disconnect WebSocket connection
  public disconnect() {
    this.shouldReconnect = false; // Prevent reconnection
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Export the initialized singleton instance immediately
const webSocketInstance = WebSocketClient.getInstance();
export default webSocketInstance;
