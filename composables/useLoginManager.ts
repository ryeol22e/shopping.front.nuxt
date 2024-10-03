import { useStoreMember } from '@/stores/useStoreMember';
import useEnum from './useEnum';

const { MEMBER_CONST } = useEnum();

export default () => {
  const { isLogin, getUserInfo } = storeToRefs(useStoreMember());

  return {
    isLogin: isLogin.value,
    userInfo: getUserInfo.value,
    userRole: getUserInfo.value.memberRole || MEMBER_CONST.ANONYMOUS,
  };
};
