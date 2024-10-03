export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authCheck, setMemberInfo, isLogin, isInfoSet } = useStoreMember();

  await authCheck();

  if (isLogin) {
    if (!isInfoSet) {
      await setMemberInfo();
    }

    if (to.name === 'login') {
      return await navigateTo('/', { replace: true });
    }
  }
});
