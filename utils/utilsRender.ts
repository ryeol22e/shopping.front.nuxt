import type { KeyObject } from '~/@types/global-type';

/**
 * 화면 위치지정
 * useWindowPosition(object)
 * @param {*} data
 */
export const windowPosition = (data: object): void => {
  if (data.constructor !== Object) {
    throw new Error('parameter is not object');
  }

  window.scrollTo({ ...data, behavior: 'smooth' });
};

/**
 * object change form data
 * @param {*} data
 */
export const changeToFormData = (data: KeyObject): FormData => {
  File;
  const form = new FormData();
  const keyList = Object.keys(data);

  for (let i = 0, length = keyList.length; i < length; i++) {
    const key = keyList[i];
    const value = data[key];

    form.append(key, value);
  }

  return form;
};
/**
 * scroll handler
 * @param func
 */
export const scrollHandler = (func: any): void => {
  if (func.constructor === Function) {
    window.addEventListener('scroll', (e) => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollPosition + windowHeight >= fullHeight) {
        func();
      }
    });
  }
};
