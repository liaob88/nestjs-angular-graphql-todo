import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from './tasks.resolver';
import { Task } from './task';

describe('TasksResolver', () => {
  let resolver: TasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksResolver],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'title',
        task: 'task',
      },
    ];
    jest
      .spyOn(resolver, 'getTasks')
      .mockImplementation(() => Promise.resolve(mockTasks));
    expect(await resolver.getTasks()).toBe(mockTasks);
  });
});
