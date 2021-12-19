import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../types/user';
import { Model } from 'mongoose';
import { Payload } from '../../types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
  async createMany(users: User[]) {
    return await this.userModel.create(users);
  }
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    return user;
  }
}
