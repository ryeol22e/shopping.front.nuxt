import type { AsyncDataOptions, UseFetchOptions } from '#app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { hash } from 'ohash';

export const useAppFetch = () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

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
      const key = hash(generateKey(path, opts));

      if (isClient && !isHydrate) {
        const data = await $fetch(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        const { status, execute, data } = await useAsyncData<T>(
          key,
          () => $fetch(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts),
          <AsyncDataOptions<T>>opts,
        );

        if (isClient && status.value === 'idle') {
          await execute();
        }

        return Promise.resolve(data.value as T);
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
      const key = hash(generateKey(path, opts));

      if (isClient && !isHydrate) {
        const data = await $fetch(combineURL(path), <NitroFetchOptions<NitroFetchRequest>>opts);
        return Promise.resolve(data as T);
      } else {
        const { status, execute, data } = await useAsyncData<T>(
          key,
          () => $fetch(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts),
          <AsyncDataOptions<T>>opts,
        );

        if (isClient && status.value === 'idle') {
          await execute();
        }

        return Promise.resolve(data.value as T);
      }
    },
  };
};

const generateKey = <T>(path: string, opts: UseFetchOptions<T>) => {
  const entries = Object.entries({ ...opts.params, ...opts.query, ...(<object>opts.body) });
  let result = path;

  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      result = result.concat(value.flat().join(''));
    } else {
      result = result.concat(`${value}`);
    }
  }

  return result;
};
