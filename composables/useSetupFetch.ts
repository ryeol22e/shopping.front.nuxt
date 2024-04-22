/**
 * created될때 사용하는 fetch
 * @returns
 */
export const useSetupFetch = () => {
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.charAt(0) === '/' ? path : '/'.concat(path));

  return {
    async get(path: string, query: any = {}, headers: any = {}) {
      const { pending, status, data, error } = await useFetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'get',
        watch: false,
        lazy: process.client,
        server: process.server,
        query,
        headers: {
          ...headers,
          'x-forwarded-for': storeConfig.getClientIp,
        },
      });

      return new Promise((resolve, reject) => {
        if (status.value !== 'error') {
          resolve({ pending: pending.value, status: status.value, data: data.value });
        } else {
          reject(error.value);
        }
      });
    },
    async post(path: string, body: any = {}, headers: any = {}) {
      const { pending, status, data, error } = await useFetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'post',
        watch: false,
        lazy: process.client,
        server: process.server,
        body,
        headers: {
          ...headers,
          'x-forwarded-for': storeConfig.getClientIp,
        },
      });

      return new Promise((resolve, reject) => {
        if (status.value !== 'error') {
          resolve({ pending: pending.value, status: status.value, data: data.value });
        } else {
          reject(error.value);
        }
      });
    },
  };
};
