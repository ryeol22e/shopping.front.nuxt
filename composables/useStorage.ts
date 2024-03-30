import useUtils from './useUtils';

('use strict');
export default () => {
  const { isEmpty } = useUtils();

  /**
   * custom sessionStorage
   */
  const appSession = (): any => {
    const setItem = (key: string, value: any): void => sessionStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
    const removeItem = (key: string): void => sessionStorage.removeItem(key);
    const getItem = (key: string): any => {
      const value: any = decodeURIComponent(sessionStorage.getItem(key) as any);
      let result: any = null;

      try {
        result = JSON.parse(value);
      } catch (error) {
        result = value;
      }

      return result || null;
    };

    return {
      setItem,
      getItem,
      removeItem,
    };
  };

  /**
   * custom localStorage
   */
  const appLocalStorage = (): any => {
    const setItem = (key: string, value: any) => localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
    const removeItem = (key: string) => localStorage.removeItem(key);
    const getItem = (key: string) => {
      const value = decodeURIComponent(localStorage.getItem(key) as any);
      let result: any = null;

      try {
        result = JSON.parse(value);
      } catch (error) {
        result = value;
      }

      return result || null;
    };

    return {
      setItem,
      getItem,
      removeItem,
    };
  };

  return {
    appSession,
    appLocalStorage,
  };
};
