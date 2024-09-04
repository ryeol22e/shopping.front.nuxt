import type { KeyObject } from '~/@types/global-type';

/**
 * created될때 사용하는 fetch
 * @returns
 */
export const useSetupFetch = () => {
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

  return {
    async setupGet(path: string, query: any = {}, headers: any = {}): Promise<KeyObject> {
      const { status, data, error } = await useFetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'get',
        watch: false,
        server: import.meta.server,
        query,
        headers: {
          ...headers,
          'x-forwarded-for': storeConfig.getClientIp,
        },
      });

      return new Promise((resolve, reject) => {
        if (status.value !== 'error') {
          resolve({ status: status.value, data: data.value });
        } else {
          reject(error.value);
        }
      });
    },
    async setupPost(path: string, body: any = {}, headers: any = {}): Promise<KeyObject> {
      const { status, data, error } = await useFetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'post',
        watch: false,
        server: import.meta.server,
        body,
        headers: {
          ...headers,
          'x-forwarded-for': storeConfig.getClientIp,
        },
      });

      return new Promise((resolve, reject) => {
        if (status.value !== 'error') {
          resolve({ status: status.value, data: data.value });
        } else {
          reject(error.value);
        }
      });
    },
  };
};
