import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ActionType } from '@prisma/client';

@Injectable()
export class ActionsService {

  constructor(private prisma: PrismaService) { }


  // create(createActionDto: CreateActionDto) {
  //   return this.prisma.action.create({ data: createActionDto });
  //   // return "This action adds a new action" + JSON.stringify(createActionDto);
  // }

  async create(dto: CreateActionDto) {
    // upsert action so user can change LIKE ↔ DISLIKE
    const action = await this.prisma.action.upsert({
      where: {
        userId_recipientId: {
          userId: dto.userId,
          recipientId: dto.recipientId,
        },
      },
      update: { action: dto.action },
      create: dto,
    });

    // check if reciprocal LIKE exists
    let isMatch = false;

    if (dto.action === ActionType.LIKE) {
      const reciprocal = await this.prisma.action.findUnique({
        where: {
          userId_recipientId: {
            userId: dto.recipientId,
            recipientId: dto.userId,
          },
        },
      });

      if (reciprocal?.action === ActionType.LIKE) {
        isMatch = true;
        // optional: create a Match record in DB
        // await this.prisma.match.create({ data: { user1Id: dto.userId, user2Id: dto.recipientId } });
      }
    }

    return { ...action, match: isMatch };
  }




  findAll() {
    return this.prisma.action.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
