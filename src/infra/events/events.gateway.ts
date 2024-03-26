/* eslint-disable no-plusplus */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
    server: Server;

  @SubscribeMessage('trips')
  async trips(@MessageBody() data): Promise<any> {
    return data;
  }
}
