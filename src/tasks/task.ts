import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  task: string;
}
