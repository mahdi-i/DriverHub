import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
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
    return this.userRepository.findOneBy({ id });
  }
  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }
  async findByPhone(phone: string) {
    return this.userRepository.findOneBy({ phone });
  }
}
