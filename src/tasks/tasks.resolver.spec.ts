import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TasksResolvers } from './tasks.resolver';
const mockTask = { id: '1', title: 'title', task: 'task' };
const mockTasks = [
  {
    id: '1',
    title: 'title',
    task: 'task',
  },
  {
    id: '2',
    title: 'title',
    task: 'task',
  },
];

describe('TasksResolvers', () => {
  let resolvers: TasksResolvers;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolvers,
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: '1',
                title: 'title',
                task: 'task',
              },
              {
                id: '2',
                title: 'title',
                task: 'task',
              },
            ]),
            findOne: jest.fn().mockResolvedValue(mockTask),
          },
        },
      ],
    }).compile();

    resolvers = module.get<TasksResolvers>(TasksResolvers);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(resolvers).toBeDefined();
  });

  describe('getTasks', () => {
    it('TaskService findAll function will be called', () => {
      jest.spyOn(service, 'findAll');
      resolvers.getTasks();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('return mockTasks', async () => {
      await expect(resolvers.getTasks()).resolves.toEqual(mockTasks);
    });
  });

  describe('getTask', () => {
    it('TaskService findOne function will be called', () => {
      jest.spyOn(service, 'findOne');
      resolvers.getTask(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('return mockTasks', async () => {
      await expect(resolvers.getTask(1)).resolves.toBe(mockTask);
    });
  });
});
