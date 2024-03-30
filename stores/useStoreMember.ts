import useEnum from '@/composables/useEnum';

export const useStoreMember = defineStore('useStoreMember', () => {
  const { MEMBER_CONST } = useEnum();
  const { $get, $post } = useNuxtApp();

  const boolLogin = ref(false);
  const boolInfoSet = ref(false);
  const userInfo = ref({
    memberNo: '',
    memberName: '',
    memberRole: MEMBER_CONST.ANONYMOUS,
  });
  const signUpResult = ref(false);
  const authNumber = ref('');

  const isLogin = computed(() => boolLogin.value);
  const isInfoSet = computed(() => boolInfoSet.value);
  const getUserInfo = computed(() => userInfo.value);
  const getSignUpResult = computed(() => signUpResult.value);
  const getAuthNumber = computed(() => authNumber.value);

  const setLogin = (bool: boolean) => {
    boolLogin.value = bool;
  };
  const authCheck = async (): Promise<void> => {
    await $get('/member/auth')
      .then((res: any) => (boolLogin.value = JSON.parse(res.data)))
      .catch((error) => console.log(error));
  };
  const loginProcess = async (param: MemberInfo): Promise<void> => {
    await $post('/member/login', param)
      .then((res: any) => {
        boolLogin.value = JSON.parse(res.data);
      })
      .catch((error) => console.log(error));
  };
  const setMemberInfo = async (): Promise<void> => {
    await $get('/member/info')
      .then((res: any) => {
        userInfo.value = res.data;
      })
      .then(() => {
        boolInfoSet.value = true;
      })
      .catch((error) => console.log(error));
  };
  const logoutProcess = async (): Promise<void> => {
    await $get('/member/logout').catch((error) => console.log(error));
  };
  const signUpProcess = async (param: any): Promise<void> => {
    await $post('/member/join', param)
      .then((res: any) => (signUpResult.value = res.data))
      .catch((error) => console.log(error));
  };
  const setAuthNumber = async (param: any): Promise<void> => {
    await $post('/member/auth/number', param)
      .then((res: any) => (authNumber.value = String(res.data).substring(0, res.data.lastIndexOf('.'))))
      .catch((error) => console.log(error));
  };

  return {
    isLogin,
    isInfoSet,
    getUserInfo,
    getSignUpResult,
    getAuthNumber,
    setLogin,
    authCheck,
    loginProcess,
    setMemberInfo,
    logoutProcess,
    signUpProcess,
    setAuthNumber,
  };
});
