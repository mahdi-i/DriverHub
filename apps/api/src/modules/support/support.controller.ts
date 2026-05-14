import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { CreateSupportDto } from './dto/create-support.dto';
import { SupportService } from './support.service';

@Controller('support')
@Public()
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  create(@Body() createSupportDto: CreateSupportDto) {
    return this.supportService.create(
      createSupportDto.senderId,
      createSupportDto.receiverId,
      createSupportDto.content,
    );
  }
  @Get('inbox')
  getAdminInbox() {
    return this.supportService.getAdminInbox();
  }
  @Get('history/:userId')
  getChatHistory(@Param('userId') userId: string) {
    return this.supportService.getChatHistoryWithUser(userId);
  }
}
