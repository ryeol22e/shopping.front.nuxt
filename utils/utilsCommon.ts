export const utilsCommon = () => {
  /**
   * 데이터 empty 여부
   * isEmpty(data)
   * @param {*} data
   * @Return true : 비었다, false : 데이터가 있다.
   */
  const isEmpty = (data: any): boolean => {
    let bool = true;

    if (data !== undefined && data !== null) {
      switch (data.constructor) {
        case String:
          const str = data.replace(/\s|\t/gi, '');
          if (str !== 'null' && str.length > 0) {
            bool = false;
          }
          break;
        case Array:
          if (data.length > 0) {
            bool = false;
          }
          break;
        case Object:
          if (Object.keys(data).length > 0) {
            bool = false;
          }
          break;
        case Date:
          bool = false;
          break;
        case Number:
          bool = false;
          break;
        case Boolean:
          bool = false;
          break;
      }
    }

    return bool;
  };
  /**
   * 숫자 자릿수찍기
   * useNumberComma(data)
   * @param {*} data
   */
  const numberComma = (data: string | number): string => (!isEmpty(data) ? Number(data).toLocaleString(navigator.language) : String(0));
  /**
   * 10미만 숫자 앞에 0붙이기
   * useNumberAddZero(data)
   * @param {*} data
   */
  const numberAddZero = (data: string | number): string => (Number(data) < 10 ? `0${data}` : String(data));

  /**
   * 원시값(int, string, float...) 리스트 요소 찾기
   * @param {*} list
   * @param {*} findData
   */
  const findListData = (list: Array<string | number>, findData: string | number): boolean => {
    const SORT_LIST = list.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
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

  return {
    isEmpty,
    numberComma,
    numberAddZero,
    findListData,
  };
};
