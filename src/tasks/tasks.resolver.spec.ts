import { Test, TestingModule } from '@nestjs/testing';
import { InputTask, Task } from 'src/graphql.schema';
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
            createOne: jest.fn().mockImplementation((task: InputTask) => {
              const id = (mockTasks.length + 1).toString();
              return Promise.resolve(id);
            }),
            deleteOne: jest.fn().mockImplementation((id: number) => {
              const newTasks = mockTasks.filter(
                (task) => task.id === id.toString(),
              );
              return Promise.resolve(newTasks);
            }),
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

  describe('create new task', () => {
    const newTask = { title: 'title3', task: 'task3' };
    it('TaskService function will be called with newTask', async () => {
      jest.spyOn(service, 'createOne');
      await resolvers.createTask(newTask);
      expect(service.createOne).toHaveBeenCalledWith(newTask);
    });
  });

  describe('delete specified task', () => {
    it('TaskService function will be called with specified id', async () => {
      jest.spyOn(service, 'deleteOne');
      await resolvers.deleteTask(1);
      expect(service.deleteOne).toHaveBeenCalledWith(1);
    });
  });
});
