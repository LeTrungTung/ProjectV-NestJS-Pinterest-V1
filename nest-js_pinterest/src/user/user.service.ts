import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateAvatar(data: User, id: number) {
    try {
      const imageFind = await this.userRepository.findOneBy({ id: id });

      if (imageFind) {
        await this.userRepository.update({ id: id }, data);
        return { message: 'Updated Success' };
      }
    } catch (err) {
      return { message: err.message };
    }
  }
}
