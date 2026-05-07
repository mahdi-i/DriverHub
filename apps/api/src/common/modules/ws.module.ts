import { Module } from '@nestjs/common';
import { WsGateway } from '@shared/services/ws.gateway.service';

@Module({
  providers: [WsGateway],
})
export class WsModule {}
