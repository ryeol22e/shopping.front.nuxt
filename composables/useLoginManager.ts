import { useStoreMember } from '@/stores/useStoreMember';
import useEnum from './useEnum';

const { MEMBER_CONST } = useEnum();

export default () => {
  const useMember = useStoreMember();

  return {
    isLogin: useMember.isLogin,
    userInfo: useMember.getUserInfo,
    userRole: useMember.getUserInfo.memberRole || MEMBER_CONST.ANONYMOUS,
  };
};
