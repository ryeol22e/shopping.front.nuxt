export const useAppFetch = () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

  return {
    async getFetch<T>(path: string, query: object = {}, headers: object = {}) {
      const isHydrating = nuxtApp.isHydrating;
      const isMounted = nuxtApp.vueApp._instance?.isMounted;

      if (!isHydrating && isMounted) {
        const data = await $fetch(combineURL(path), {
          baseURL: config.public.baseApiUrl,
          method: 'get',
          query,
          headers: {
            ...headers,
            'x-forwarded-for': storeConfig.getClientIp,
          },
        });

        return Promise.resolve(data as T);
      } else {
        const { data } = await useFetch(combineURL(path), {
          baseURL: config.public.baseApiUrl,
          method: 'get',
          query,
          headers: {
            'x-forwarded-for': storeConfig.getClientIp,
          },
        });

        return Promise.resolve(data.value as T);
      }
    },
    async postFetch<T>(path: string, body: object = {}, headers: object = {}) {
      const isHydrating = nuxtApp.isHydrating;
      const isMounted = nuxtApp.vueApp._instance?.isMounted;

      if (!isHydrating && isMounted) {
        const data = await $fetch(combineURL(path), {
          baseURL: config.public.baseApiUrl,
          method: 'post',
          body,
          headers: {
            ...headers,
            'x-forwarded-for': storeConfig.getClientIp,
          },
        });

        return Promise.resolve(data as T);
      } else {
        const { data } = await useFetch(combineURL(path), {
          baseURL: config.public.baseApiUrl,
          body,
          headers: {
            ...headers,
            'x-forwarded-for': storeConfig.getClientIp,
          },
        });

        return Promise.resolve(data.value as T);
      }
    },
  };
};
