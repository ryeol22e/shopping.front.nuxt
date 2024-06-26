export const useStoreVariable = defineStore('useStoreVariable', () => {
  const { setupGet } = useSetupFetch();
  const { runGet } = useRunFetch();

  const boolLoading = ref(false);

  const isLoading = computed(() => boolLoading.value);

  const setIsLoading = (bool: boolean): void => {
    boolLoading.value = bool;
  };

  return {
    isLoading,
    setIsLoading,
  };
});
