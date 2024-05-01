const timeCal = 1000 * 60 * 60 * 24;

/**
 * 카운트다운 날짜 셋팅
 * @param child
 * @param diffDate
 */
const setCountDownDays = (child: Array<Element>, diffDate: number) => {
  const days = Math.floor(diffDate / timeCal);

  for (let k = 0, size = child.length; k < size; k++) {
    const item = child[k];

    if (item.classList.contains('dayNum')) {
      item.textContent = String(days).concat(' ');
    }
    if (item.classList.contains('dayStr')) {
      item.textContent = days > 9 ? 'days' : 'day';
    }
  }
};

/**
 * 카운트다운 시간 셋팅
 * @param child
 * @param diffDate
 */
const setCountDownTime = (child: Array<Element>, diffDate: number) => {
  const hours = Math.floor((diffDate % timeCal) / (timeCal / 24));
  const mins = Math.floor((diffDate % (timeCal / 24)) / (timeCal / 60 / 24));
  const sec = Math.floor((diffDate % (timeCal / 60 / 24)) / 1000);

  for (let k = 0, size = child.length; k < size; k++) {
    const item = child[k];

    if (item.classList.contains('hour')) {
      item.textContent = appendZero(hours);
    }
    if (item.classList.contains('min')) {
      item.textContent = appendZero(mins);
    }
    if (item.classList.contains('sec')) {
      item.textContent = appendZero(sec);
    }
  }
};

/**
 * 날짜 카운트다운
 * class속성에 count-down이 있으면 찾아서 실행한다.(N건 가능)
 * class "count-down" 하위요소 중 class에서 date가 있으면 날짜 셋팅.
 * class "count-down" 하위요소 중 class에서 time이 있으면 시간 셋팅.
 * class "date" 하위요소 중 class에 dayNum 또는 dayStr이 있으면 각자 값을 셋팅.
 * class "time" 하위요소 중 calss에 hour, min, sec가 있으면 각자 값을 셋팅.
 */
export const dateCountDown = (): void => {
  const elementList = [...document.getElementsByClassName('count-down')];

  for (let i = 0, listSize = elementList.length; i < listSize; i++) {
    const item: any = elementList[i];
    const dateStr = String(item.dataset.countDownDate);
    const date = dateStr.includes('T') ? new Date(item.dataset.countDownDate).getTime() : new Date(dateStr.replace(/[-|.]/gi, '/')).getTime();

    let countDown = setInterval(() => {
      const nowDate = new Date().getTime();
      const diffDate = Number(date - nowDate);
      const days = Math.floor(diffDate / timeCal);
      const hours = Math.floor((diffDate % timeCal) / (timeCal / 24));
      const mins = Math.floor((diffDate % (timeCal / 24)) / (timeCal / 60 / 24));
      const sec = Math.floor((diffDate % (timeCal / 60 / 24)) / 1000);

      if (diffDate <= 0) {
        // clear setInterval
        clearInterval(countDown);
        return false;
      }

      if (!isEmpty(item.children)) {
        const childList = [...item.children] as Array<Element>;

        for (let j = 0, size = childList.length; j < size; j++) {
          const el = childList[j];

          if (el.classList.contains('date')) {
            setCountDownDays([...el.children], diffDate);

            if (el.classList.contains('time')) {
              setCountDownTime([...el.children], diffDate);
            }
          }
        }
      } else {
        item.textContent = `${appendZero(days)} ${days > 9 ? ' days' : ' day'} ${appendZero(hours)}:${appendZero(mins)}:${appendZero(sec)}`;
      }
    }, 1000);
  }
};
