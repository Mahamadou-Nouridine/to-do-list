const restructureData = (data) => data.map((el, index) => {
  el.index = index + 1;
  return el;
});

export const check = (index) => {
  const storedData = JSON.parse(localStorage.getItem('todos'));
  const updatedData = storedData.map((data) => {
    if (data.index === index) data.complete = !data.complete;
    return data;
  });
  localStorage.setItem('todos', JSON.stringify(updatedData));
};

export const clearAllComplete = () => {
  const storedData = JSON.parse(localStorage.getItem('todos'));
  const updatedData = storedData.filter((data) => !data.complete);
  localStorage.setItem('todos', JSON.stringify(restructureData(updatedData)));
};
