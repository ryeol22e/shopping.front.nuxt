export const useStoreVariable = defineStore('useStoreVariable', () => {
  const boolLoading = ref(false);

  const setIsLoading = (bool: boolean): void => {
    boolLoading.value = bool;
  };

  return {
    setIsLoading,
    isLoading: computed(() => boolLoading.value),
  };
});
