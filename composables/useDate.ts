import useUtils from './useUtils';

const { numberAddZero, isEmpty } = useUtils();

export default () => {
  /**
   * 오늘 날짜랑 파라메터랑 diff
   * @param {*} data
   * @returns 양수면 true 음수면 false
   */
  const dateDiff = (data: string): boolean => new Date().getTime() > new Date(data).getTime();

  /**
   * 날짜 포맷
   * @param {*} dateParmeter
   * @param {*} pattern
   * format 없을시 default는 yyyy.MM.dd이다
   * format 기본패턴
   * 년 : yyyy or yy, 월 : MM, 일 : dd, 시 : hh, 분 : mm, 초 : ss
   */
  const dateFormat = (dateParmeter: string, pattern: string = 'yyyy.MM.dd hh:mm'): string => {
    const date = dateParmeter.includes('T') ? new Date(dateParmeter) : !isEmpty(dateParmeter) ? new Date(String(dateParmeter).replace(/-|./gi, '/')) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    let patternCount = 0;
    let datePattern = '';
    let timePattern = '';
    let resultDate = '';

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
      throw 'date format pattern중 "."과"-"는 같이 사용할 수 없습니다.';
    }

    // formatting..
    if (pattern.includes('yy')) {
      resultDate = String(year).substring(2);

      if (pattern.includes('yyyy')) {
        resultDate = String(year);
      }
    }
    if (pattern.includes('MM')) {
      resultDate += resultDate.length >= 2 ? datePattern.concat(numberAddZero(month)) : numberAddZero(month);
    }
    if (pattern.includes('dd')) {
      resultDate += resultDate.length >= 2 ? datePattern.concat(numberAddZero(day)) : numberAddZero(day);
    }
    if (pattern.includes('hh')) {
      resultDate += resultDate.length >= 6 ? ` ${numberAddZero(hour)}` : numberAddZero(hour);
    }
    if (pattern.includes('HH')) {
      resultDate += resultDate.length >= 6 ? ` ${numberAddZero(hour > 12 ? hour - 12 : hour)}` : numberAddZero(hour > 12 ? hour - 12 : hour);
    }
    if (pattern.includes('mm')) {
      resultDate += resultDate.length >= 2 ? timePattern.concat(numberAddZero(min)) : numberAddZero(min);
    }
    if (pattern.includes('ss')) {
      resultDate += resultDate.length >= 2 ? timePattern.concat(numberAddZero(sec)) : numberAddZero(sec);
    }

    if (resultDate.length <= 0) {
      switch (pattern) {
        case 'onlyTime':
          resultDate = `${numberAddZero(hour)}:${numberAddZero(min)}:${numberAddZero(sec)}`;
          break;
        case 'ampmOnlyTime':
          resultDate = `${hour < 12 ? 'AM ' : 'PM '} ${numberAddZero(hour)}:${numberAddZero(min)}:${numberAddZero(sec)}`;
          break;
        case 'ampmDate':
          resultDate = `${year}.${numberAddZero(month)}.${numberAddZero(day)} ${hour < 12 ? 'AM ' : 'PM '} ${hour < 12 ? numberAddZero(hour) : numberAddZero(hour - 12)}:${numberAddZero(min)}:${numberAddZero(sec)}`;
          break;
        case 'ampmDateForKor':
          resultDate = `${year}.${numberAddZero(month)}.${numberAddZero(day)} ${hour < 12 ? '오전 ' : '오후 '} ${hour < 12 ? numberAddZero(hour) : numberAddZero(hour - 12)}:${numberAddZero(min)}:${numberAddZero(sec)}`;
          break;
        case 'onlyHour':
          resultDate = `${hour < 12 ? 'AM ' : 'PM '}${hour < 12 ? numberAddZero(hour) : numberAddZero(hour - 12)}:00`;
          break;
        case 'onlyHourMin':
          resultDate = `${hour < 12 ? 'AM ' : 'PM '}${hour < 12 ? numberAddZero(hour) : numberAddZero(hour - 12)}:${numberAddZero(min)}`;
          break;
        case 'onlyAmpm':
          resultDate = hour < 12 ? 'AM ' : 'PM ';
          break;
        case 'ampmHour':
          resultDate = `${hour < 12 ? 'AM ' : 'PM '}`;
          break;
        case 'ampmHourKor':
          resultDate = `${hour < 12 ? '오전 ' : '오후 '}`;
          break;
        case 'dateForKor':
          resultDate = `${year}년 ${numberAddZero(month)}월 ${numberAddZero(day)}일`;
          break;
        case 'fullDateForKor':
          resultDate = `${year}년 ${numberAddZero(month)}월 ${numberAddZero(day)}일 ${numberAddZero(hour)}시 ${numberAddZero(min)}분`;
          break;
        default:
          throw `해당되는 날짜 format(${pattern})이 없습니다.`;
      }
    }

    return resultDate;
  };

  /**
   * 날짜 카운트다운
   */
  const dateCountDown = (): void => {
    const elementList = [...document.getElementsByClassName('count-down')];

    for (let i = 0, listSize = elementList.length; i < listSize; i++) {
      const item: any = elementList[i];
      const dateStr = String(item.dataset.countDownDate);
      const date = dateStr.includes('T') ? new Date(item.dataset.countDownDate).getTime() : new Date(dateStr.replace(/-|./gi, '/')).getTime();
      let countDown = setInterval(() => {
        const nowDate = new Date().getTime();
        const diffDate = Number(date - nowDate);
        const timeCal = 1000 * 60 * 60 * 24;
        const days = Math.floor(diffDate / timeCal);
        const hours = Math.floor((diffDate % timeCal) / (timeCal / 24));
        const mins = Math.floor((diffDate % (timeCal / 24)) / (timeCal / 60 / 24));
        const sec = Math.floor((diffDate % (timeCal / 60 / 24)) / 1000);

        if (diffDate <= 0) {
          // clear setInterval
          clearInterval(countDown);
          return false;
        }

        if (!isEmpty(item.children.length)) {
          const depth1Child = [...item.children];
          const depth1Size = depth1Child.length;

          for (let j = 0; j < depth1Size; j++) {
            const el = depth1Child[j];

            if (el.classList.contains('date')) {
              const depth2Child = [...el.children];
              const depth2Size = depth2Child.length;

              for (let k = 0; k < depth2Size; k++) {
                const item = depth2Child[k];

                if (item.classList.contains('dayNum')) {
                  item.textContent = days;
                }
                if (item.classList.contains('dayStr')) {
                  item.textContent = days > 9 ? ' days' : ' day';
                }
              }
            }

            if (el.classList.contains('time')) {
              const depth2Child = [...el.children];
              const depth2Size = depth2Child.length;

              for (let k = 0; k < depth2Size; k++) {
                const item = depth2Child[k];

                if (item.classList.contains('hour')) {
                  item.textContent = numberAddZero(hours);
                }
                if (item.classList.contains('min')) {
                  item.textContent = numberAddZero(mins);
                }
                if (item.classList.contains('sec')) {
                  item.textContent = numberAddZero(sec);
                }
              }
            }
          }
        } else {
          item.textContent = `${numberAddZero(days)} ${days > 9 ? ' days' : ' day'} ${numberAddZero(hours)}:${numberAddZero(mins)}:${numberAddZero(sec)}`;
        }
      }, 1000);
    }
  };

  /**
   * 시간 카운트업
   */
  const timeCountUp = (): void => {
    const elementList = [...document.getElementsByClassName('count-up')];

    for (let i = 0, size = elementList.length; i < size; i++) {
      const element: any = elementList[i];
      let countUp = setInterval(() => {
        const nowTime = new Date().getTime();
        const startTime = new Date(element.dataset.startTime).getTime();
        const diffDate = Number(nowTime - startTime);
        const timeCal = 1000 * 60 * 60 * 24;
        const hours = Math.floor(diffDate / timeCal) * 24;
        const mins = Math.floor((diffDate % (timeCal / 24)) / (timeCal / 60 / 24));
        const sec = Math.floor((diffDate % (timeCal / 60 / 24)) / 1000);

        if (diffDate <= 0) {
          clearInterval(countUp);
        }

        element.textContent = `${numberAddZero(hours)}:${numberAddZero(mins)}:${numberAddZero(sec)}`;
      }, 1000);
    }
  };

  return {
    dateDiff,
    dateFormat,
    dateCountDown,
    timeCountUp,
  };
};
