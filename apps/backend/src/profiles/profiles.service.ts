import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {

  private profiles = [
    { id: '1', name: 'Sarah', age: 21, photoUrl: 'https://placehold.co/400x400/8c728e/fff' },
    { id: '2', name: 'Jessica', age: 23, photoUrl: 'https://placehold.co/400x400/0000FF/fff' },
    { id: '3', name: 'Maria', age: 25, photoUrl: 'https://placehold.co/400x400/FF0000/fff' },
    // Add more mock data as needed
  ];


  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return this.profiles;

  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
