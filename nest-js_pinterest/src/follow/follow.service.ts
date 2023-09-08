import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../database/follow.entity';
import { User } from 'src/database/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Follow[]> {
    return this.followRepository.find();
  }

  async findOne(id: number): Promise<Follow | undefined> {
    return this.followRepository.findOneBy({ idFollow: id });
  }

  async create(follow: Follow): Promise<Follow> {
    return this.followRepository.save(follow);
  }

  async update(id: number, follow: Follow): Promise<Follow | undefined> {
    await this.followRepository.update(id, follow);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.followRepository.delete(id);
  }

  async getUserFollowed(userId: number): Promise<User[]> {
    const userFollowed = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.userFollowedbys', 'followed')
      .where('user.id = :userId', { userId })
      .getMany();

    return userFollowed;
  }

  async getUserFollowOther(userId: number): Promise<User[]> {
    const userFollowOther = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.userFollowOthers', 'followOther')
      .where('user.id = :userId', { userId })
      .getMany();

    return userFollowOther;
  }

  async countUserFollowed(): Promise<any[]> {
    const userFollowedCounts = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userFollowedbys', 'followeds')
      .select([
        'user.id',
        'COUNT(followeds.userFollowedbyId) AS numberOfFollowers',
      ])
      .groupBy('user.id')
      .getRawMany();
    return userFollowedCounts;
  }

  async countUserFollowOther(): Promise<any[]> {
    const userFollowOtherCounts = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userFollowOthers', 'followOthers')
      .select([
        'user.id',
        'COUNT(followOthers.userFollowOtherId) AS numberOfFollowOthers',
      ])
      .groupBy('user.id')
      .getRawMany();
    return userFollowOtherCounts;
  }
}
