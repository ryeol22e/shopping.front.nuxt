export const useAppFetch = () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

  return {
    async getFetch<T>(path: string, query: object = {}, headers: object = {}) {
      const isHydrating = nuxtApp.isHydrating;
      const isMounted = nuxtApp.vueApp._instance?.isMounted;
      const options = {
        baseURL: config.public.baseApiUrl as string,
        query,
        headers: {
          ...headers,
          'X-forwarded-for': storeConfig.getClientIp,
        },
      };

      if (!isHydrating && isMounted) {
        const data = await $fetch(combineURL(path), { ...options, method: 'get' });

        return Promise.resolve(data as T);
      } else {
        const { data } = await useFetch(combineURL(path), { ...options, method: 'get' });

        return Promise.resolve(data.value as T);
      }
    },
    async postFetch<T>(path: string, body: object = {}, headers: object = {}) {
      const isHydrating = nuxtApp.isHydrating;
      const isMounted = nuxtApp.vueApp._instance?.isMounted;
      const options = {
        baseURL: config.public.baseApiUrl,
        body,
        headers: {
          ...headers,
          'X-forwarded-for': storeConfig.getClientIp,
        },
      };

      if (!isHydrating && isMounted) {
        const data = await $fetch(combineURL(path), { ...options, method: 'post' });

        return Promise.resolve(data as T);
      } else {
        const { data } = await useFetch(combineURL(path), { ...options, method: 'post' });

        return Promise.resolve(data.value as T);
      }
    },
  };
};
