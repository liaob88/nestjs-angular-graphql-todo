import { Resolver, Query } from '@nestjs/graphql';
import { Task } from './task';

@Resolver('Tasks')
export class TasksResolver {
  @Query(() => [Task])
  async getTasks(): Promise<Task[]> {
    return [
      {
        id: 1,
        title: 'title1',
        task: 'task1',
      },
      {
        id: 2,
        title: 'title2',
        task: 'task2',
      },
      {
        id: 3,
        title: 'title3',
        task: 'task3',
      },
    ];
  }
}
