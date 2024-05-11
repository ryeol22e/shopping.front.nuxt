/**
 * mounted된후 사용하는 fetch
 * @returns
 */
export const useRunFetch = () => {
  const config = useRuntimeConfig();
  const storeConfig = useStoreConfig();
  const combineURL = (path: string): string => (path.startsWith('/') ? path : '/'.concat(path));

  return {
    async get(path: string, query: any = {}, headers: any = {}): Promise<AnyObject> {
      return await $fetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'get',
        query,
        headers: {
          ...headers,
        },
      });
    },
    async post(path: string, body: any = {}, headers: any = {}): Promise<AnyObject> {
      return await $fetch(combineURL(path), {
        baseURL: config.public.baseApiUrl,
        method: 'post',
        body,
        headers: {
          ...headers,
        },
      });
    },
  };
};
