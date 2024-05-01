interface DateType {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
}
interface DatePattern {
  datePattern: string;
  timePattern: string;
}

/**
 * 날짜 년,월,일 시,분,초 나눈함수
 * @param date
 * @returns
 */
export const divideDate = (date: Date): DateType => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  hour: date.getHours(),
  min: date.getMinutes(),
  sec: date.getSeconds(),
});

/**
 * 날짜 패턴정립
 * @param pattern
 * @returns
 */
const definePattern = (pattern: string): DatePattern => {
  let patternCount = 0;
  let datePattern = '';
  let timePattern = '';

  if (pattern.includes('.')) {
    patternCount++;
    datePattern = '.';
  }
  if (pattern.includes('-')) {
    patternCount++;
    datePattern = '-';
  }
  if (pattern.includes(':')) {
    timePattern = ':';
  }
  if (patternCount > 1) {
    throw new Error('date format pattern중 "."과"-"는 같이 사용할 수 없습니다.');
  }

  return {
    datePattern,
    timePattern,
  };
};
/**
 * 년,월,일 정의
 * @param year
 * @param month
 * @param day
 * @param pattern
 * @param datePattern
 * @returns
 */
const defineDate = (year: number, month: number, day: number, pattern: string, datePattern: string): string => {
  let resultDate = '';

  if (pattern.includes('yy')) {
    resultDate = String(year).substring(2);

    if (pattern.includes('yyyy')) {
      resultDate = String(year);
    }
  }
  if (pattern.includes('MM')) {
    resultDate += resultDate.length >= 2 ? datePattern.concat(appendZero(month)) : appendZero(month);
  }
  if (pattern.includes('dd')) {
    resultDate += resultDate.length >= 2 ? datePattern.concat(appendZero(day)) : appendZero(day);
  }

  return resultDate;
};
/**
 * am, pm 정의
 * @param hour
 * @param divAmPm
 * @param hasKor
 * @returns
 */
const defineDivAmPm = (hour: number, divAmPm: boolean, hasKor: boolean) => {
  let resultDate = ' ';

  if (divAmPm) {
    if (hasKor) {
      resultDate += `${hour < 12 ? ' 오전 ' : ' 오후 '}`;
    } else {
      resultDate += `${hour < 12 ? ' AM ' : ' PM '}`;
    }
  }

  return resultDate;
};
/**
 * 시,분,초 정의
 * @param hour
 * @param min
 * @param sec
 * @param pattern
 * @param timePattern
 * @returns
 */
const defineTime = (hour: number, min: number, sec: number, pattern: string, timePattern: string): string => {
  let resultDate = '';

  if (pattern.includes('hh')) {
    resultDate += resultDate.length >= 6 ? ` ${appendZero(hour)}` : appendZero(hour);
  }
  if (pattern.includes('HH')) {
    const customHour = hour > 12 ? hour - 12 : hour;
    resultDate += resultDate.length >= 6 ? ` ${appendZero(customHour)}` : appendZero(customHour);
  }
  if (pattern.includes('mm')) {
    resultDate += resultDate.length >= 2 ? timePattern.concat(appendZero(min)) : appendZero(min);
  }
  if (pattern.includes('ss')) {
    resultDate += resultDate.length >= 2 ? timePattern.concat(appendZero(sec)) : appendZero(sec);
  }

  return resultDate;
};

/**
 * 날짜 포맷팅
 * @param param
 * @param pattern
 * @param divAmPm
 * @param hasKor
 * @returns
 */
export const dateFormat = (param: string, pattern: string = 'yyyy.MM.dd hh:mm:ss', divAmPm: boolean = false, hasKor: boolean = false): string => {
  const date = param.includes('T') ? new Date(param) : new Date(String(param).replace(/[-|.]/gi, '/'));
  const { datePattern, timePattern } = definePattern(pattern);
  const { year, month, day, hour, min, sec } = divideDate(date);

  return defineDate(year, month, day, pattern, datePattern) + defineDivAmPm(hour, divAmPm, hasKor) + defineTime(hour, min, sec, pattern, timePattern);
};
