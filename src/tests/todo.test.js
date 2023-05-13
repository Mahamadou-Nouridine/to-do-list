import * as crud from '../module/crud-operations.js';
import * as interaction from '../module/interaction.js';

jest.mock('../module/crud-operations.js');
jest.mock('../module/interaction.js');

beforeAll(() => {
  localStorage.setItem('todos', '[]');
  document.body.innerHTML = `
      <div class="box">
      <h1 class="title item"><span contenteditable="false">Today's To Do</span> <i class="bi bi-arrow-repeat"></i></h1>
      <form>
          <input placeholder="Add your list" class="item" type="text" required>
      </form>
      <ul class="todoList">
      </ul>
      <div class="clearAll"><button class="clearCompleted">Clear All completed</button></div>
  </div>
      `;
});

afterAll(() => {
  document.body.innerHTML = '';
});
describe.only('Test adding, and removing todos', () => {
  test.only('should add an element on the dom and in localstorage', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: false,
    };

    // Act
    crud.addTodo(newtask);
    const dataLength = crud.getData().length;

    // Assert
    expect(dataLength).toBe(1);
    expect(document.getElementById('list-item-1').textContent).toBe(
      'Do something',
    );
    expect(document.querySelector('.todoList').children.length).toBe(1);
  });

  test.only('should remove one element', () => {
    // Act
    crud.deleteTodo(1);
    const dataLength = crud.getData().length;

    // Assert
    expect(dataLength).toBe(0);
    expect(document.querySelector('.todoList').children.length).toBe(0);
  });
});

describe.only('Test edit description, status adn clear all todos', () => {
  test('should edit todo description', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: false,
    };
    crud.addTodo(newtask);

    // Act
    crud.updateTodo(newtask.index, 'Updated thing');
    const datas = crud.getData();

    // Assert
    expect(datas[newtask.index - 1].description).toBe('Updated thing');
    expect(document.getElementById('list-item-1').textContent).toBe(
      'Updated thing',
    );
  });

  test('Should update todo sompleted status', () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: 'Do something',
      completed: false,
    };
    crud.addTodo(newtask);

    // Act
    interaction.check(newtask.index);
    const datas = crud.getData();

    // Assert
    expect(datas[newtask.index - 1].completed).toBe(true);
  });

  test('Should delete all the tasks that are completed', () => {
    // Arrange
    const task1 = {
      index: crud.getData().length + 1,
      description: 'First task',
      completed: false,
    };
    crud.addTodo(task1);

    const task2 = {
      index: crud.getData().length + 1,
      description: 'Second task',
      completed: false,
    };
    crud.addTodo(task2);

    const task3 = {
      index: crud.getData().length + 1,
      description: 'third task',
      completed: false,
    };
    crud.addTodo(task3);

    // Check todos
    interaction.check(task2.index);
    interaction.check(task3.index);

    // Act
    interaction.clearAllComplete();
    const datas = crud.getData();

    // Assert
    expect(datas.length).toBe(2);
    expect(document.querySelector('.todoList').children.length).toBe(2);
  });
});