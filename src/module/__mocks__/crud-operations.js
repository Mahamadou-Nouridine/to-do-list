const loadToDom = () => {
  const todoList = document.querySelector('.todoList');
  todoList.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('todos'));
  data.forEach((element) => {
    const listNode = document.createElement('li');
    listNode.id = `list-item-${element.index}`;
    listNode.classList.add('list-item');
    listNode.textContent = `${element.description}`;
    todoList.appendChild(listNode);
  });
};

const restructureData = (datas) => datas.map((el, index) => {
  el.index = index + 1;
  return el;
});

export const addTodo = (data) => {
  const storedData = JSON.parse(localStorage.getItem('todos'));
  storedData.push(data);
  localStorage.setItem('todos', JSON.stringify(storedData));
  loadToDom();
};

export const deleteTodo = (id) => {
  const storedData = JSON.parse(localStorage.getItem('todos'));
  const remainingData = storedData.filter((data) => data.index !== id);
  localStorage.setItem('todos', JSON.stringify(restructureData(remainingData)));
  loadToDom();
};

export const updateTodo = (index, description) => {
  const storedData = JSON.parse(localStorage.getItem('todos'));
  const updatedData = storedData.map((todo) => {
    if (todo.index === index) {
      todo.description = description;
    }
    return todo;
  });
  const ordered = restructureData(updatedData);
  localStorage.setItem('todos', JSON.stringify(ordered));
  loadToDom();
};

export const getData = () => JSON.parse(localStorage.getItem('todos'));
export const updateLocalData = (data) => localStorage.setItem('todos', JSON.stringify(data));
