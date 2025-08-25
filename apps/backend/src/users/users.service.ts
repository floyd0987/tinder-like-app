import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return `This action adds a new user ${JSON.stringify(createUserDto)}`;
  }

  findAll() {
    return this.prisma.user.findMany({ where: { id: { not: 1 } } });
  }

  async findRandom(currentUserId: number, seenUserIds: number[]) {
    try {
      const usersCount = await this.prisma.user.count({
        where: {
          id: {
            notIn: [currentUserId, ...seenUserIds],
          },
        },
      });

      if (usersCount === 0) {
        return null;
      }

      const skip = Math.floor(Math.random() * usersCount);

      const randomUser = await this.prisma.user.findFirst({
        skip: skip,
        where: {
          id: {
            notIn: [currentUserId, ...seenUserIds],
          },
        },
      });

      return randomUser;
    } catch (error) {
      console.error('Error fetching random user:', error);
      return null;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${JSON.stringify(updateUserDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
