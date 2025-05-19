import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'; //  to encypt the password

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = new this.userModel({ username, email, password: hashed });
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
