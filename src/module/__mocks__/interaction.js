import { getData, updateLocalData } from "../crud-operations";

const restructureData = (data) =>
  data.map((el, index) => {
    el.index = index + 1;
    return el;
  });

export const check = (index) => {
  const storedData = getData();
  const updatedData = storedData.map((data) => {
    if (data.index === index) data.complete = !data.complete;
    return data;
  });
  updateLocalData(updatedData);
};

export const clearAllComplete = () => {
  const storedData = getData();
  const updatedData = storedData.filter((data) => !data.complete);
  updateLocalData(restructureData(updatedData));
};
