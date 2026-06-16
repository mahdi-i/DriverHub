import { ProfileDriver } from '@core/dashboard-driver/modules/profile/entities/profile.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { Roles } from '@driverhub/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private getDriverRepository(): Repository<ProfileDriver> {
    return this.userRepository.manager.getRepository(ProfileDriver);
  }

  private getTraineeRepository(): Repository<Trainee> {
    return this.userRepository.manager.getRepository(Trainee);
  }
  async create(userData: CreateUserDto): Promise<User> {
    const { phone, role, isActive } = userData;
    const newUser = this.userRepository.create({
      phone: phone,
      isActive: isActive,
      role: role,
    });
    return this.userRepository.save(newUser);
  }

  async findByJwt(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const driverRepository = this.getDriverRepository();
      const traineeRepository = this.getTraineeRepository();

      const driver = await driverRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });

      const trainee = await traineeRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });

      if (user?.role === Roles.TEACHER && driver) {
        return {
          id: user.id,
          phone: user.phone,
          isActive: user.isActive,
          role: user.role,
          fullName: driver.fullName,
        };
      }

      if (user?.role === Roles.TRAINEE && trainee) {
        return {
          id: user.id,
          phone: user.phone,
          isActive: user.isActive,
          role: user.role,
          fullName: trainee.fullName,
        };
      }

      return {
        id: user.id,
        phone: user.phone,
        isActive: user.isActive,
        role: user.role,
      };
    } catch {
      return {
        id: user.id,
        phone: user.phone,
        isActive: user.isActive,
        role: user.role,
      };
    }
  }
  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }
  async findByPhone(phone: string) {
    return this.userRepository.findOneBy({ phone });
  }
}
