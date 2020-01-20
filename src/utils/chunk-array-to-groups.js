export const chunkArrayToGroups = (arr, groups) => {
  let newArr = [];
  let cntr = 0;
  const groupSize = arr.length / groups;

  for (; cntr < groups; ++cntr) {
    newArr[cntr] = [];
    for (let i = 0; i < groupSize; ++i) {
      const index = cntr * groupSize + i;
      newArr[cntr].push(arr[index]);
    }
  }
  return newArr;
};
