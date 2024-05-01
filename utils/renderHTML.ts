/**
 * 랜더링 프로세스
 * @param target
 * @param list
 */
const renderProcess = (target: HTMLElement, list: Array<Element>): void => {
  for (let j = 0, length = list.length; j < length; j++) {
    const elChild = list[j];

    if ([...elChild.children].map((child) => child.localName).includes('script')) {
      target.insertAdjacentElement('afterbegin', elChild);
      renderHTML(elChild as HTMLElement, elChild.innerHTML, false);
    }

    if (elChild.localName !== 'script') {
      target.insertAdjacentElement('afterbegin', elChild);
    } else {
      const script = document.createElement('script');

      script.textContent = elChild.textContent;
      target.insertAdjacentElement('afterbegin', script);
    }
  }
};

/**
 * html 문자열 랜더링
 * html문자열이 escape되었을 경우 unescape해서 v-html에 넣어도 css, script가 skip되는 현상 발생.
 * ※ onMounted에서 선언.
 * @param {*} target document.getElementById or id string
 * @param {*} data string
 * @param {*} isUnescape
 */
export const renderHTML = (target: string | HTMLElement, data: string, isUnescape: boolean = true): void => {
  const htmlString = isUnescape ? unEscapeString(data) : data;
  const parser = new DOMParser().parseFromString(htmlString, 'text/html').documentElement;
  const elArr = [...parser.children];
  const length = elArr.length;

  if (target.constructor === String) {
    target = document.getElementById(target.toString()) as HTMLElement;
  }

  for (let i = 0; i < length; i++) {
    const el = elArr[i];

    if (el.children.length > 0) {
      if (!findDataFromList(['head', 'body'], el.localName)) {
        continue;
      }

      renderProcess(target as HTMLElement, [...el.children]);
    }
  }
};
