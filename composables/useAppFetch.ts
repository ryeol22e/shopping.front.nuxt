import type { AsyncDataOptions, UseFetchOptions } from '#app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { hash } from 'ohash';

interface AppFetchOptions<T> extends UseFetchOptions<T> {}

const generateKey = <T>(path: string, opts: AppFetchOptions<T>) => {
  const entries = Object.entries({ method: opts.method, ...opts.params, ...opts.query, ...(<object>opts.body) });
  let result = path;

  for (const value of new Map(entries).values()) {
    if (Array.isArray(value)) {
      result = result.concat(value.flat().join(''));
    } else {
      result = result.concat(`${value}`);
    }
  }

  return hash(result);
};

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
      const opts: AppFetchOptions<T> = {
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
        return $fetch<T>(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts);
      } else {
        const { status, execute, data, error } = await useAsyncData<T>(
          key,
          () => $fetch<T>(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts),
          <AsyncDataOptions<T>>opts,
        );

        if (isClient && status.value === 'idle') {
          await execute();
        }

        return new Promise<T>((resolve, reject) => {
          if (status.value === 'success') {
            resolve(data.value as T);
          } else {
            reject(error.value as Error);
          }
        });
      }
    },
    async postFetch<T>(path: string, body: object = {}, headers: object = {}) {
      const combinePath = combineURL(path);
      const isHydrate = nuxtApp.isHydrating;
      const isClient = import.meta.client;
      const opts: AppFetchOptions<T> = {
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
        return $fetch<T>(combineURL(path), <NitroFetchOptions<NitroFetchRequest>>opts);
      } else {
        const { status, execute, data, error } = await useAsyncData<T>(
          key,
          () => $fetch<T>(combinePath, <NitroFetchOptions<NitroFetchRequest>>opts),
          <AsyncDataOptions<T>>opts,
        );

        if (isClient && status.value === 'idle') {
          await execute();
        }

        return new Promise<T>((resolve, reject) => {
          if (status.value === 'success') {
            resolve(data.value as T);
          } else {
            reject(error.value as Error);
          }
        });
      }
    },
  };
};
