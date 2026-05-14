import { ProfileService } from '@core/dashboard-driver/modules/profile/profile.service';
import { ProfileTraineeService } from '@core/dashboard-trainee/modules/profile-trainee/profile-trainee.service';
import { UserService } from '@core/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Support } from './entities/support.entity';
const ADMIN_SUPPORT_ID = 'fe335b0b-8a8c-4e55-ad8e-a736a54cbd68';
@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private supportMessageRepository: Repository<Support>,
    private userService: UserService,
    private profileService: ProfileService,
    private profileTraineeService: ProfileTraineeService,
  ) {}

  async create(senderId: string, receiverId: string, content: string) {
    const sender = await this.getUserById(senderId);
    if (!sender) throw new Error('Sender not found');
    const targetReceiverId = receiverId || ADMIN_SUPPORT_ID;
    const receiver = await this.getUserById(targetReceiverId);
    if (!receiver) {
      throw new Error(`Receiver (ID: ${targetReceiverId}) not found`);
    }

    const message = this.supportMessageRepository.create({
      sender,
      receiver,
      content,
      createdAt: new Date(),
      isRead: false,
    });

    return this.supportMessageRepository.save(message);
  }
  async getAdminInbox() {
    return this.supportMessageRepository.find({
      where: {
        receiver: { id: ADMIN_SUPPORT_ID },
      },
      relations: ['sender', 'receiver'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async getChatHistoryWithUser(userId: string) {
    return this.supportMessageRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: ADMIN_SUPPORT_ID } },
        { sender: { id: ADMIN_SUPPORT_ID }, receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
  }
  async getUserDetails(userId: string) {
    let profile;
    try {
      const traineeInfo = await this.profileService.getProfile(userId);
      if (!traineeInfo) {
        const driverInfo = await this.profileTraineeService.getProfile(userId);
        profile = driverInfo;
      } else {
        profile = traineeInfo;
      }
    } catch {
      throw new NotFoundException('مشکل در گرفتن اطاعات کاربر');
    }

    return {
      profile,
    };
  }
  private async getUserById(id: string) {
    const existuser = await this.userService.findOne(id);
    if (!existuser) {
      throw new NotFoundException('کاربر با این ایدی پیدا نشد');
    }
    return existuser;
  }
}
