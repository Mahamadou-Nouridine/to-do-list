import * as crud from '../module/crud-operations.js';
import * as interaction from '../module/interaction.js';

jest.mock('../module/crud-operations.js');
jest.mock('../module/interaction.js');

describe('test add and remove functions', () => {
  test('lenght should be equal to 1', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: true,
    };
    crud.addTodo(newtask);

    // Act
    const storedData = crud.getData();

    // Assert
    expect(storedData.length).toBe(1);
  });

  test('should remove one element fom the array', () => {
    // Arrange
    crud.deleteTodo(1);

    // Act
    const storedData = crud.getData();

    // Assert
    expect(storedData.length).toBe(0);
  });
});

describe('test update and check functions', () => {
  test('should update the description', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: false,
    };
    crud.addTodo(newtask);

    crud.updateTodo(1, 'something updated');

    // Act
    const storedData = crud.getData();

    // Assert
    expect(storedData[0].description).toBe('something updated');
  });

  test('should check complete status', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: false,
    };
    crud.addTodo(newtask);

    // Act
    interaction.check(2);
    const storedData = crud.getData();

    // Assert
    expect(storedData[1].completed).toBe(true);
  });

  test('should clear all the completed task', () => {
    // Arrage
    const task1 = {
      index: crud.getData().length + 1,
      description: 'clear All check',
      completed: false,
    };

    const task2 = {
      index: crud.getData().length + 1,
      description: 'still clear All check',
      completed: false,
    };

    interaction.check(task1.index);
    interaction.check(task2.index);

    // Act
    interaction.clearAllComplete();

    // Assert
    const completedTodo = interaction.getCompleted();
    expect(completedTodo.length).toBe(0);
  });
});
