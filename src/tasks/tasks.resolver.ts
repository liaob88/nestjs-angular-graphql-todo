import { Inject, ParseIntPipe } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { InputTask } from 'src/graphql.schema';

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

  @Mutation()
  async createTask(@Args('task') task: InputTask) {
    const result = await this.taskService.createOne(task);
    return result;
  }

  @Mutation()
  async updateTask(@Args('id') id: number, @Args('task') task: InputTask) {
    const result = await this.taskService.updateOne(id, task);
    return result;
  }

  @Mutation()
  async deleteTask(@Args('id') id: number) {
    const result = await this.taskService.deleteOne(id);
    return result;
  }
}
