import WebSocket from 'ws';
import { WSMessage } from '../types';
import logger from '../utils/logger';

export class WebSocketServer {
  private wss: WebSocket.Server;
  private clients: Set<WebSocket> = new Set();

  constructor(server: any) {
    this.wss = new WebSocket.Server({ server });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', (ws: WebSocket) => {
      this.clients.add(ws);
      logger.info('New WebSocket connection established');

      ws.on('message', this.handleMessage);

      ws.on('close', () => {
        this.clients.delete(ws);
        logger.info('Client disconnected');
      });

      ws.on('error', (error) => {
        logger.error('WebSocket error:', error);
      });
    });
  }

  private handleMessage(message: WebSocket.Data) {
    try {
      const parsedMessage: WSMessage = JSON.parse(message.toString());
      // Handle different message types
      switch (parsedMessage.type) {
        case 'transaction':
          // Handle new transaction
          break;
        case 'status':
          // Handle status update
          break;
        default:
          logger.warn('Unknown message type received');
      }
    } catch (error) {
      logger.error('Error handling WebSocket message:', error);
    }
  }

  public broadcast(message: WSMessage) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}