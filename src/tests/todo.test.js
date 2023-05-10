import * as crud from '../module/crud-operations.js';

jest.mock('../module/crud-operations.js');

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
