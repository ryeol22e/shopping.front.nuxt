/**
 * 시간 카운트업
 */
export const timeCountUp = (): void => {
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

      element.textContent = `${appendZero(hours)}:${appendZero(mins)}:${appendZero(sec)}`;
    }, 1000);
  }
};
