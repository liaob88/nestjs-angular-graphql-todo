import { Inject, ParseIntPipe } from '@nestjs/common';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';

@Resolver('Task')
export class TasksResolvers {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query()
  async getTasks() {
    return this.taskService.findAll();
  }

  @Query()
  async getTask(@Args('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }
}
