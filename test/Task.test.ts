import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Task Contract', function (): void {
  let TaskContract;
  let taskContract: any;
  let owner: any;

  const NUM_TOTAL_TASKS = 5;

  let totalTasks;

  beforeEach(async function () {
    TaskContract = await ethers.getContractFactory('TaskContract');
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();

    totalTasks = [];

    for (let i = 0; i < NUM_TOTAL_TASKS; i++) {
      const task = {
        taskText: 'Task number:- ' + i,
        isDeleted: false
      };

      await taskContract.addTask(task.taskText, task.isDeleted);
      totalTasks.push(task);
    }
  });

  describe('Add Task', function () {
    it('should emit AddTask event', async function () {
      const task = {
        taskText: 'New Task',
        isDeleted: false
      };

      await expect(await taskContract.addTask(task.taskText, task.isDeleted))
        .to.emit(taskContract, 'AddTask')
        .withArgs(owner.address, NUM_TOTAL_TASKS);
    });
  });

  describe('Get All Tasks', function () {
    it('should return the correct number of total tasks', async function () {
      const taskFromChain = await taskContract.getMyTasks();
      expect(taskFromChain.length).to.equal(NUM_TOTAL_TASKS);
    });
  });

  describe('Delete Task', function () {
    it('should emit delete task event', async function () {
      const TASK_ID = 0;
      const TASK_DELETED = true;

      await expect(taskContract.deleteTask(TASK_ID, TASK_DELETED))
        .to.emit(taskContract, 'DeleteTask')
        .withArgs(TASK_ID, TASK_DELETED);
    });
  });
});
