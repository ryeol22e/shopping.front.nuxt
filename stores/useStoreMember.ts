import type { MemberInfo, UserInfo } from '~/@types/member-type';
import { useAppFetch } from '~/composables/useAppFetch';
import useEnum from '~/composables/useEnum';

export const useStoreMember = defineStore('useStoreMember', () => {
  const { MEMBER_CONST } = useEnum();
  const { getFetch, postFetch } = useAppFetch();

  const boolLogin = ref(false);
  const boolInfoSet = ref(false);
  const userInfo = ref<UserInfo>({
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
    boolLogin.value = (await getFetch<boolean>('/member/auth')) || false;
  };
  const loginProcess = async (param: MemberInfo): Promise<void> => {
    boolLogin.value = await postFetch<boolean>('/member/login', param).catch(() => false);
  };
  const setMemberInfo = async (): Promise<void> => {
    await getFetch<UserInfo>('/member/info')
      .then((data: UserInfo) => {
        userInfo.value = data;
      })
      .then(() => {
        boolInfoSet.value = true;
      })
      .catch((error) => console.log(error));
  };
  const logoutProcess = async (): Promise<void> => {
    await getFetch('/member/logout').catch((error) => console.log(error));
  };
  const signUpProcess = async (param: any): Promise<void> => {
    signUpResult.value = await postFetch<boolean>('/member/join', param).catch(() => false);
  };
  const setAuthNumber = async (param: object): Promise<void> => {
    authNumber.value = await postFetch<string>('/member/auth/number', param)
      .then((data: string) => String(data).substring(0, data.lastIndexOf('.')))
      .catch(() => '');
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
