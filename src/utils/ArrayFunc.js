export const countDuplicatesItemArray = (value, array) => {
  let count = 0;
  Array.forEach((arrayValue) => {
    if (arrayValue == value) {
      count++;
    }
  });
  return count;
};

export const RemoveArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

export const RemoveItemArray = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
