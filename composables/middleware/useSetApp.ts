export const useSetApp = (to: any) => ({
  setApp() {
    const nuxtApp = useNuxtApp();
    const storeVar = useStoreVariable();

    nuxtApp.hook('app:created', () => {});
    nuxtApp.hook('app:rendered', () => {});
    nuxtApp.hook('app:beforeMount', () => {});
    nuxtApp.hook('app:mounted', () => {});

    nuxtApp.hook('page:start', () => {});
    nuxtApp.hook('page:finish', () => {});
  },
});
