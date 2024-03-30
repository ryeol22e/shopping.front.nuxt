import { defineStore } from 'pinia';

export const useStoreConfig = defineStore('storeConfig', () => {
  const clientIp = ref('');
  const acessToken = ref('');
  const setClientIp = (ip: string): void => {
    clientIp.value = ip;
  };
  const setAcessToken = (token: string): void => {
    acessToken.value = token;
  };

  const getClientIp = computed(() => clientIp.value);
  const getAcessToken = computed(() => acessToken.value);

  return {
    setClientIp,
    setAcessToken,
    getClientIp,
    getAcessToken,
  };
});
