export const useStoreVariable = defineStore('useStoreVariable', () => {
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
