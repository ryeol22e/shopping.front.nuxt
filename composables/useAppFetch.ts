import type { UseFetchOptions } from '#app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export const useAppFetch = () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

  return {
    async getFetch<T>(path: string, query: object = {}, headers: object = {}) {
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

      if (isClient && !isHydrate) {
        const data = await $fetch(combineURL(path), <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        if (isClient) {
          await nextTick();
        }
        const data = await useFetch(combineURL(path), opts).then((res) => res.data.value);
        return Promise.resolve(data as T);
      }
    },
    async postFetch<T>(path: string, body: object = {}, headers: object = {}) {
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

      if (isClient && !isHydrate) {
        const data = await $fetch(combineURL(path), <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        if (isClient) {
          await nextTick();
        }
        const data = await useFetch(combineURL(path), opts).then((res) => res.data.value);
        return Promise.resolve(data as T);
      }
    },
  };
};
