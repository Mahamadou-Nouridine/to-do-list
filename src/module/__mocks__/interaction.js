import { getData, updateLocalData } from '../crud-operations.js';

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
  updateLocalData(updatedData);
};

export const clearAllComplete = () => {
  const storedData = getData();
  const updatedData = storedData.filter((data) => !data.completed);
  updateLocalData(restructureData(updatedData));
};

export const getCompleted = () => {
  const storedData = getData();
  return storedData.filter((data) => data.completed);
};