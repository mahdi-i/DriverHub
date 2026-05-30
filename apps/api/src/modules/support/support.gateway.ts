import { BadRequestException, Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportService } from './support.service';

const ADMIN_SUPPORT_ID = 'fe335b0b-8a8c-4e55-ad8e-a736a54cbd68';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupportGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(SupportGateway.name);
  constructor(private readonly supportService: SupportService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      content: string;
      receiverId?: string;
    },
  ) {
    try {
      const targetReceiverId = data.receiverId || ADMIN_SUPPORT_ID;
      const savedMessage = await this.supportService.create(
        data.senderId,
        targetReceiverId,
        data.content,
      );

      const senderDetails = await this.supportService.getUserDetails(
        data.senderId,
      );
      const receiverDetails =
        await this.supportService.getUserDetails(targetReceiverId);

      const messageWithDetails = {
        ...savedMessage,
        sender: senderDetails,
        receiver: receiverDetails,
      };

      this.server.emit('receiveMessage', messageWithDetails);

      return { response: 'message sent' };
    } catch (error) {
      throw new BadRequestException('Error sending message:', error);
    }
  }

  @SubscribeMessage('requestHistory')
  async handleRequestHistory(@MessageBody() data: { userId: string }) {
    try {
      const history = await this.supportService.getChatHistoryWithUser(
        data.userId,
      );

      return history;
    } catch (error) {
      this.logger.error('Error fetching history:', error);
      throw new BadRequestException('Failed to fetch history');
    }
  }
}
