import type { UseFetchOptions } from '#app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export const useAppFetch = () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));
  // const param =
  // method === 'get' ? Object.values(opts?.query || '').join('') : Object.values(opts?.body || '').join('');

  return {
    async getFetch<T>(path: string, query: object = {}, headers: object = {}) {
      const combinePath = combineURL(path);
      const isHydrate = nuxtApp.isHydrating;
      const isClient = import.meta.client;
      const opts: UseFetchOptions<T> = {
        baseURL: config.public.baseApiUrl as string,
        method: 'GET',
        query,
        headers: {
          ...headers,
          'X-forwarded-for': storeConfig.getClientIp,
        },
      };
      const fetchKey = `${combinePath}${Object.values(opts?.query || '').join('')}`;
      const checkFetchKey = useState('checkGetFetchKey', () => new Map());

      if (isClient && (!isHydrate || !checkFetchKey.value.has(fetchKey))) {
        const data = await $fetch(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        const data = await useFetch(combinePath, opts).then((res) => res.data.value);
        checkFetchKey.value.set(fetchKey, '');
        return Promise.resolve(data as T);
      }
    },
    async postFetch<T>(path: string, body: object = {}, headers: object = {}) {
      const combinePath = combineURL(path);
      const isHydrate = nuxtApp.isHydrating;
      const isClient = import.meta.client;
      const opts: UseFetchOptions<T> = {
        baseURL: config.public.baseApiUrl,
        method: 'POST',
        body,
        headers: {
          ...headers,
          'X-forwarded-for': storeConfig.getClientIp,
        },
      };
      const fetchKey = `${combinePath}${Object.values(opts?.body || '').join('')}`;
      const checkFetchKey = useState('checkPostFetchKey', () => new Map());

      if (isClient && (!isHydrate || !checkFetchKey.value.has(fetchKey))) {
        const data = await $fetch(combineURL(path), <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        const data = await useFetch(combineURL(path), opts).then((res) => res.data.value);
        return Promise.resolve(data as T);
      }
    },
  };
};
