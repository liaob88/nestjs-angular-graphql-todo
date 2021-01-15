import { TaskEntity } from './task';

describe('Task', () => {
  it('should be defined', () => {
    expect(new TaskEntity()).toBeDefined();
  });
});
