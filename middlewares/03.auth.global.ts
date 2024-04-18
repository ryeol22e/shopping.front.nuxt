export default defineNuxtRouteMiddleware(async (to, from) => {
  const storeMember = useStoreMember();

  if (storeMember.isLogin) {
    if (!storeMember.isInfoSet) {
      await storeMember.setMemberInfo();
    }

    if (to.name === 'login') {
      return await navigateTo('/', { replace: true });
    }
  }
});
