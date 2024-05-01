/**
 * 원시값(int, string, float...) 리스트 요소 찾기
 * @param {*} list
 * @param {*} findData
 */
export const findDataFromList = (list: Array<string | number>, findData: string | number): boolean => {
  const SORT_LIST = list.toSorted((a, b) => {
    let sort = 0;

    if (a < b) {
      sort = -1;
    } else if (a > b) {
      sort = 1;
    }

    return sort;
  });
  let isExists = false;
  let left = 0;
  let right = SORT_LIST.length - 1;

  for (let i = 0, size = SORT_LIST.length; i < size; i++) {
    let mid = Math.floor((left + right) / 2);

    if (SORT_LIST[mid] === findData) {
      isExists = true;
      break;
    } else if (SORT_LIST[mid] < findData) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return isExists;
};
