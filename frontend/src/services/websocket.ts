export class WebSocketService {
    private ws: WebSocket | null = null;
    private readonly url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    connect() {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle incoming messages
        console.log('Received:', data);
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Implement reconnection logic here
      };
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  
    send(message: any) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      }
    }
  }