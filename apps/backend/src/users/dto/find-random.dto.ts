// src/users/dto/find-random.dto.ts

import { IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class FindRandomDto {
  @IsNumber()
  currentUserId: number;

  @IsArray()
  @ArrayNotEmpty()
  seenUserIds: number[];
}
