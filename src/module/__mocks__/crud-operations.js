let localData = [];

const restructureData = (datas) => datas.map((el, index) => {
  el.index = index + 1;
  return el;
});

export const addTodo = (data) => {
  localData.push(data);
};

export const deleteTodo = (id) => {
  const remainingData = localData.filter((data) => data.index !== id);
  localData = restructureData(remainingData);
};

export const updateTodo = (index, description) => {
  const storedData = localData;
  const updatedData = storedData.map((todo) => {
    if (todo.index === index) {
      todo.description = description;
    }
    return todo;
  });
  const ordered = restructureData(updatedData);
  localData = ordered;
};

export const getData = () => localData;
