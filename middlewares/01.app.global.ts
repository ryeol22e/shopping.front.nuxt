import { useSetApp } from '~/composables/middleware/useSetApp';
import { useSetHead } from '~/composables/middleware/useSetHead';
import { useSetSeoMeta } from '~/composables/middleware/useSetSeoMeta';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const urlInfo = useRequestURL();
  const event = useRequestEvent();

  const { setApp } = useSetApp(to);
  const { device } = useDeviceManager();

  const { setHead } = useSetHead(to);
  const { setSeoMeta } = useSetSeoMeta(to);

  setApp();
  setHead();
  setSeoMeta();
});
