import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashIt } from 'src/utils';

const logger = new Logger('UserService');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userCandidate = await this.findOneByUsername(createUserDto.username);
    if (userCandidate)
      throw new BadRequestException(
        `User with username: "${createUserDto.username}" already exist`,
      );
    const passwordHash = await hashIt(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, passwordHash });
    logger.log(`Created new user, hash: ${passwordHash}`);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.userRepository.delete({ id });
  }
}
