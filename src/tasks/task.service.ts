import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputTask, Task } from './../graphql.schema';
import { TaskEntity } from './task';

export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  async createOne({ title, task }: InputTask): Promise<String> {
    const insertResult = await this.taskRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({
        title,
        task,
      })
      .execute();
    return insertResult.identifiers[0]['id'];
  }

  async deleteOne(id: number) {
    await this.taskRepository.delete(id);
    return `deleted the task whose id is ${id}`;
  }
}
