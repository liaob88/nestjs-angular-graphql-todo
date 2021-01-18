import { Module } from '@nestjs/common';
import { TasksResolvers } from './tasks.resolver';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksResolvers, TaskService],
  exports: [TaskService],
})
export class TasksModule {}
