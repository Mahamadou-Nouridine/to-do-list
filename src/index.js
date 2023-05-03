import './index.css';

const todoData = [
  {
    index: 1,
    description: 'finish the day lessons',
    complete: true,
  },
  {
    index: 2,
    description: 'eat 3 time',
    complete: false,
  },
  {
    index: 3,
    description: "attend all my day's session",
    complete: true,
  },
];

const todoList = document.querySelector('.todoList');

const createTodo = (data) => {
  const todo = document.createElement('li');
  todo.classList.add('data');
  todo.classList.add('item');
  const checked = data.complete ? 'checked' : undefined;
  todo.innerHTML = `
      <div class="checkbox">
                      <input type="checkbox" ${checked} name="" id="add-todo">
                      <p class="todo-description ${checked}">${data.description}</p>
                  </div>
                  <div class="option">
                      <i class="bi bi-three-dots-vertical options"></i>
                  </div>
      `;
  return todo;
};

const loadData = (dataList) => {
  dataList.forEach((data) => {
    const todo = createTodo(data);
    todoList.appendChild(todo);
  });
};

loadData(todoData);
