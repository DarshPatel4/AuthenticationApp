import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID) id: string;
  @Field() username: string;
  @Field() email: string;
}
