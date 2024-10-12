export default defineNuxtRouteMiddleware(async (to, from) => {
  const storeMember = useStoreMember();

  const { authCheck, setMemberInfo } = storeMember;
  const { isLogin, isInfoSet } = storeToRefs(storeMember);

  await authCheck();

  if (isLogin.value) {
    if (!isInfoSet.value) {
      await setMemberInfo();
    }

    if (to.name === 'login') {
      return await navigateTo('/', { replace: true });
    }
  }
});
