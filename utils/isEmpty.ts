/**
 * 데이터 비어있는지 확인
 * @param data
 * @returns
 */
export const isEmpty = (data: any): data is any => {
  let bool = true;

  if (data !== undefined && data !== null) {
    switch (data.constructor) {
      case String:
        {
          const str = data.replace(/\s|\t|\n/gi, '');
          if (str !== 'null' && str.length > 0) {
            bool = false;
          }
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
      default:
        bool = false;
        break;
    }
  }

  return bool;
};
