import { getData } from '../crud-operations.js';

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

const restructureData = (data) => data.map((el, index) => {
  el.index = index + 1;
  return el;
});

export const check = (index) => {
  const storedData = getData();
  const updatedData = storedData.map((data) => {
    if (data.index === index) data.completed = !data.completed;
    return data;
  });
  localStorage.setItem('todos', JSON.stringify(updatedData));
  loadToDom();
};

export const clearAllComplete = () => {
  const storedData = getData();
  const updatedData = storedData.filter((data) => !data.completed);
  localStorage.setItem('todos', JSON.stringify(restructureData(updatedData)));
  loadToDom();
};

export const getCompleted = () => {
  const storedData = getData();
  return storedData.filter((data) => data.completed);
};
