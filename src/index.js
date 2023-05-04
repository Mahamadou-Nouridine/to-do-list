import './index.css';
import { addTodo, deleteTodo, updateTodo } from './module/crud-operations.js';
import { check, clearAllComplete } from './module/interaction.js';

const todoList = document.querySelector('.todoList');
const form = document.querySelector('form');
const formInput = document.querySelector('form input');
const clearAll = document.querySelector('.clearCompleted');

const storedData = JSON.parse(localStorage.getItem('todos'));
if (!storedData) localStorage.setItem('todos', '[]');

const getStoredData = () => JSON.parse(localStorage.getItem('todos'));

const setUpdateEventListener = (loadData) => {
  const option = document.querySelector('.edit-mode .checkbox p');
  option.addEventListener('keydown', (e) => {
    if (document.activeElement === option && e.code === 'Enter') {
      const index = Number(option.classList[1].split('description')[1]);
      updateTodo(index, option.textContent);
      loadData();
    }
  });
};
const setDeleteMode = (data, loadData) => {
  const option = document.querySelector(`.option${data.index}`);
  option.addEventListener('click', () => {
    deleteTodo(data.index);
    loadData();
  });
};

const removeAllEditMode = () => {
  const storedData = getStoredData();
  storedData.forEach((data) => {
    const option = document.querySelector(`.option${data.index}`);
    const description = document.querySelector(`.description${data.index}`);
    if (option.classList.contains('bi-trash')) {
      option.classList.remove('bi-trash');
      option.classList.add('bi-three-dots-vertical');
    }
    const item = document.querySelector(`.item${data.index}`);
    item.classList.remove('edit-mode');
    description.contentEditable = 'false';
  });
};

const setEditModeStyle = (loadData) => {
  const storedData = getStoredData();
  storedData.forEach((data) => {
    const option = document.querySelector(`.option${data.index}`);
    option.addEventListener('click', () => {
      removeAllEditMode();
      const description = document.querySelector(`.description${data.index}`);
      const item = document.querySelector(`.item${data.index}`);
      item.classList.add('edit-mode');
      description.contentEditable = 'true';
      description.focus();
      if (option.classList.contains('bi-three-dots-vertical')) {
        option.classList.remove('bi-three-dots-vertical');
        option.classList.add('bi-trash');
        setUpdateEventListener(loadData);
        setDeleteMode(data, loadData);
      }
    });
  });
};

const handleCheck = (index, loadData) => {
  check(index);
  loadData();
};

const createTodoEl = (data) => {
  const todo = document.createElement('li');
  todo.classList.add('data');
  todo.classList.add('item');
  todo.classList.add(`item${data.index}`);
  const checked = data.complete ? 'checked' : undefined;
  todo.innerHTML = `
      <div class="checkbox">
                      <input type="checkbox" ${checked} name="" id="check-todo" class="check${data.index}">
                      <p class="todo-description description${data.index} ${checked}">${data.description}</p>
                  </div>
                  <div class="option">
                      <i class="bi bi-three-dots-vertical options option${data.index}"></i>
                  </div>
      `;

  return todo;
};

const loadData = () => {
  todoList.innerHTML = '';
  const dataList = getStoredData();
  dataList.forEach((data) => {
    const todo = createTodoEl(data, loadData);
    todoList.appendChild(todo);
    document
      .querySelector(`.check${data.index}`)
      .addEventListener('change', () => {
        handleCheck(data.index, loadData);
      });
  });

  setEditModeStyle(loadData);

  const items = document.querySelectorAll('.item');
  items.forEach((el) => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('edit-mode')) removeAllEditMode();
    });
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const storedData = getStoredData();
  const data = {
    index: storedData.length + 1,
    description: formInput.value,
    complete: false,
  };
  formInput.value = '';
  addTodo(data);
  loadData();
});

loadData();
const clearEvent = clearAll.addEventListener('click', () => {
  clearAllComplete();
  loadData();
  clearAll.removeEventListener('click', clearEvent);
});
