'use strict';
import useUtils from './useUtils';

const { isEmpty, hasObjectProperty } = useUtils();

export default () => {
  const cookie = () => {
    /**
     * document.cookie object로 convert
     * @returns
     */
    const cookieObject = (): object => {
      const list = document.cookie.split('; ');

      const object: AnyObject = {};

      list.forEach((item) => {
        const regex = /^[^{|^\[]*[a-zA-Z|ㄱ-ㅎ가-힣][^}|^\]]*$/gi;
        const key: string = item.substring(0, item.indexOf('='));
        const value: any = decodeURIComponent(item.substring(item.indexOf('=') + 1, item.length)) || null;

        if (!isEmpty(value) && regex.test(value)) {
          object[key] = JSON.parse(value);
        } else {
          object[key] = value;
        }
      });

      return object;
    };

    /**
     * set cookie
     * @param {*} key
     * @param {*} value
     * @param {*} expires
     */
    const setCookie = (key: string, value: any, expires: Date) => {
      if (isEmpty(key)) {
        throw 'parameter error.';
      }
      if (isEmpty(value)) {
        throw 'parameter error.';
      }
      if (!isEmpty(expires)) {
        if (expires.constructor !== Date) {
          throw 'date is not Date type.';
        }
      }

      document.cookie = key
        .concat('=')
        .concat(encodeURIComponent(JSON.stringify(value)))
        .concat(';path=/')
        .concat(';expires=')
        .concat(!isEmpty(expires) ? expires.toUTCString() : '');
    };

    /**
     * cookie 특정 값 반환
     * @param {*} key
     * @returns
     */
    const getCookie = (key: string): any => {
      const object: AnyObject = cookieObject();
      let value = null;

      if (hasObjectProperty(object, key)) {
        value = object[key];
      }

      return value || null;
    };

    /**
     * cookie 삭제
     * @param {*} key
     */
    const deleteCookie = (key: string): void => {
      const object: object = cookieObject();

      document.cookie = key.concat('=; path=/; expires=').concat(new Date('1970/01/01').toString()).concat('; ');
    };

    return {
      setCookie,
      getCookie,
      deleteCookie,
    };
  };

  return {
    cookie,
  };
};
