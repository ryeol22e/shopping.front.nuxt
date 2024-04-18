export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.charAt(0) === '/' ? path : '/'.concat(path));

  return {
    provide: {
      async get(path: string, query: any = {}, headers: any = {}): Promise<any> {
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

        return new Promise((resolve, reject): void => {
          if (status.value !== 'error') {
            resolve({ pending: pending.value, status: status.value, data: data.value });
          } else {
            reject(error.value);
          }
        });
      },
      async post(path: string, body: any = {}, headers: any = {}): Promise<any> {
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

        return new Promise((resolve, reject): void => {
          if (status.value !== 'error') {
            resolve({ pending: pending.value, status: status.value, data: data.value });
          } else {
            reject(error.value);
          }
        });
      },
    },
  };
});
