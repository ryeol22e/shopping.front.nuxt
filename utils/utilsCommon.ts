/**
 * 데이터 unescape처리
 * unescapeString(data)
 * @param {*} data
 */
export const unEscapeString = (data: string): string => (!isEmpty(data) ? String(new DOMParser().parseFromString(data, 'text/html').documentElement.textContent) : '');

/**
 * 10미만 숫자 앞에 0붙이기
 * useNumberAddZero(data)
 * @param {*} data
 */
export const appendZero = (data: string | number): string => (Number(data) < 10 ? `0${data}` : String(data));

/**
 * 숫자에 콤마 삽입
 * @param value
 * @returns
 */
export const insertComma = (value: number | null | undefined): string => (!isEmpty(value) ? value?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') ?? '0' : '0');

/**
 * 날짜 DIFF
 * @param stdDate
 * @param compDate
 * @returns
 */
export const dateDiff = (standardDate: string | Date = new Date(), compareDate: string | Date = new Date()): boolean => {
  const stdDate = standardDate.constructor === String ? new Date(standardDate) : (standardDate as Date);
  const compDate = compareDate.constructor === String ? new Date(compareDate) : (compareDate as Date);

  return stdDate.getTime() > compDate.getTime();
};

/**
 * 객체 프로퍼티 존재유무 확인
 * @param standard
 * @param name
 * @returns
 */
export const hasObjectProperty = (standard: object, name: string): boolean => (isEmpty(standard) ? false : Object.hasOwn(standard, name));
