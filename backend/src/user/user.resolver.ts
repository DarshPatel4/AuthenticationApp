import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signup(@Args('data') data: CreateUserInput) {
    try {
      this.logger.debug(`Attempting to create user with email: ${data.email}`);
      const user = await this.userService.create(
        data.username,
        data.email,
        data.password,
      );
      this.logger.debug(`Successfully created user with id: ${user._id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      if (error.code === 11000) {
        throw new BadRequestException('Username or email already exists');
      }
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    try {
      this.logger.debug(`Attempting login for email: ${email}`);
      const user = await this.userService.findByEmail(email);

      if (!user) {
        this.logger.warn(
          `Login attempt failed: User not found for email: ${email}`,
        );
        throw new UnauthorizedException('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        this.logger.warn(
          `Login attempt failed: Invalid password for email: ${email}`,
        );
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'your-super-secret-key-here',
        { expiresIn: '1h' },
      );

      this.logger.debug(`Login successful for user: ${user._id}`);
      return token;
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => User)
  async me(@Args('token') token: string): Promise<User> {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-super-secret-key-here',
      ) as { id: string };
      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
