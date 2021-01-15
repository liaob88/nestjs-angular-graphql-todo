import { Test, TestingModule } from '@nestjs/testing';
import { Task } from 'src/graphql.schema';
import { TaskService } from './task.service';
import { TasksResolvers } from './tasks.resolver';

const mockTasks: Task[] = [
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
            findAll: jest.fn().mockResolvedValue(mockTasks),
            findOne: jest.fn().mockImplementation((id: number) => {
              const task = mockTasks.find((task) => task.id === id.toString());
              return Promise.resolve(task);
            }),
          },
        },
      ],
    }).compile();

    resolvers = module.get<TasksResolvers>(TasksResolvers);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    console.log('-----', resolvers);
    expect(resolvers).toBeDefined();
  });

  describe('getTasks', () => {
    it('TaskService findAll function will be called', async () => {
      jest.spyOn(service, 'findAll');
      await resolvers.getTasks();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('return mockTasks', async () => {
      await expect(resolvers.getTasks()).resolves.toEqual(mockTasks);
    });
  });

  describe('getTask', () => {
    it('TaskService findOne function will be called with 1', async () => {
      jest.spyOn(service, 'findOne');
      const result = await resolvers.getTask(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    describe('return task depend on a id argument', () => {
      it('when id is 1', async () => {
        jest.spyOn(service, 'findOne');
        const result = await resolvers.getTask(1);
        expect(result).toEqual(mockTasks[0]);
      });
      it('when id is 2', async () => {
        jest.spyOn(service, 'findOne');
        const result = await resolvers.getTask(2);
        expect(result).toEqual(mockTasks[1]);
      });
    });
  });
});
